# Spielzeiten: NFL & WM

Eine kleine Web-App fuer NFL-, NHL- und FIFA-World-Cup-2026-Spielorte:

- Umschaltung zwischen NFL, NHL und FIFA World Cup 2026
- Live-Ortszeit der Spielorte
- Leaflet-Karte mit Stadion-Markern
- dynamisch geladene Spieleliste nach ausgewaehltem Datum
- Direkte Karten-Navigation aus der Spieleliste

## Starten

Die App ist statisch und braucht kein eigenes Backend. Lokal kann sie ueber den kleinen statischen Server gestartet werden:

```powershell
$env:BASIC_AUTH_USER = "dein-benutzername"
$env:BASIC_AUTH_PASSWORD = "dein-starkes-passwort"
npm run dev
```

Die App ist danach unter `http://127.0.0.1:5173` erreichbar. Der Browser fragt nach Benutzername und Passwort. Die Kartenkacheln und Leaflet werden aus oeffentlichen CDNs geladen.

Basic Auth schuetzt die gesamte App einschliesslich der Assets. Ohne beide Umgebungsvariablen antwortet der Server mit HTTP 503; fehlende oder falsche Zugangsdaten ergeben HTTP 401. Benutzernamen duerfen keinen Doppelpunkt enthalten. Zugangsdaten werden ausschliesslich serverseitig geprueft und nicht im Frontend hinterlegt. Im oeffentlichen Betrieb HTTPS verwenden.

## Hosting auf Netlify

Die App kann direkt auf Netlify gehostet werden. Die Konfiguration liegt in `netlify.toml`:

- Build command: `npm run build`
- Publish directory: `dist`
- Umgebungsvariablen: `BASIC_AUTH_USER` und `BASIC_AUTH_PASSWORD` in den Netlify-Projekteinstellungen setzen, mit Scope **Functions**, fuer alle gewuenschten Deploy-Kontexte.

Eine Edge Function prueft die Anmeldung fuer alle Pfade. Aenderungen an den Netlify-Umgebungsvariablen erfordern einen neuen Build und Deploy (siehe [Netlify-Dokumentation](https://docs.netlify.com/build/edge-functions/environment-variables/)). Der Build kopiert nur `index.html` und `src` nach `dist`; Auth-Code und Serverdateien werden nicht als statische Dateien veroeffentlicht. Geschuetzte Antworten verwenden `Cache-Control: private, no-store`.

## Pruefungen

```bash
npm test
npm run build
```

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
