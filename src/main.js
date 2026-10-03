const worldCupVenues = [
  { id: "atlanta", city: "Atlanta", country: "USA", stadium: "Atlanta Stadium", tz: "America/New_York", lat: 33.7554, lng: -84.4008 },
  { id: "boston", city: "Boston", country: "USA", stadium: "Boston Stadium", tz: "America/New_York", lat: 42.0909, lng: -71.2643 },
  { id: "dallas", city: "Dallas", country: "USA", stadium: "Dallas Stadium", tz: "America/Chicago", lat: 32.7473, lng: -97.0945 },
  { id: "guadalajara", city: "Guadalajara", country: "Mexiko", stadium: "Estadio Guadalajara", tz: "America/Mexico_City", lat: 20.6818, lng: -103.4628 },
  { id: "houston", city: "Houston", country: "USA", stadium: "Houston Stadium", tz: "America/Chicago", lat: 29.6847, lng: -95.4107 },
  { id: "kansas-city", city: "Kansas City", country: "USA", stadium: "Kansas City Stadium", tz: "America/Chicago", lat: 39.049, lng: -94.4839 },
  { id: "los-angeles", city: "Los Angeles", country: "USA", stadium: "Los Angeles Stadium", tz: "America/Los_Angeles", lat: 33.9535, lng: -118.3392 },
  { id: "mexico-city", city: "Mexico City", country: "Mexiko", stadium: "Mexico City Stadium", tz: "America/Mexico_City", lat: 19.3029, lng: -99.1505 },
  { id: "miami", city: "Miami", country: "USA", stadium: "Miami Stadium", tz: "America/New_York", lat: 25.958, lng: -80.2389 },
  { id: "monterrey", city: "Monterrey", country: "Mexiko", stadium: "Estadio Monterrey", tz: "America/Monterrey", lat: 25.6689, lng: -100.2441 },
  { id: "new-york-new-jersey", city: "New York/New Jersey", country: "USA", stadium: "New York New Jersey Stadium", tz: "America/New_York", lat: 40.8135, lng: -74.0745 },
  { id: "philadelphia", city: "Philadelphia", country: "USA", stadium: "Philadelphia Stadium", tz: "America/New_York", lat: 39.9008, lng: -75.1675 },
  { id: "san-francisco", city: "San Francisco Bay Area", country: "USA", stadium: "San Francisco Bay Area Stadium", tz: "America/Los_Angeles", lat: 37.403, lng: -121.97 },
  { id: "seattle", city: "Seattle", country: "USA", stadium: "Seattle Stadium", tz: "America/Los_Angeles", lat: 47.5952, lng: -122.3316 },
  { id: "toronto", city: "Toronto", country: "Kanada", stadium: "Toronto Stadium", tz: "America/Toronto", lat: 43.6332, lng: -79.4186 },
  { id: "vancouver", city: "Vancouver", country: "Kanada", stadium: "BC Place Vancouver", tz: "America/Vancouver", lat: 49.2767, lng: -123.1119 }
];

const openFootballUrl = "https://raw.githubusercontent.com/openfootball/worldcup.json/master/2026/worldcup.json";
const espnNflUrl = "https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard";

const nflVenues = [
  { id: "state-farm-stadium", city: "Glendale", country: "USA", stadium: "State Farm Stadium", tz: "America/Phoenix", lat: 33.5276, lng: -112.2626 },
  { id: "mercedes-benz-stadium", city: "Atlanta", country: "USA", stadium: "Mercedes-Benz Stadium", tz: "America/New_York", lat: 33.7554, lng: -84.4008 },
  { id: "m-t-bank-stadium", city: "Baltimore", country: "USA", stadium: "M&T Bank Stadium", tz: "America/New_York", lat: 39.278, lng: -76.6227 },
  { id: "highmark-stadium", city: "Orchard Park", country: "USA", stadium: "Highmark Stadium", tz: "America/New_York", lat: 42.7738, lng: -78.787 },
  { id: "bank-of-america-stadium", city: "Charlotte", country: "USA", stadium: "Bank of America Stadium", tz: "America/New_York", lat: 35.2258, lng: -80.8528 },
  { id: "soldier-field", city: "Chicago", country: "USA", stadium: "Soldier Field", tz: "America/Chicago", lat: 41.8623, lng: -87.6167 },
  { id: "paycor-stadium", city: "Cincinnati", country: "USA", stadium: "Paycor Stadium", tz: "America/New_York", lat: 39.0954, lng: -84.516 },
  { id: "cleveland-browns-stadium", city: "Cleveland", country: "USA", stadium: "Cleveland Browns Stadium", tz: "America/New_York", lat: 41.5061, lng: -81.6995 },
  { id: "at-t-stadium", city: "Arlington", country: "USA", stadium: "AT&T Stadium", tz: "America/Chicago", lat: 32.7473, lng: -97.0945 },
  { id: "empower-field-at-mile-high", city: "Denver", country: "USA", stadium: "Empower Field at Mile High", tz: "America/Denver", lat: 39.7439, lng: -105.02 },
  { id: "ford-field", city: "Detroit", country: "USA", stadium: "Ford Field", tz: "America/Detroit", lat: 42.34, lng: -83.0456 },
  { id: "lambeau-field", city: "Green Bay", country: "USA", stadium: "Lambeau Field", tz: "America/Chicago", lat: 44.5013, lng: -88.0622 },
  { id: "nrg-stadium", city: "Houston", country: "USA", stadium: "NRG Stadium", tz: "America/Chicago", lat: 29.6847, lng: -95.4107 },
  { id: "lucas-oil-stadium", city: "Indianapolis", country: "USA", stadium: "Lucas Oil Stadium", tz: "America/Indiana/Indianapolis", lat: 39.7601, lng: -86.1639 },
  { id: "everbank-stadium", city: "Jacksonville", country: "USA", stadium: "EverBank Stadium", tz: "America/New_York", lat: 30.3239, lng: -81.6373 },
  { id: "geha-field-at-arrowhead-stadium", city: "Kansas City", country: "USA", stadium: "GEHA Field at Arrowhead Stadium", tz: "America/Chicago", lat: 39.0489, lng: -94.4839 },
  { id: "allegiant-stadium", city: "Las Vegas", country: "USA", stadium: "Allegiant Stadium", tz: "America/Los_Angeles", lat: 36.0909, lng: -115.1833 },
  { id: "sofi-stadium", city: "Inglewood", country: "USA", stadium: "SoFi Stadium", tz: "America/Los_Angeles", lat: 33.9535, lng: -118.3392 },
  { id: "hard-rock-stadium", city: "Miami Gardens", country: "USA", stadium: "Hard Rock Stadium", tz: "America/New_York", lat: 25.958, lng: -80.2389 },
  { id: "u-s-bank-stadium", city: "Minneapolis", country: "USA", stadium: "U.S. Bank Stadium", tz: "America/Chicago", lat: 44.9738, lng: -93.2575 },
  { id: "gillette-stadium", city: "Foxborough", country: "USA", stadium: "Gillette Stadium", tz: "America/New_York", lat: 42.0909, lng: -71.2643 },
  { id: "caesars-superdome", city: "New Orleans", country: "USA", stadium: "Caesars Superdome", tz: "America/Chicago", lat: 29.9511, lng: -90.0812 },
  { id: "metlife-stadium", city: "East Rutherford", country: "USA", stadium: "MetLife Stadium", tz: "America/New_York", lat: 40.8135, lng: -74.0745 },
  { id: "lincoln-financial-field", city: "Philadelphia", country: "USA", stadium: "Lincoln Financial Field", tz: "America/New_York", lat: 39.9008, lng: -75.1675 },
  { id: "acrisure-stadium", city: "Pittsburgh", country: "USA", stadium: "Acrisure Stadium", tz: "America/New_York", lat: 40.4468, lng: -80.0158 },
  { id: "levis-stadium", city: "Santa Clara", country: "USA", stadium: "Levi's Stadium", tz: "America/Los_Angeles", lat: 37.403, lng: -121.97 },
  { id: "lumen-field", city: "Seattle", country: "USA", stadium: "Lumen Field", tz: "America/Los_Angeles", lat: 47.5952, lng: -122.3316 },
  { id: "raymond-james-stadium", city: "Tampa", country: "USA", stadium: "Raymond James Stadium", tz: "America/New_York", lat: 27.9759, lng: -82.5033 },
  { id: "nissan-stadium", city: "Nashville", country: "USA", stadium: "Nissan Stadium", tz: "America/Chicago", lat: 36.1665, lng: -86.7713 },
  { id: "northwest-stadium", city: "Landover", country: "USA", stadium: "Northwest Stadium", tz: "America/New_York", lat: 38.9076, lng: -76.8645 }
];

const venueAliases = new Map([
  ["atlanta", "atlanta"],
  ["atlanta stadium", "atlanta"],
  ["mercedes-benz stadium", "atlanta"],
  ["boston", "boston"],
  ["boston stadium", "boston"],
  ["gillette stadium", "boston"],
  ["dallas", "dallas"],
  ["dallas stadium", "dallas"],
  ["at&t stadium", "dallas"],
  ["guadalajara", "guadalajara"],
  ["guadalajara (zapopan)", "guadalajara"],
  ["estadio guadalajara", "guadalajara"],
  ["estadio akron", "guadalajara"],
  ["houston", "houston"],
  ["houston stadium", "houston"],
  ["nrg stadium", "houston"],
  ["kansas city", "kansas-city"],
  ["kansas city stadium", "kansas-city"],
  ["arrowhead stadium", "kansas-city"],
  ["los angeles", "los-angeles"],
  ["los angeles stadium", "los-angeles"],
  ["sofi stadium", "los-angeles"],
  ["mexico city", "mexico-city"],
  ["mexico city stadium", "mexico-city"],
  ["estadio azteca", "mexico-city"],
  ["estadio banorte", "mexico-city"],
  ["miami", "miami"],
  ["miami stadium", "miami"],
  ["hard rock stadium", "miami"],
  ["monterrey", "monterrey"],
  ["estadio monterrey", "monterrey"],
  ["estadio bbva", "monterrey"],
  ["new york/new jersey", "new-york-new-jersey"],
  ["new york/new jersey (east rutherford)", "new-york-new-jersey"],
  ["new york new jersey stadium", "new-york-new-jersey"],
  ["metlife stadium", "new-york-new-jersey"],
  ["philadelphia", "philadelphia"],
  ["philadelphia stadium", "philadelphia"],
  ["lincoln financial field", "philadelphia"],
  ["san francisco bay area", "san-francisco"],
  ["san francisco bay area stadium", "san-francisco"],
  ["levi's stadium", "san-francisco"],
  ["seattle", "seattle"],
  ["seattle stadium", "seattle"],
  ["lumen field", "seattle"],
  ["toronto", "toronto"],
  ["toronto stadium", "toronto"],
  ["bmo field", "toronto"],
  ["vancouver", "vancouver"],
  ["bc place vancouver", "vancouver"],
  ["bc place", "vancouver"]
]);

const timeFormatterCache = new Map();
const dateFormatterCache = new Map();
const venueById = new Map([...worldCupVenues, ...nflVenues].map((venue) => [venue.id, venue]));
const markerByVenue = new Map();
let matches = [];
let matchSource = "ESPN";
let matchWarning = "";
let selectedDate = localIsoDate(new Date());
let selectedCompetition = "nfl";
let selectedVenueId = "at-t-stadium";
let map;

function activeVenues() {
  return selectedCompetition === "nfl" ? nflVenues : worldCupVenues;
}

function formatter(cache, locale, options) {
  const key = JSON.stringify([locale, options]);
  if (!cache.has(key)) cache.set(key, new Intl.DateTimeFormat(locale, options));
  return cache.get(key);
}

function formatTime(date, timeZone, withSeconds = false) {
  return formatter(timeFormatterCache, "de-AT", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    second: withSeconds ? "2-digit" : undefined
  }).format(date);
}

function formatDate(date, timeZone) {
  return formatter(dateFormatterCache, "de-AT", {
    timeZone,
    weekday: "short",
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  }).format(date);
}

function formatTimeZoneName(timeZone) {
  return formatter(dateFormatterCache, "de-AT", {
    timeZone,
    timeZoneName: "short"
  })
    .formatToParts(new Date())
    .find((part) => part.type === "timeZoneName")?.value || timeZone;
}

function localIsoDate(date) {
  return formatter(dateFormatterCache, "en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).format(date);
}

function shiftIsoDate(date, days) {
  const [year, month, day] = date.split("-").map(Number);
  return localIsoDate(new Date(year, month - 1, day + days));
}

function zonedMatchDate(match) {
  const venue = venueById.get(match.venueId);
  const [year, month, day] = match.date.split("-").map(Number);
  const [hour, minute] = match.time.split(":").map(Number);

  if (match.timeZone === "UTC" || !venue) {
    return new Date(Date.UTC(year, month - 1, day, hour, minute));
  }

  const roughUtc = new Date(Date.UTC(year, month - 1, day, hour, minute));
  const localParts = new Intl.DateTimeFormat("en-US", {
    timeZone: venue.tz,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23"
  }).formatToParts(roughUtc);
  const part = (type) => Number(localParts.find((item) => item.type === type).value);
  const asIfUtc = Date.UTC(year, month - 1, day, hour, minute);
  const actualLocalAtRough = Date.UTC(part("year"), part("month") - 1, part("day"), part("hour"), part("minute"));
  return new Date(asIfUtc + (asIfUtc - actualLocalAtRough));
}

function matchStatus(match, now = new Date()) {
  if (match.statusState === "in") return { label: "Live", state: "live" };
  if (match.statusState === "post") return { label: "Beendet", state: "finished" };
  const start = zonedMatchDate(match);
  const end = new Date(start.getTime() + (match.sport === "nfl" ? 4 : 115) * 60 * 60 * 1000);
  if (now < start) return { label: "Bald", state: "upcoming" };
  if (now <= end) return { label: "Live", state: "live" };
  return { label: "Beendet", state: "finished" };
}

function venueIdFromName(venueName) {
  const normalized = (venueName || "").toLowerCase();
  for (const [alias, venueId] of venueAliases.entries()) {
    if (normalized.includes(alias)) {
      return venueId;
    }
  }
  return null;
}

function utcPartsFromOpenFootball(date, time) {
  const parsedTime = /^(\d{1,2}):(\d{2})(?:\s+UTC([+-]\d{1,2}))?$/.exec(time || "");
  if (!parsedTime) {
    return { date, time: "00:00" };
  }

  const [, hourText, minuteText, offsetText] = parsedTime;
  const [year, month, day] = date.split("-").map(Number);
  const hour = Number(hourText);
  const minute = Number(minuteText);
  const offset = offsetText === undefined ? 0 : Number(offsetText);
  const utcDate = new Date(Date.UTC(year, month - 1, day, hour - offset, minute));

  return {
    date: utcDate.toISOString().slice(0, 10),
    time: utcDate.toISOString().slice(11, 16)
  };
}

function normalizeOpenFootballMatch(match, index) {
  const utc = utcPartsFromOpenFootball(match.date, match.time);
  return {
    date: utc.date,
    time: utc.time,
    timeZone: "UTC",
    group: match.group || match.round || "World Cup",
    stage: match.round || match.group || "UNKNOWN",
    status: match.score ? "FINISHED" : "SCHEDULED",
    home: match.team1 || "TBD",
    away: match.team2 || "TBD",
    venueId: venueIdFromName(match.ground),
    venueName: match.ground || null,
    sourceId: `openfootball-2026-${index + 1}`
  };
}

function nflVenueId(venueName) {
  const normalized = (venueName || "").toLowerCase().replace(/[^a-z0-9]/g, "");
  return nflVenues.find((venue) => venue.stadium.toLowerCase().replace(/[^a-z0-9]/g, "") === normalized)?.id || null;
}

function normalizeEspnNflMatch(event) {
  const competition = event.competitions?.[0];
  const competitors = competition?.competitors || [];
  const home = competitors.find((competitor) => competitor.homeAway === "home")?.team?.displayName || "TBD";
  const away = competitors.find((competitor) => competitor.homeAway === "away")?.team?.displayName || "TBD";
  const start = new Date(event.date);
  const venueName = competition?.venue?.fullName || null;

  return {
    date: start.toISOString().slice(0, 10),
    time: start.toISOString().slice(11, 16),
    timeZone: "UTC",
    group: event.season?.type === 1 ? "Preseason" : `NFL Woche ${event.week?.number || ""}`.trim(),
    stage: "NFL",
    home,
    away,
    venueId: nflVenueId(venueName),
    venueName,
    sourceId: `espn-nfl-${event.id}`,
    sport: "nfl",
    statusState: event.status?.type?.state
  };
}

async function loadOpenFootballMatches(date) {
  const response = await fetch(openFootballUrl, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`openfootball returned ${response.status}`);
  }

  const payload = await response.json();
  return (payload.matches || [])
    .filter((match) => match.date === date)
    .map(normalizeOpenFootballMatch);
}

async function loadLocalMatches(date) {
  const response = await fetch("src/matches.json", { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`Lokale Spieldaten konnten nicht geladen werden: ${response.status}`);
  }

  const localMatches = await response.json();
  return localMatches.filter((match) => match.date === date);
}

async function loadNflMatches(date) {
  const response = await fetch(`${espnNflUrl}?dates=${date.replaceAll("-", "")}`, { cache: "no-store" });
  if (!response.ok) throw new Error(`ESPN returned ${response.status}`);
  const payload = await response.json();
  return (payload.events || []).map(normalizeEspnNflMatch);
}

async function loadMatches(date) {
  if (selectedCompetition === "nfl") {
    matches = await loadNflMatches(date);
    matchSource = "ESPN NFL";
    matchWarning = "";
    return;
  }

  try {
    matches = await loadOpenFootballMatches(date);
    matchSource = "openfootball/worldcup.json";
    matchWarning = "";
  } catch (error) {
    matches = await loadLocalMatches(date);
    matchSource = "local-fallback";
    matchWarning = error.message;
  }
}

function matchesForSelectedDate() {
  return matches
    .sort((left, right) => zonedMatchDate(left) - zonedMatchDate(right));
}

function updateMarkerHighlights() {
  const matchVenueIds = new Set(matchesForSelectedDate().map((match) => match.venueId));
  for (const venue of activeVenues()) {
    const marker = markerByVenue.get(venue.id);
    const markerNode = marker?.getElement()?.querySelector("span");
    markerNode?.classList.toggle("has-match", matchVenueIds.has(venue.id));
  }
}

function renderVenueList() {
  const list = document.querySelector("#venue-list");
  list.innerHTML = "";

  for (const venue of activeVenues()) {
    const button = document.createElement("button");
    button.className = "venue-item";
    button.type = "button";
    button.dataset.venueId = venue.id;
    button.innerHTML = `
      <span class="venue-topline">
        <strong>${venue.city}</strong>
        <span class="venue-time" data-time="${venue.id}">--:--</span>
      </span>
      <span>${venue.stadium}</span>
      <small>${venue.country}</small>
    `;
    button.addEventListener("click", () => selectVenue(venue.id, true));
    list.appendChild(button);
  }
}

function setMatchLoading(isLoading) {
  const list = document.querySelector("#match-list");
  list.classList.toggle("loading", isLoading);
  if (isLoading) {
    list.innerHTML = '<div class="empty-state">Spiele werden geladen...</div>';
  }
}

async function refreshMatches() {
  setMatchLoading(true);
  try {
    await loadMatches(selectedDate);
    renderMatches();
  } catch (error) {
    const list = document.querySelector("#match-list");
    list.innerHTML = `<div class="empty-state">${error.message}</div>`;
  } finally {
    setMatchLoading(false);
  }
}

function renderMatches() {
  const now = new Date();
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const relevant = matchesForSelectedDate();
  const list = document.querySelector("#match-list");
  list.innerHTML = "";

  updateMarkerHighlights();

  if (relevant.length === 0) {
    const empty = document.createElement("div");
    empty.className = "empty-state";
    empty.textContent = "Fuer dieses Datum sind keine Spiele hinterlegt.";
    list.appendChild(empty);
    return;
  }

  for (const match of relevant) {
    const venue = venueById.get(match.venueId);
    const start = zonedMatchDate(match);
    const status = matchStatus(match, now);
    const card = document.createElement("article");
    card.className = "match-card";
    const venueTimeZone = venue?.tz || "UTC";
    const venueTimeLabel = venue ? "Zeit am Spielort" : "API-Zeit";
    const venueLabel = venue ? `${venue.city} (${formatTimeZoneName(venueTimeZone)})` : match.venueName || "Spielort nicht geliefert";
    const venueTime = venue ? formatTime(start, venueTimeZone) : `${formatTime(start, "UTC")} UTC`;
    const userTime = `${formatDate(start, userTimeZone)}, ${formatTime(start, userTimeZone)}`;
    const mapButton = venue
      ? `<button class="map-link" type="button" data-venue-id="${venue.id}">Auf Karte zeigen</button>`
      : match.venueName
        ? `<span class="venue-note">${match.venueName}</span>`
        : "";
    card.innerHTML = `
      <div class="match-meta">
        <span class="status ${status.state}">${status.label}</span>
        <span>${match.group || match.stage}</span>
      </div>
      <h3>${match.home} <span>vs</span> ${match.away}</h3>
      <div class="kickoff-times">
        <span>
          <small>${venueTimeLabel}</small>
          <strong>${venueTime}</strong>
          <em>${venueLabel}</em>
        </span>
        <span>
          <small>Meine Zeit</small>
          <strong>${userTime}</strong>
          <em>${formatTimeZoneName(userTimeZone)}</em>
        </span>
      </div>
      ${mapButton}
    `;
    list.appendChild(card);
  }

  list.querySelectorAll(".map-link").forEach((button) => {
    button.addEventListener("click", () => selectVenue(button.dataset.venueId, true));
  });
}

function createMap() {
  map = L.map("map", {
    zoomControl: false,
    minZoom: 3,
    worldCopyJump: true
  }).setView([39, -96], 4);

  L.control.zoom({ position: "bottomright" }).addTo(map);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 18,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);

  renderMapVenues();

  document.querySelector("#fit-map").addEventListener("click", fitMap);
}

function renderMapVenues() {
  for (const marker of markerByVenue.values()) marker.remove();
  markerByVenue.clear();

  for (const venue of activeVenues()) {
    const icon = L.divIcon({
      className: "venue-marker",
      html: "<span></span>",
      iconSize: [28, 28],
      iconAnchor: [14, 14]
    });
    const marker = L.marker([venue.lat, venue.lng], { icon }).addTo(map);
    marker.bindPopup(`<strong>${venue.city}</strong><br>${venue.stadium}<br><span data-popup-time="${venue.id}">--:--</span>`);
    marker.on("click", () => selectVenue(venue.id, false));
    markerByVenue.set(venue.id, marker);
  }

  fitMap();
}

function fitMap() {
  const bounds = L.latLngBounds(activeVenues().map((venue) => [venue.lat, venue.lng]));
  map.fitBounds(bounds.pad(0.12));
}

function selectVenue(venueId, openPopup) {
  selectedVenueId = venueId;
  const venue = venueById.get(venueId);
  document.querySelectorAll(".venue-item").forEach((item) => {
    item.classList.toggle("active", item.dataset.venueId === venueId);
  });
  if (!venue) return;
  map.flyTo([venue.lat, venue.lng], Math.max(map.getZoom(), 6), { duration: 0.6 });
  if (openPopup) markerByVenue.get(venueId).openPopup();
}

function tick() {
  const now = new Date();
  document.querySelector("#local-time").textContent = formatTime(now, Intl.DateTimeFormat().resolvedOptions().timeZone, true);
  document.querySelector("#local-date").textContent = formatDate(now, Intl.DateTimeFormat().resolvedOptions().timeZone);
  document.querySelector("#data-stamp").textContent = `Quelle: ${matchSource}${matchWarning ? " (Fallback)" : ""}`;

  for (const venue of activeVenues()) {
    const time = formatTime(now, venue.tz, true);
    document.querySelectorAll(`[data-time="${venue.id}"], [data-popup-time="${venue.id}"]`).forEach((node) => {
      node.textContent = time;
    });
  }

  renderMatches();
}

async function boot() {
  const dateInput = document.querySelector("#match-date");
  const competitionInput = document.querySelector("#competition");
  const venueToggle = document.querySelector("#toggle-venues");
  const previousDayButton = document.querySelector("#previous-day");
  const nextDayButton = document.querySelector("#next-day");
  const changeDateBy = async (days) => {
    selectedDate = shiftIsoDate(selectedDate, days);
    dateInput.value = selectedDate;
    await refreshMatches();
  };
  dateInput.value = selectedDate;
  dateInput.addEventListener("change", async () => {
    selectedDate = dateInput.value || localIsoDate(new Date());
    await refreshMatches();
  });
  previousDayButton.addEventListener("click", () => changeDateBy(-1));
  nextDayButton.addEventListener("click", () => changeDateBy(1));
  competitionInput.value = selectedCompetition;
  competitionInput.addEventListener("change", async () => {
    selectedCompetition = competitionInput.value;
    selectedVenueId = activeVenues()[0].id;
    updateCompetitionLabels();
    renderVenueList();
    renderMapVenues();
    selectVenue(selectedVenueId, true);
    await refreshMatches();
  });
  venueToggle.addEventListener("click", () => {
    const dashboard = document.querySelector(".dashboard");
    const isHidden = dashboard.classList.toggle("is-hidden");
    venueToggle.textContent = isHidden ? "Spielorte anzeigen" : "Spielorte ausblenden";
    venueToggle.setAttribute("aria-expanded", String(!isHidden));
  });

  updateCompetitionLabels();
  renderVenueList();
  createMap();
  selectVenue(selectedVenueId, true);
  await refreshMatches();
  tick();
  setInterval(tick, 1000);
}

function updateCompetitionLabels() {
  const isNfl = selectedCompetition === "nfl";
  const label = isNfl ? "NFL" : "FIFA World Cup 2026";
  document.querySelector("#hero-eyebrow").textContent = label;
  document.querySelector("#page-title").textContent = `Zeiten der ${isNfl ? "NFL" : "WM"}-Spielorte`;
  document.querySelector("#venues-title").textContent = `${isNfl ? "NFL" : "WM"}-Spielorte`;
  document.querySelector("#matches-eyebrow").textContent = `${label} Spieltag`;
  document.querySelector("#matches-title").textContent = `${isNfl ? "NFL" : "WM"}-Spiele nach Datum`;
}

if (window.L) {
  boot();
} else {
  window.addEventListener("load", boot, { once: true });
}
