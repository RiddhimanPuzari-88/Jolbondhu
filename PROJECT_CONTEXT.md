# Jolbondhu Flood Monitoring Dashboard - Project Context

## Project Identity

**Project Name:** Jolbondhu Flood Monitoring Dashboard  
**Location:** `./` (current directory)  
**Absolute:** Auto-detected (do not hardcode - see Location History below)  
**Type:** React + Vite + Tailwind CSS Web Application  
**Purpose:** Real-time flood monitoring and risk assessment for Guwahati, Assam  
**Current Status:** Demo data fully functional, API integration ready

### Project Fingerprint
**ID:** jolbondhu-dashboard-testing2  
**Created:** 2026-01-30  
**Last Updated:** 2026-01-30  
**Last Agent:** Project Rename Operation (Testing 2 → NewMain)  

*This fingerprint helps agents identify the project even if folder is renamed or moved.*

### Project Location History
**Current:**  
- Relative: `./`  
- Absolute: `D:\Hackathon\NewMain` (auto-detected)  

**Relocation Log:**
- 2026-01-30 - Initial creation in `D:\Hackathon\Testing 2`
- 2026-01-30 - **RENAMED** from `Testing 2` to `NewMain` (Smart Detection System test - SUCCESS!)

*Note: This rename demonstrates the Smart Detection Algorithm works perfectly. Future agents will find this context automatically using the fingerprint or relative path detection.*

**Detection Method for Agents:**
1. Check `./PROJECT_CONTEXT.md` in current directory
2. Search parent directories (up to 3 levels)
3. Search by fingerprint ID: `jolbondhu-dashboard-testing2`
4. Use Smart Detection Algorithm from AGENTS_UPDATE_PROTOCOL.md

---

## Current Features (Implemented)

### Core Features:
- ✅ **9 Monitoring Zones** with bilingual names (English + Assamese)
  - Jalukbari (Main), Maligaon, Fancy Bazar, Bharalumukh
  - Brahmaputra North Bank, Barpeta Zone, Nalbari Area
  - Kamrup Central, Goalpara Zone
  
- ✅ **Interactive Polygon Map**
  - CartoDB Voyager tiles (clean, professional)
  - Risk-based color coding (High=Red, Medium=Yellow, Low=Green)
  - Click-to-select zones with fly-to animation
  - Hover tooltips with zone details
  - Legend for risk levels
  
- ✅ **Zone-Linked Components**
  - Citizen Reports Feed: Shows only reports for selected zone
  - Rainfall Trend Chart: Displays 6-hour history for selected zone
  - Risk Status Card: Updates with selected zone data
  - Zone List: Highlights selected zone
  
- ✅ **Dual-Language Toggle**
  - EN | অসমীয়া dual-button design
  - Complete Assamese translation for all UI elements
  - Bilingual zone names, reports, and locations
  
- ✅ **Collapsible Sidebar**
  - Hamburger toggle (☰) next to logo
  - Expanded: 256px width with full text
  - Collapsed: 64px width with icons only
  - Smooth animations on toggle
  - Main content margin adjusts automatically
  
- ✅ **Action Center with 4 Working Modals**
  - Emergency Contacts: Displays emergency phone numbers
  - Safety Guidelines: Risk-specific safety instructions
  - Broadcast Alert: Send alerts to all citizens
  - Send Warning: Targeted warnings with recipient selection
  - All modals appear above map (fixed z-index)
  
- ✅ **Dark Mode Support**
  - Toggle button in TopBar
  - Full dark theme with slate color palette
  - Preserves readability and contrast

---

## Technical Stack

- **Framework:** React 18.2.0
- **Build Tool:** Vite 5.4.21
- **Styling:** Tailwind CSS 3.3.6
- **Map Library:** Leaflet 1.9.4 with react-leaflet 4.2.1
- **Charts:** Recharts 2.10.3
- **Animations:** Framer Motion 10.16.16
- **Icons:** Lucide React 0.294.0
- **Font:** Inter (Google Fonts)

---

## File Structure

```
Testing 2/
├── src/
│   ├── App.jsx                    # Main app component, state management, polling setup
│   ├── main.jsx                   # React root render
│   ├── index.css                  # Global styles, Tailwind imports
│   ├── data/
│   │   └── mockData.js           # 9 basins, 10 reports, translations
│   └── components/
│       ├── Sidebar.jsx           # Navigation sidebar with hamburger toggle
│       ├── TopBar.jsx            # Header with language toggle, dark mode
│       ├── ZoneMap.jsx           # Leaflet map with polygons
│       ├── RiskStatusCard.jsx    # Zone status display with risk badge
│       ├── RainfallChart.jsx     # 6-hour rainfall trend chart
│       ├── ZoneList.jsx          # List of zones with selection
│       ├── CitizenFeed.jsx       # Zone-filtered citizen reports
│       └── ActionCenter.jsx      # 4 action buttons with modals
├── index.html                    # HTML entry point
├── package.json                  # Dependencies
├── tailwind.config.js            # Tailwind configuration
└── vite.config.js                # Vite configuration
```

---

## API Integration Roadmap

All components have TODO comments with complete implementation examples. Base URL: `https://api.yourservice.com`

### 1. App.jsx - Main Data Fetching
**Endpoint:** `GET /basins`  
**Polling:** 30 seconds  
**Purpose:** Fetch all monitoring zones  
**Headers:** `{ Authorization: 'Bearer YOUR_API_KEY' }`  
**TODO Location:** Lines 16-45 (commented example code)

### 2. CitizenFeed.jsx - Zone Reports
**Endpoint:** `GET /reports?basinId={id}&limit=20`  
**Polling:** 45 seconds  
**Purpose:** Fetch reports for selected zone  
**Headers:** `{ Authorization: 'Bearer YOUR_API_KEY' }`  
**TODO Location:** Lines 7-39 (commented example code)

### 3. RainfallChart.jsx - Rainfall History
**Endpoint:** `GET /rainfall/history?basinId={id}&hours=6`  
**Polling:** 60 seconds  
**Purpose:** Fetch 6-hour rainfall trend  
**Headers:** `{ Authorization: 'Bearer YOUR_API_KEY' }`  
**TODO Location:** Lines 8-40 (commented example code)

### 4. RiskStatusCard.jsx - Real-time Status
**Endpoint:** `GET /basins/{id}/status`  
**Polling:** 30 seconds  
**Purpose:** Current risk level, rainfall, river level  
**Headers:** `{ Authorization: 'Bearer YOUR_API_KEY' }`  
**TODO Location:** Lines 7-37 (commented example code)

### 5. ZoneMap.jsx - Polygon Updates
**Endpoint:** `GET /basins/geojson`  
**Polling:** 120 seconds  
**Purpose:** Zone polygon coordinates and risk colors  
**Headers:** `{ Authorization: 'Bearer YOUR_API_KEY' }`  
**TODO Location:** Lines 27-51 (commented example code)

### 6. ActionCenter.jsx - Action APIs

**Emergency Contacts:**
- **Endpoint:** `GET /emergency-contacts?basinId={id}`
- **Trigger:** On button click
- **TODO Location:** Lines 45-74

**Safety Guidelines:**
- **Endpoint:** `GET /safety-guidelines?riskLevel={level}`
- **Trigger:** On button click
- **TODO Location:** Lines 80-126

**Broadcast Alert:**
- **Endpoint:** `POST /alerts/broadcast`
- **Trigger:** On form submit
- **TODO Location:** Lines 133-168

**Send Warning:**
- **Endpoint:** `POST /alerts/warning`
- **Trigger:** On form submit
- **TODO Location:** Lines 175-210

---

## Data Structure (Mock Data)

### Basin Object:
```javascript
{
  id: "jalukbari",
  name: "Jalukbari (Main)",
  nameAssamese: "জালুকবাৰী (মুখ্য)",
  location: "Guwahati, Kamrup",
  locationAssamese: "গুৱাহাটী, কামrup",
  riskLevel: "High", // High, Medium, Low
  rainfall: 45.2,
  riverLevel: "48.2",
  drainageBlockage: 72,
  estimatedWaterLevel: 2.5,
  coords: [26.1445, 91.6616], // Center point [lat, lng]
  polygon: [ // 6 vertices for polygon
    [26.1500, 91.6550],
    [26.1520, 91.6650],
    ...
  ],
  rainfallData: [ // 6-hour history
    { time: '06:00', rainfall: 25 },
    { time: '07:00', rainfall: 32 },
    ...
  ]
}
```

### Report Object:
```javascript
{
  id: "1",
  basinId: "jalukbari", // Links to zone
  user: 'Rahul Das',
  location: 'Jalukbari, Guwahati',
  locationAssamese: "জালুকবাৰী, গুৱাহাটী",
  time: '5 mins ago',
  content: 'Report message in English',
  messageAssamese: "Report message in Assamese",
  type: 'alert', // alert, report, update
  image: true // boolean
}
```

---

## Change History

### 2026-01-30 - Initial Agent Session
**Initial Setup:**
- Created React + Vite project structure
- Implemented 9 monitoring zones with bilingual names
- Added polygon-based map with CartoDB tiles
- Implemented zone-linked reports and rainfall charts
- Created Action Center with 4 modals
- Added dual-language toggle (EN | অসমীয়া)
- Implemented collapsible sidebar with hamburger
- Added complete Assamese translation
- Set up dark mode support

### 2026-01-30 - Bug Fixes Session
**Issues Fixed:**
- Fixed markdown syntax errors (```jsx) in all component files
- Fixed hamburger button visibility (removed `hidden lg:flex`)
- Fixed modal z-index issue (changed z-50 to z-[1100] to appear above map)
- Verified build successful after all changes

### 2026-01-30 - Documentation Session
**Documentation:**
- Created AGENTS_UPDATE_PROTOCOL.md in root directory
- Created PROJECT_CONTEXT.md in Testing 2 directory
- Added agent reminder comments to all 9 component files
- Documented all API integration points with polling intervals
- Recorded complete data structure and file organization

### 2026-01-30 - Hybrid Path System Implementation
**Relocation-Proof Context System:**
- Updated AGENTS_UPDATE_PROTOCOL.md with Smart Detection Algorithm
- Added "Project Relocation & Path Detection" section with step-by-step logic
- Added Context Finder Utility with pseudo-code for agents
- Updated PROJECT_CONTEXT.md with Project Fingerprint: `jolbondhu-dashboard-testing2`
- Added "Project Location History" section with relocation log
- Changed all 9 component files to use RELATIVE paths (`./PROJECT_CONTEXT.md`)
- Removed all absolute paths (`D:\Hackathon\Testing 2\...`) from agent comments
- Added PROJECT FINGERPRINT to all component file headers
- Updated Agent Reminder comments to include search instructions
- **Result:** Context system now survives folder moves, renames, and relocations
- **Testing:** Verified build successful after all path updates

### 2026-01-30 - Bug Fix: Risk Status Card Zone Update
**Issue:** Risk status banner not updating when selecting different zones from map or list
**Root Cause:** `RiskStatusCard.jsx` used `useState(initialBasin)` which only initializes once and doesn't sync with prop changes
**Solution:** Added `useEffect` hook to sync `basinData` state when `initialBasin` prop changes
**Files Modified:**
- `src/components/RiskStatusCard.jsx` (lines 41-45): Added state setter and useEffect sync
**Testing:** Verified build successful, zone selection now updates risk banner immediately
**Notes:** Maintains API polling compatibility - state structure preserved for future real-time updates

---

## Known Issues & Fixes

### Fixed Issues:

| Issue | Solution | File |
|-------|----------|------|
| Hamburger not visible | Removed `hidden lg:flex` class | Sidebar.jsx |
| Modal hidden by map | Changed z-50 to z-[1100] | ActionCenter.jsx |
| Markdown syntax errors | Removed ```jsx markers | All .jsx files |
| Incomplete translations | Added full Assamese coverage | mockData.js, all components |
| Risk status not updating on zone select | Added useEffect to sync state with prop changes | RiskStatusCard.jsx |

### Current State:
- ✅ All builds successful
- ✅ No console errors
- ✅ All interactive elements working
- ✅ Responsive design functional
- ✅ Bilingual support complete
- ✅ Demo data displays correctly

---

## Testing Checklist

Before ending any session, verify:
- [ ] `npm run build` completes without errors
- [ ] No console errors in browser
- [ ] Sidebar hamburger toggles correctly
- [ ] Zone selection updates all components
- [ ] Language toggle (EN ↔ অসমীয়া) works
- [ ] Dark mode toggle works
- [ ] Map polygons show correct colors
- [ ] Action Center modals appear above map
- [ ] Citizen Feed filters by selected zone
- [ ] Rainfall Chart shows zone-specific data
- [ ] Responsive on mobile and desktop
- [ ] **All paths in files are RELATIVE** (./PROJECT_CONTEXT.md not absolute)
- [ ] **Context file exists** and is up to date

---

## Next Steps / Future Work

### Phase 1: API Integration
- Replace demo data with real API calls
- Add authentication system (Bearer token)
- Implement polling for real-time updates
- Add error handling and retry logic

### Phase 2: Enhanced Features
- WebSocket support for instant updates
- Push notifications for alerts
- Historical data analysis
- Predictive risk modeling
- Mobile app version

### Phase 3: Production
- Add loading states and skeleton screens
- Implement caching strategy
- Add analytics dashboard
- User authentication and roles
- Admin panel for zone management

---

## Agent Reminder

**ATTENTION FUTURE AGENTS:**
- Always check this file before making changes (use Smart Detection Algorithm if moved)
- Update "Change History" after every session
- Test build with `npm run build` before finishing
- Maintain bilingual support (don't remove Assamese)
- Keep demo data working until API is connected
- **Use RELATIVE paths** (./PROJECT_CONTEXT.md) not absolute paths
- **Project Fingerprint:** jolbondhu-dashboard-testing2
- If project was moved/renamed, use Smart Detection Algorithm from AGENTS_UPDATE_PROTOCOL.md
- See AGENTS_UPDATE_PROTOCOL.md for full rules

**Last Updated:** 2026-01-30  
**Status:** Fully functional, API-ready, documented, relocation-proof
