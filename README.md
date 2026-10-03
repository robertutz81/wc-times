# Spielzeiten: NFL & WM

Eine kleine Web-App fuer NFL-, NHL- und FIFA-World-Cup-2026-Spielorte:

- Umschaltung zwischen NFL, NHL und FIFA World Cup 2026
- Live-Ortszeit der Spielorte
- Leaflet-Karte mit Stadion-Markern
- dynamisch geladene Spieleliste nach ausgewaehltem Datum
- Direkte Karten-Navigation aus der Spieleliste

## Starten

Die App ist statisch und braucht kein eigenes Backend. Lokal kann sie ueber den kleinen statischen Server gestartet werden:

```bash
npm run dev
```

Die App ist danach unter `http://127.0.0.1:5173` erreichbar. Die Kartenkacheln und Leaflet werden aus oeffentlichen CDNs geladen.

## Hosting auf Netlify

Die App kann direkt auf Netlify gehostet werden. Die Konfiguration liegt in `netlify.toml`:

- Build command: leer lassen
- Publish directory: `.`

## Dynamische Spieldaten

Der Browser laedt die Spiele direkt aus `openfootball/worldcup.json`:

```text
https://raw.githubusercontent.com/openfootball/worldcup.json/master/2026/worldcup.json
```

Die WM-Daten werden aus OpenFootball geladen. Wenn OpenFootball nicht erreichbar ist, verwendet die App `src/matches.json` als lokalen Fallback.

NFL- und NHL-Spiele werden tagesaktuell aus der frei zugänglichen ESPN-Scoreboard-API geladen; dafür ist ebenfalls kein API-Key nötig.

## Struktur

- `src/venues.js`: statische Spielorte und WM-Aliasnamen
- `src/competitions.js`: Wettbewerbskonfiguration
- `src/api.js`: Datenquellen und Normalisierung der Spieldaten
- `src/time.js`: Datums-, Zeit- und Statusberechnung
- `src/map.js`: Leaflet-Karte und Marker
- `src/ui.js`: Listen, Spielkarten und Zeitanzeige
- `src/main.js`: Anwendungsablauf und Ereignisbehandlung
