import { formatDate, formatTime, formatTimeZoneName, matchStatus, zonedMatchDate } from "./time.js";

export function renderVenueList(venues, onVenueSelected) {
  const list = document.querySelector("#venue-list");
  list.innerHTML = "";
  for (const venue of venues) {
    const button = document.createElement("button");
    button.className = "venue-item";
    button.type = "button";
    button.dataset.venueId = venue.id;
    button.innerHTML = `<span class="venue-topline"><strong>${venue.city}</strong><span class="venue-time" data-time="${venue.id}">--:--</span></span><span>${venue.stadium}</span><small>${venue.country}</small>`;
    button.addEventListener("click", () => onVenueSelected(venue.id, true));
    list.appendChild(button);
  }
}

export function setMatchLoading(isLoading) {
  const list = document.querySelector("#match-list");
  list.classList.toggle("loading", isLoading);
  if (isLoading) list.innerHTML = '<div class="empty-state">Spiele werden geladen...</div>';
}

export function renderMatches({ matches, venueById, onVenueSelected, onHighlight }) {
  const now = new Date();
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const relevant = [...matches].sort((left, right) => zonedMatchDate(left, venueById) - zonedMatchDate(right, venueById));
  const list = document.querySelector("#match-list");
  list.innerHTML = "";
  onHighlight(new Set(relevant.map((match) => match.venueId)));
  if (!relevant.length) {
    list.innerHTML = '<div class="empty-state">Fuer dieses Datum sind keine Spiele hinterlegt.</div>';
    return;
  }

  for (const match of relevant) {
    const venue = venueById.get(match.venueId);
    const start = zonedMatchDate(match, venueById);
    const status = matchStatus(match, venueById, now);
    const venueTimeZone = venue?.tz || "UTC";
    const venueTimeLabel = venue ? "Zeit am Spielort" : "API-Zeit";
    const venueLabel = venue ? `${venue.city} (${formatTimeZoneName(venueTimeZone)})` : match.venueName || "Spielort nicht geliefert";
    const venueTime = venue ? formatTime(start, venueTimeZone) : `${formatTime(start, "UTC")} UTC`;
    const userTime = `${formatDate(start, userTimeZone)}, ${formatTime(start, userTimeZone)}`;
    const mapButton = venue ? `<button class="map-link" type="button" data-venue-id="${venue.id}">Auf Karte zeigen</button>` : match.venueName ? `<span class="venue-note">${match.venueName}</span>` : "";
    const card = document.createElement("article");
    card.className = "match-card";
    card.innerHTML = `<div class="match-meta"><span class="status ${status.state}">${status.label}</span><span>${match.group || match.stage}</span></div><h3>${match.home} <span>vs</span> ${match.away}</h3><div class="kickoff-times"><span><small>${venueTimeLabel}</small><strong>${venueTime}</strong><em>${venueLabel}</em></span><span><small>Meine Zeit</small><strong>${userTime}</strong><em>${formatTimeZoneName(userTimeZone)}</em></span></div>${mapButton}`;
    list.appendChild(card);
  }
  list.querySelectorAll(".map-link").forEach((button) => button.addEventListener("click", () => onVenueSelected(button.dataset.venueId, true)));
}

export function updateCompetitionLabels(competition) {
  document.querySelector("#hero-eyebrow").textContent = competition.label;
  document.querySelector("#page-title").textContent = `Zeiten der ${competition.shortLabel}-Spielorte`;
  document.querySelector("#venues-title").textContent = `${competition.shortLabel}-Spielorte`;
  document.querySelector("#matches-eyebrow").textContent = `${competition.label} Spieltag`;
  document.querySelector("#matches-title").textContent = `${competition.shortLabel}-Spiele nach Datum`;
}

export function updateVenueTimes(venues, now = new Date()) {
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  document.querySelector("#local-time").textContent = formatTime(now, userTimeZone, true);
  document.querySelector("#local-date").textContent = formatDate(now, userTimeZone);
  for (const venue of venues) {
    const time = formatTime(now, venue.tz, true);
    document.querySelectorAll(`[data-time="${venue.id}"], [data-popup-time="${venue.id}"]`).forEach((node) => { node.textContent = time; });
  }
}
