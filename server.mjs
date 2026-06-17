import { createReadStream, existsSync, readFileSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize, resolve, sep } from "node:path";

const root = resolve(process.cwd());
const port = Number(process.env.PORT || 5173);
const host = "127.0.0.1";
const footballDataToken = process.env.FOOTBALL_DATA_TOKEN;

const types = new Map([
  [".html", "text/html; charset=utf-8"],
  [".css", "text/css; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".svg", "image/svg+xml"]
]);

function json(response, status, payload) {
  response.writeHead(status, {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store"
  });
  response.end(JSON.stringify(payload));
}

function localMatches(date) {
  const allMatches = JSON.parse(readFileSync(join(root, "src", "matches.json"), "utf8"));
  return allMatches.filter((match) => match.date === date);
}

function normalizeFootballDataMatch(match) {
  const utcDate = new Date(match.utcDate);
  return {
    date: utcDate.toISOString().slice(0, 10),
    time: utcDate.toISOString().slice(11, 16),
    group: match.group || match.stage || "World Cup",
    stage: match.stage || "UNKNOWN",
    status: match.status || "SCHEDULED",
    home: match.homeTeam?.shortName || match.homeTeam?.name || "TBD",
    away: match.awayTeam?.shortName || match.awayTeam?.name || "TBD",
    venueId: null,
    venueName: match.venue || null,
    sourceId: match.id
  };
}

async function apiMatches(request, response) {
  const url = new URL(request.url || "/", `http://${host}:${port}`);
  const date = url.searchParams.get("date");

  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    json(response, 400, { error: "date must use YYYY-MM-DD" });
    return;
  }

  if (footballDataToken) {
    try {
      const upstream = new URL("https://api.football-data.org/v4/competitions/WC/matches");
      upstream.searchParams.set("dateFrom", date);
      upstream.searchParams.set("dateTo", date);
      upstream.searchParams.set("season", "2026");

      const upstreamResponse = await fetch(upstream, {
        headers: { "X-Auth-Token": footballDataToken }
      });

      if (!upstreamResponse.ok) {
        throw new Error(`football-data.org returned ${upstreamResponse.status}`);
      }

      const payload = await upstreamResponse.json();
      json(response, 200, {
        source: "football-data.org",
        updatedAt: new Date().toISOString(),
        matches: (payload.matches || []).map(normalizeFootballDataMatch)
      });
      return;
    } catch (error) {
      json(response, 200, {
        source: "local-fallback",
        warning: error.message,
        updatedAt: new Date().toISOString(),
        matches: localMatches(date)
      });
      return;
    }
  }

  json(response, 200, {
    source: "local-fallback",
    warning: "FOOTBALL_DATA_TOKEN is not configured",
    updatedAt: new Date().toISOString(),
    matches: localMatches(date)
  });
}

createServer((request, response) => {
  const url = new URL(request.url || "/", `http://${host}:${port}`);

  if (url.pathname === "/api/matches") {
    apiMatches(request, response);
    return;
  }

  const requestedPath = normalize(decodeURIComponent(url.pathname)).replace(/^(\.\.[/\\])+/, "");
  let filePath = resolve(join(root, requestedPath === "/" ? "index.html" : requestedPath));

  if (filePath !== root && !filePath.startsWith(`${root}${sep}`)) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  if (!existsSync(filePath)) {
    response.writeHead(404);
    response.end("Not found");
    return;
  }

  if (statSync(filePath).isDirectory()) {
    filePath = join(filePath, "index.html");
  }

  response.writeHead(200, {
    "content-type": types.get(extname(filePath)) || "application/octet-stream"
  });
  createReadStream(filePath).pipe(response);
}).listen(port, host, () => {
  console.log(`WM Zeiten running at http://${host}:${port}`);
});
