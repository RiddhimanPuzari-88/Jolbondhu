# Jolbondhu Flood Monitoring Dashboard 🌊

A real-time flood monitoring and risk assessment dashboard for Guwahati, Assam. Built with React, Vite, and Leaflet for interactive zone-based flood tracking.

[![React](https://img.shields.io/badge/React-18.2.0-blue)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4.21-646CFF)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3.6-38B2AC)](https://tailwindcss.com/)

## Overview

Jolbondhu (জলবন্ধু - "Water Friend") provides real-time flood monitoring across 9 critical zones in Guwahati. The dashboard combines interactive mapping, citizen reports, and predictive risk analysis to help authorities and citizens stay informed during flood events.

## Key Features

### 🗺️ Interactive Zone Map
Leaflet-powered polygon map with CartoDB Voyager tiles. Zones are color-coded by risk level (High=Red, Medium=Yellow, Low=Green). Click any zone to select it and the map flies to that location with smooth animation.

### 🌍 9 Monitoring Zones
Complete coverage of flood-prone areas including Jalukbari (Main), Maligaon, Fancy Bazar, Bharalumukh, Brahmaputra North Bank, Barpeta Zone, Nalbari Area, Kamrup Central, and Goalpara Zone.

### 🌊 Real-time Risk Status
Hero banner displays current zone status with rainfall levels (mm), river height (m), drainage blockage percentage, and dynamic risk badges. High-risk zones trigger visual flood alerts.

### 📊 Zone-Linked Components
When you select a zone, the entire dashboard updates: Citizen Feed filters to show only that zone's reports, Rainfall Chart displays 6-hour history, and Risk Status updates with zone-specific data.

### 🌐 Dual-Language Support
Complete bilingual interface with EN | অসমীয়ä toggle. All zone names, reports, locations, and UI labels translate instantly. Maintains readability in both languages.

### ⚡ Action Center
Four functional action buttons with modal interfaces: Emergency Contacts (local emergency numbers), Safety Guidelines (risk-specific instructions), Broadcast Alert (mass notifications), Send Warning (targeted recipient warnings).

### 📱 Collapsible Sidebar
Hamburger menu toggle (☰) controls sidebar visibility. Expanded: 256px with full navigation text. Collapsed: 64px icon-only mode. Smooth CSS transitions on toggle.

### 🌙 Dark Mode
Full dark theme support using slate color palette. Toggle button in TopBar switches between light and dark modes instantly. Preserves contrast and readability in both themes.

## Technical Stack

- **Framework:** React 18.2.0
- **Build Tool:** Vite 5.4.21
- **Styling:** Tailwind CSS 3.3.6
- **Maps:** Leaflet 1.9.4 + React-Leaflet 4.2.1
- **Charts:** Recharts 2.10.3
- **Animations:** Framer Motion 10.16.16
- **Icons:** Lucide React 0.294.0

## Getting Started

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation

```bash
# Clone or navigate to project
cd NewMain

# Install dependencies
npm install

# Start development server
npm run dev
```

The dashboard will be available at `http://localhost:5173/`

### Build for Production

```bash
npm run build
```

Output goes to `dist/` folder.

## Project Structure

```
NewMain/
├── src/
│   ├── App.jsx                    # Main app component, state management
│   ├── main.jsx                   # React root render
│   ├── index.css                  # Global styles, Tailwind imports
│   ├── data/
│   │   └── mockData.js           # 9 basins, 10 reports, translations
│   └── components/
│       ├── Sidebar.jsx           # Navigation sidebar
│       ├── TopBar.jsx            # Header with language/dark mode
│       ├── ZoneMap.jsx           # Leaflet polygon map
│       ├── RiskStatusCard.jsx    # Zone risk display
│       ├── RainfallChart.jsx     # 6-hour rainfall trends
│       ├── ZoneList.jsx          # Zone selection list
│       ├── CitizenFeed.jsx       # Zone-filtered reports
│       └── ActionCenter.jsx      # Action buttons + modals
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js
```

## API Integration Roadmap

All components have pre-built TODO comments for API integration. Polling intervals recommended:

| Endpoint | Purpose | Interval |
|----------|---------|----------|
| `GET /basins` | Fetch all zones | 30s |
| `GET /basins/{id}/status` | Zone risk status | 30s |
| `GET /reports?basinId={id}` | Zone reports | 45s |
| `GET /rainfall/history?basinId={id}` | Rainfall data | 60s |
| `GET /basins/geojson` | Polygon coordinates | 120s |

## Data Structure

### Basin Object
```javascript
{
  id: "jalukbari",
  name: "Jalukbari (Main)",
  nameAssamese: "জালুকবাৰী (মুখ্য)",
  location: "Guwahati, Kamrup",
  riskLevel: "High", // High | Medium | Low
  rainfall: 45.2,
  riverLevel: "48.2",
  drainageBlockage: 72,
  coords: [26.1445, 91.6616],
  polygon: [[lat, lng], ...]
}
```

## Current Status

- ✅ All 9 monitoring zones active
- ✅ Interactive map with polygon selection
- ✅ Zone-linked component updates
- ✅ Bilingual support (EN + অসমীয়ä)
- ✅ Dark mode toggle
- ✅ Collapsible sidebar
- ✅ 4 working action modals
- ✅ Demo data fully functional
- ✅ API integration ready

## License

Private project for demonstration purposes.

---

**Built for:** Guwahati Flood Monitoring  
**Status:** Demo Ready | API Integration Ready  
**Last Updated:** January 30, 2026
