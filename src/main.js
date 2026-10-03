import { competitions, venueById } from "./competitions.js";
import { createVenueMap } from "./map.js";
import { localIsoDate, shiftIsoDate } from "./time.js";
import { renderMatches, renderVenueList, setMatchLoading, updateCompetitionLabels, updateVenueTimes } from "./ui.js";

const state = {
  matches: [],
  source: "ESPN",
  warning: "",
  date: localIsoDate(new Date()),
  competitionId: "nfl",
  venueId: "at-t-stadium"
};

let venueMap;

function competition() {
  return competitions[state.competitionId];
}

function isDashboardHidden() {
  return document.querySelector(".dashboard").classList.contains("is-hidden");
}

function selectVenue(venueId, openPopup) {
  state.venueId = venueId;
  document.querySelectorAll(".venue-item").forEach((item) => {
    item.classList.toggle("active", item.dataset.venueId === venueId);
  });
  venueMap?.select(venueById.get(venueId), openPopup);
}

function renderCurrentMatches() {
  renderMatches({
    matches: state.matches,
    venueById,
    onVenueSelected: selectVenue,
    onHighlight: (matchVenueIds) => venueMap?.highlight(matchVenueIds)
  });
}

async function refreshMatches() {
  setMatchLoading(true);
  try {
    const result = await competition().loadMatches(state.date);
    state.matches = result.matches;
    state.source = result.source;
    state.warning = result.warning || "";
    renderCurrentMatches();
  } catch (error) {
    document.querySelector("#match-list").innerHTML = `<div class="empty-state">${error.message}</div>`;
  } finally {
    setMatchLoading(false);
  }
}

function renderCompetition() {
  const current = competition();
  updateCompetitionLabels(current);
  renderVenueList(current.venues, selectVenue);
  if (venueMap?.exists) {
    venueMap.render(current.venues);
    selectVenue(state.venueId, true);
  }
}

function tick() {
  updateVenueTimes(competition().venues);
  document.querySelector("#data-stamp").textContent = `Quelle: ${state.source}${state.warning ? " (Fallback)" : ""}`;
  renderCurrentMatches();
}

async function boot() {
  const dateInput = document.querySelector("#match-date");
  const competitionInput = document.querySelector("#competition");
  const venueToggle = document.querySelector("#toggle-venues");
  const dashboard = document.querySelector(".dashboard");
  const updateVenueToggle = () => {
    const isHidden = dashboard.classList.contains("is-hidden");
    venueToggle.textContent = isHidden ? "Spielorte einblenden" : "Spielorte ausblenden";
    venueToggle.setAttribute("aria-expanded", String(!isHidden));
  };

  venueMap = createVenueMap({ onVenueSelected: selectVenue, isHidden: isDashboardHidden });
  dateInput.value = state.date;
  competitionInput.value = state.competitionId;
  updateVenueToggle();
  renderCompetition();

  dateInput.addEventListener("change", async () => {
    state.date = dateInput.value || localIsoDate(new Date());
    await refreshMatches();
  });
  document.querySelector("#previous-day").addEventListener("click", async () => {
    state.date = shiftIsoDate(state.date, -1);
    dateInput.value = state.date;
    await refreshMatches();
  });
  document.querySelector("#next-day").addEventListener("click", async () => {
    state.date = shiftIsoDate(state.date, 1);
    dateInput.value = state.date;
    await refreshMatches();
  });
  competitionInput.addEventListener("change", async () => {
    state.competitionId = competitionInput.value;
    state.venueId = competition().venues[0].id;
    renderCompetition();
    await refreshMatches();
  });
  venueToggle.addEventListener("click", () => {
    const isHidden = dashboard.classList.toggle("is-hidden");
    updateVenueToggle();
    if (!isHidden) {
      venueMap.show(competition().venues);
      selectVenue(state.venueId, true);
      tick();
    }
  });

  if (!isDashboardHidden()) {
    venueMap.show(competition().venues);
    selectVenue(state.venueId, true);
  }
  tick();
  setInterval(tick, 1000);
  await refreshMatches();
}

if (window.L) {
  boot();
} else {
  window.addEventListener("load", boot, { once: true });
}
