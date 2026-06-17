# WM Zeiten

Eine kleine Web-App fuer die FIFA World Cup 2026 Spielorte:

- Live-Ortszeit aller 16 Spielorte
- Leaflet-Karte mit Stadion-Markern
- dynamisch geladene Spieleliste nach ausgewaehltem Datum
- Direkte Karten-Navigation aus der Spieleliste

## Starten

Die App laeuft ueber einen kleinen statischen Server, damit die JSON-Spieldaten geladen werden koennen:

```bash
npm run dev
```

Die App ist danach unter `http://127.0.0.1:5173` erreichbar. Die Kartenkacheln und Leaflet werden aus oeffentlichen CDNs geladen.

## Dynamische Spieldaten

Der lokale Server bietet `/api/matches?date=YYYY-MM-DD` an. Wenn `FOOTBALL_DATA_TOKEN` gesetzt ist, werden die Spiele dynamisch von football-data.org geladen. Ohne Token verwendet die App `src/matches.json` als Fallback.

```powershell
$env:FOOTBALL_DATA_TOKEN = "dein-token"
npm run dev
```

Fuer Cloudflare Pages ist derselbe Endpunkt unter `functions/api/matches.js` hinterlegt. Dort muss `FOOTBALL_DATA_TOKEN` als Environment Variable im Pages-Projekt gesetzt werden.
