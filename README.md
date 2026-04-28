⛅ WTWR - What to Wear? A React weather app that recommends clothing based on current conditions. Built with Vite, React, and OpenWeather API. Features

Real-time weather data from OpenWeather API Smart clothing recommendations (Hot/Warm/Cold) Add and view custom clothing items Fully responsive design Modern UI with Cabinet Grotesk font

# Running the Project

This project requires two terminals running simultaneously.

**Terminal 1 — Mock API server:**
```bash
npm run server
```
This runs `json-server --watch db.json --id _id --port 3001`. The `--id _id` flag is required so items use `_id` as the primary key — without it, delete and list keys will not work correctly.

**Terminal 2 — React app:**
```bash
npm run dev
```

# Tech Stack

- React 18
- Vite
- CSS3 (Flexbox & Grid)
- OpenWeather API

# Temperature Recommendations

- Hot (≥86°F) - Light, breathable clothing
- Warm (66-85°F) - Casual outfits
- Cold (<66°F) - Warm, layered clothing

Happy Weather Dressing! 👕⛅
