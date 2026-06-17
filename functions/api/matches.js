function json(payload, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store"
    }
  });
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

async function localMatches(request, date) {
  const fallbackUrl = new URL("/src/matches.json", request.url);
  const response = await fetch(fallbackUrl);
  const matches = await response.json();
  return matches.filter((match) => match.date === date);
}

export async function onRequestGet(context) {
  const url = new URL(context.request.url);
  const date = url.searchParams.get("date");

  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return json({ error: "date must use YYYY-MM-DD" }, 400);
  }

  const token = context.env.FOOTBALL_DATA_TOKEN;

  if (token) {
    try {
      const upstream = new URL("https://api.football-data.org/v4/competitions/WC/matches");
      upstream.searchParams.set("dateFrom", date);
      upstream.searchParams.set("dateTo", date);
      upstream.searchParams.set("season", "2026");

      const upstreamResponse = await fetch(upstream, {
        headers: { "X-Auth-Token": token }
      });

      if (!upstreamResponse.ok) {
        throw new Error(`football-data.org returned ${upstreamResponse.status}`);
      }

      const payload = await upstreamResponse.json();
      return json({
        source: "football-data.org",
        updatedAt: new Date().toISOString(),
        matches: (payload.matches || []).map(normalizeFootballDataMatch)
      });
    } catch (error) {
      return json({
        source: "local-fallback",
        warning: error.message,
        updatedAt: new Date().toISOString(),
        matches: await localMatches(context.request, date)
      });
    }
  }

  return json({
    source: "local-fallback",
    warning: "FOOTBALL_DATA_TOKEN is not configured",
    updatedAt: new Date().toISOString(),
    matches: await localMatches(context.request, date)
  });
}
