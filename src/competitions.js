import { loadNflMatches, loadNhlMatches, loadWorldCupMatches } from "./api.js";
import { nflVenues, nhlVenues, worldCupVenues } from "./venues.js";

export const competitions = {
  nfl: { label: "NFL", shortLabel: "NFL", venues: nflVenues, loadMatches: loadNflMatches },
  nhl: { label: "NHL", shortLabel: "NHL", venues: nhlVenues, loadMatches: loadNhlMatches },
  "world-cup": { label: "FIFA World Cup 2026", shortLabel: "WM", venues: worldCupVenues, loadMatches: loadWorldCupMatches }
};

export const venueById = new Map(Object.values(competitions).flatMap((competition) => competition.venues).map((venue) => [venue.id, venue]));
