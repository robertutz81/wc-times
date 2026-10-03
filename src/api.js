import { nflVenues, nhlVenues, worldCupVenueAliases } from "./venues.js";

const openFootballUrl = "https://raw.githubusercontent.com/openfootball/worldcup.json/master/2026/worldcup.json";
const espnUrls = {
  nfl: "https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard",
  nhl: "https://site.api.espn.com/apis/site/v2/sports/hockey/nhl/scoreboard"
};

function normalizedName(name) {
  return (name || "").toLowerCase().replace(/[^a-z0-9]/g, "");
}

function worldCupVenueId(venueName) {
  const normalized = (venueName || "").toLowerCase();
  for (const [alias, venueId] of worldCupVenueAliases.entries()) {
    if (normalized.includes(alias)) return venueId;
  }
  return null;
}

function venueId(venueName, venues, aliases = new Map()) {
  const normalized = normalizedName(venueName);
  return venues.find((venue) => normalized.includes(normalizedName(venue.stadium)))?.id || aliases.get(normalized) || null;
}

function utcPartsFromOpenFootball(date, time) {
  const parsedTime = /^(\d{1,2}):(\d{2})(?:\s+UTC([+-]\d{1,2}))?$/.exec(time || "");
  if (!parsedTime) return { date, time: "00:00" };
  const [, hourText, minuteText, offsetText] = parsedTime;
  const [year, month, day] = date.split("-").map(Number);
  const utcDate = new Date(Date.UTC(year, month - 1, day, Number(hourText) - (offsetText === undefined ? 0 : Number(offsetText)), Number(minuteText)));
  return { date: utcDate.toISOString().slice(0, 10), time: utcDate.toISOString().slice(11, 16) };
}

function normalizeOpenFootballMatch(match, index) {
  const utc = utcPartsFromOpenFootball(match.date, match.time);
  return {
    ...utc, timeZone: "UTC", group: match.group || match.round || "World Cup", stage: match.round || match.group || "UNKNOWN",
    home: match.team1 || "TBD", away: match.team2 || "TBD", venueId: worldCupVenueId(match.ground), venueName: match.ground || null,
    sourceId: `openfootball-2026-${index + 1}`
  };
}

function normalizeEspnMatch(event, sport, venues) {
  const competition = event.competitions?.[0];
  const competitors = competition?.competitors || [];
  const start = new Date(event.date);
  const venueName = competition?.venue?.fullName || null;
  const nhlAliases = new Map([["pncarena", "lenovo-center"], ["xcelenergycenter", "grand-casino-arena"], ["wellsfargocenter", "xfinity-mobile-arena"], ["amaliearena", "benchmark-international-arena"]]);
  return {
    date: start.toISOString().slice(0, 10), time: start.toISOString().slice(11, 16), timeZone: "UTC",
    group: sport === "nfl" ? (event.season?.type === 1 ? "Preseason" : `NFL Woche ${event.week?.number || ""}`.trim()) : "NHL",
    stage: sport.toUpperCase(),
    home: competitors.find((competitor) => competitor.homeAway === "home")?.team?.displayName || "TBD",
    away: competitors.find((competitor) => competitor.homeAway === "away")?.team?.displayName || "TBD",
    venueId: venueId(venueName, venues, sport === "nhl" ? nhlAliases : undefined), venueName,
    sourceId: `espn-${sport}-${event.id}`, sport, statusState: event.status?.type?.state
  };
}

async function fetchJson(url) {
  const response = await fetch(url, { cache: "no-store" });
  if (!response.ok) throw new Error(`Datenquelle antwortet mit ${response.status}`);
  return response.json();
}

export async function loadWorldCupMatches(date) {
  try {
    const payload = await fetchJson(openFootballUrl);
    return { matches: (payload.matches || []).filter((match) => match.date === date).map(normalizeOpenFootballMatch), source: "openfootball/worldcup.json" };
  } catch (error) {
    const matches = await fetchJson("src/matches.json");
    return { matches: matches.filter((match) => match.date === date), source: "local-fallback", warning: error.message };
  }
}

async function loadEspnMatches(sport, date, venues) {
  const payload = await fetchJson(`${espnUrls[sport]}?dates=${date.replaceAll("-", "")}`);
  return { matches: (payload.events || []).map((event) => normalizeEspnMatch(event, sport, venues)), source: `ESPN ${sport.toUpperCase()}` };
}

export const loadNflMatches = (date) => loadEspnMatches("nfl", date, nflVenues);
export const loadNhlMatches = (date) => loadEspnMatches("nhl", date, nhlVenues);
