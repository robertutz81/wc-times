export function createVenueMap({ onVenueSelected, isHidden }) {
  let map;
  const markers = new Map();

  function ensureMap() {
    if (map) return map;
    map = L.map("map", { zoomControl: false, minZoom: 3, worldCopyJump: true }).setView([39, -96], 4);
    L.control.zoom({ position: "bottomright" }).addTo(map);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 18,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    document.querySelector("#fit-map").addEventListener("click", () => fit());
    return map;
  }

  function render(venues) {
    if (!map) return;
    for (const marker of markers.values()) marker.remove();
    markers.clear();
    for (const venue of venues) {
      const icon = L.divIcon({ className: "venue-marker", html: "<span></span>", iconSize: [28, 28], iconAnchor: [14, 14] });
      const marker = L.marker([venue.lat, venue.lng], { icon }).addTo(map);
      marker.bindPopup(`<strong>${venue.city}</strong><br>${venue.stadium}<br><span data-popup-time="${venue.id}">--:--</span>`);
      marker.on("click", () => onVenueSelected(venue.id, false));
      markers.set(venue.id, marker);
    }
    fit(venues);
  }

  function fit(venues) {
    if (!map || isHidden()) return;
    const activeVenues = venues || [...markers.keys()].map((id) => ({ id })).filter((venue) => markers.has(venue.id));
    if (!activeVenues.length) return;
    const points = venues ? venues.map((venue) => [venue.lat, venue.lng]) : [...markers.values()].map((marker) => marker.getLatLng());
    map.fitBounds(L.latLngBounds(points).pad(0.12));
  }

  function select(venue, openPopup) {
    if (!map || isHidden() || !venue) return;
    map.flyTo([venue.lat, venue.lng], Math.max(map.getZoom(), 6), { duration: 0.6 });
    if (openPopup) markers.get(venue.id)?.openPopup();
  }

  function highlight(matchVenueIds) {
    for (const [venueId, marker] of markers.entries()) {
      marker.getElement()?.querySelector("span")?.classList.toggle("has-match", matchVenueIds.has(venueId));
    }
  }

  function show(venues) {
    ensureMap();
    map.invalidateSize();
    render(venues);
  }

  return { get exists() { return Boolean(map); }, render, select, highlight, show };
}
