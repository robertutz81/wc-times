const timeFormatterCache = new Map();
const dateFormatterCache = new Map();

function formatter(cache, locale, options) {
  const key = JSON.stringify([locale, options]);
  if (!cache.has(key)) cache.set(key, new Intl.DateTimeFormat(locale, options));
  return cache.get(key);
}

export function formatTime(date, timeZone, withSeconds = false) {
  return formatter(timeFormatterCache, "de-AT", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    second: withSeconds ? "2-digit" : undefined
  }).format(date);
}

export function formatDate(date, timeZone) {
  return formatter(dateFormatterCache, "de-AT", {
    timeZone,
    weekday: "short",
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  }).format(date);
}

export function formatTimeZoneName(timeZone) {
  return formatter(dateFormatterCache, "de-AT", { timeZone, timeZoneName: "short" })
    .formatToParts(new Date())
    .find((part) => part.type === "timeZoneName")?.value || timeZone;
}

export function localIsoDate(date) {
  return formatter(dateFormatterCache, "en-CA", { year: "numeric", month: "2-digit", day: "2-digit" }).format(date);
}

export function shiftIsoDate(date, days) {
  const [year, month, day] = date.split("-").map(Number);
  return localIsoDate(new Date(year, month - 1, day + days));
}

export function zonedMatchDate(match, venueById) {
  const venue = venueById.get(match.venueId);
  const [year, month, day] = match.date.split("-").map(Number);
  const [hour, minute] = match.time.split(":").map(Number);
  if (match.timeZone === "UTC" || !venue) return new Date(Date.UTC(year, month - 1, day, hour, minute));

  const roughUtc = new Date(Date.UTC(year, month - 1, day, hour, minute));
  const localParts = new Intl.DateTimeFormat("en-US", {
    timeZone: venue.tz, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hourCycle: "h23"
  }).formatToParts(roughUtc);
  const part = (type) => Number(localParts.find((item) => item.type === type).value);
  const asIfUtc = Date.UTC(year, month - 1, day, hour, minute);
  const actualLocalAtRough = Date.UTC(part("year"), part("month") - 1, part("day"), part("hour"), part("minute"));
  return new Date(asIfUtc + (asIfUtc - actualLocalAtRough));
}

export function matchStatus(match, venueById, now = new Date()) {
  if (match.statusState === "in") return { label: "Live", state: "live" };
  if (match.statusState === "post") return { label: "Beendet", state: "finished" };
  const start = zonedMatchDate(match, venueById);
  const durationHours = match.sport === "nfl" ? 4 : match.sport === "nhl" ? 3 : 115 / 60;
  const end = new Date(start.getTime() + durationHours * 60 * 60 * 1000);
  if (now < start) return { label: "Bald", state: "upcoming" };
  if (now <= end) return { label: "Live", state: "live" };
  return { label: "Beendet", state: "finished" };
}
