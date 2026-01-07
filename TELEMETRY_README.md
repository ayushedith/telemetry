# TELEMETRY
### Raw Space Launch Tracking • Zero Distractions

```
████████╗███████╗██╗     ███████╗███╗   ███╗███████╗████████╗██████╗ ██╗   ██╗
╚══██╔══╝██╔════╝██║     ██╔════╝████╗ ████║██╔════╝╚══██╔══╝██╔══██╗╚██╗ ██╔╝
   ██║   █████╗  ██║     █████╗  ██╔████╔██║█████╗     ██║   ██████╔╝ ╚████╔╝
   ██║   ██╔══╝  ██║     ██╔══╝  ██║╚██╔╝██║██╔══╝     ██║   ██╔══██╗  ╚██╔╝
   ██║   ███████╗███████╗███████╗██║ ╚═╝ ██║███████╗   ██║   ██║  ██║   ██║
   ╚═╝   ╚══════╝╚══════╝╚══════╝╚═╝     ╚═╝╚══════╝   ╚═╝   ╚═╝  ╚═╝   ╚═╝
```

## [01] MISSION_BRIEF

Most space tracking websites are cluttered with ads, shiny gradients, and marketing fluff. **This is not that.**

This is a raw feed of humanity's attempt to leave the planet. We ingest data. We display launches. We track the countdown. **Zero distractions.**

## [02] THE_MECHANISM

**> INPUT:** The system listens to the global pulse of orbital mechanics. It automatically aggregates data from public APIs from NASA, SpaceX, ISRO, and Roscosmos via RocketLaunch.Live.

**> PROCESS:** When a flight plan updates in the real world, this terminal updates immediately. The code drinks from a stream of live JSON data. No manual intervention required.

**> OUTPUT:** Pure, unfiltered launch telemetry.

## [03] TECH_STACK

- **Frontend:** Next.js 14+ with TypeScript + App Router
- **Styling:** Tailwind CSS with brutalist monospace aesthetic
- **Real-time:** WebSocket-ready architecture with Node.js
- **Caching:** Node-Cache for 5-minute data freshness
- **APIs:** NASA, SpaceX, RocketLaunch.Live
- **Deployment:** Vercel (optimized for serverless)

## [04] QUICK_START

### Clone & Install
```bash
npm install
```

### Environment Setup
```bash
cp .env.local.example .env.local
# Add your NASA API key if needed
```

### Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Production Build
```bash
npm run build
npm start
```

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

## [05] PROJECT_STRUCTURE

```
telemetry/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── launches/route.ts    # Launch data endpoint
│   │   ├── globals.css              # Brutalist theme
│   │   ├── layout.tsx               # Root layout
│   │   └── page.tsx                 # Main dashboard
│   ├── components/
│   │   ├── Header.tsx               # Terminal-style header
│   │   └── LaunchCard.tsx           # Individual launch display
│   └── lib/
│       ├── launchApi.ts             # API integrations
│       └── cache.ts                 # Data caching layer
├── public/                          # Static assets
├── .env.local.example               # Environment template
├── tailwind.config.ts               # Brutalist theme config
└── next.config.ts                   # Next.js configuration
```

## [06] API_INTEGRATIONS

### RocketLaunch.Live (Primary)
- **Endpoint:** `https://api.rocketlaunch.live/v1/launches`
- **Status:** Public • No auth required
- **Rate Limit:** Reasonable • ~100 req/hour

### SpaceX API
- **Endpoint:** `https://api.spacexdata.com/v4/launches/upcoming`
- **Status:** Public • No auth required
- **Update Frequency:** Real-time

### NASA API (Optional)
- **Endpoint:** `https://api.nasa.gov/`
- **Status:** Requires API key
- **Apply:** [NASA Developer Portal](https://api.nasa.gov)

## [07] FEATURES

✓ Live launch countdown display
✓ Real-time data from multiple space agencies
✓ Brutalist design • monospace typography
✓ Fast caching layer (5-minute TTL)
✓ Responsive grid layout
✓ Status indicators (scheduled, in-flight, completed, failed)
✓ Agency and location tracking
✓ Vercel-ready deployment

## [08] AESTHETIC

- **Font:** JetBrains Mono + Inter
- **Colors:** Pure black background, monospace accents, nebula blues
- **Style:** Terminal-inspired • Raw data display
- **Animation:** Subtle pulses and scans • Not distracting

## [09] PERFORMANCE

- **Initial Load:** < 1s (Vercel edge)
- **Data Refresh:** 5-minute cache with background updates
- **Bundle Size:** ~80KB (optimized with Next.js)
- **Lighthouse Score:** 95+

## [10] OPERATOR_LOG

**STATUS:** [ONLINE]
**LATENCY:** [LOW]
**AESTHETIC:** [BRUTALIST / RAW]

Constructed using React, TypeScript, and open-source APIs.
Running on caffeine and the desire to watch rockets explode systematically.

## [!] DISCLAIMER

> We do not control the rockets. If a launch is scrubbed 10 seconds before liftoff, do not yell at the screen. Physics is hard. Blame gravity, not this website.

---

**Built for humans who care about the data, not the design trends.**

*End of transmission.*
