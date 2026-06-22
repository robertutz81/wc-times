# WM Zeiten

Eine kleine Web-App fuer die FIFA World Cup 2026 Spielorte:

- Live-Ortszeit aller 16 Spielorte
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

Die Quelle benoetigt keinen API-Key. Wenn Openfootball nicht erreichbar ist, verwendet die App `src/matches.json` als lokalen Fallback.
