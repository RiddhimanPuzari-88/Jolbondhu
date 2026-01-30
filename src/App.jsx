// AGENT: Update PROJECT_CONTEXT.md after any changes
// Location: ./PROJECT_CONTEXT.md  ← RELATIVE PATH (auto-detected)
// Protocol: See AGENTS_UPDATE_PROTOCOL.md in workspace root
// RULE: Always maintain context for current and future agents
// NOTE: If context not found here, search parent directories
// PROJECT FINGERPRINT: jolbondhu-dashboard-testing2

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Sidebar from './components/Sidebar'
import TopBar from './components/TopBar'
import RiskStatusCard from './components/RiskStatusCard'
import RainfallChart from './components/RainfallChart'
import ZoneList from './components/ZoneList'
import CitizenFeed from './components/CitizenFeed'
import ActionCenter from './components/ActionCenter'
import ZoneMap from './components/ZoneMap'
import { mockData } from './data/mockData'

function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [language, setLanguage] = useState('en')
  const [selectedBasin, setSelectedBasin] = useState(mockData.basins[0])
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())

  // TODO: API INTEGRATION - Fetch all basins data
  // Endpoint: GET https://api.yourservice.com/basins
  // Headers: { 'Authorization': 'Bearer YOUR_API_KEY' }
  // Response: Array of basin objects with id, name, nameAssamese, location, riskLevel, etc.
  // 
  // Example implementation:
  // const [basins, setBasins] = useState([]);
  // useEffect(() => {
  //   const fetchBasins = async () => {
  //     try {
  //       const response = await fetch('https://api.yourservice.com/basins', {
  //         headers: { 'Authorization': 'Bearer YOUR_API_KEY' }
  //       });
  //       const data = await response.json();
  //       setBasins(data);
  //       if (data.length > 0) setSelectedBasin(data[0]);
  //     } catch (error) {
  //       console.error('Error fetching basins:', error);
  //     }
  //   };
  //   fetchBasins();
  // }, []);
  const [basins, setBasins] = useState(mockData.basins); // DEMO DATA

  // TODO: API INTEGRATION - Real-time updates polling
  // Poll every 30 seconds for updated basin data (risk levels, rainfall, etc.)
  // 
  // Example implementation:
  // useEffect(() => {
  //   const interval = setInterval(async () => {
  //     try {
  //       const response = await fetch('https://api.yourservice.com/basins/status');
  //       const updatedData = await response.json();
  //       setBasins(updatedData);
  //     } catch (error) {
  //       console.error('Error polling basin updates:', error);
  //     }
  //   }, 30000); // Poll every 30 seconds
  //   return () => clearInterval(interval);
  // }, []);

  // Get translations from mockData
  const t = mockData.translations[language]

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-slate-900 text-white' : 'bg-gray-50 text-slate-800'}`}>
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        darkMode={darkMode}
        t={t}
        language={language}
      />
      
      <div className={`transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'}`}>
        <TopBar 
          darkMode={darkMode} 
          setDarkMode={setDarkMode}
          language={language}
          setLanguage={setLanguage}
          onMenuClick={() => setSidebarOpen(true)}
          t={t}
          currentTime={currentTime}
        />

        <main className="p-4 lg:p-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6"
          >
            {/* Hero Risk Status - Spans 2 columns */}
            <div className="lg:col-span-2">
              <RiskStatusCard 
                basin={selectedBasin} 
                darkMode={darkMode}
                language={language}
                t={t}
              />
            </div>

            {/* Action Center */}
            <div className="lg:col-span-1">
              <ActionCenter 
                darkMode={darkMode} 
                language={language} 
                t={t} 
                selectedBasin={selectedBasin}
              />
            </div>

            {/* Rainfall Chart */}
            <div className="lg:col-span-1">
              <RainfallChart 
                selectedBasin={selectedBasin}
                darkMode={darkMode}
                language={language}
                t={t}
              />
            </div>

            {/* Zone Map */}
            <div className="lg:col-span-1">
              <ZoneMap 
                basins={mockData.basins}
                selectedBasin={selectedBasin}
                onBasinSelect={setSelectedBasin}
                darkMode={darkMode}
                language={language}
                t={t}
              />
            </div>

            {/* Zone List */}
            <div className="lg:col-span-1">
              <ZoneList 
                basins={mockData.basins}
                selectedBasin={selectedBasin}
                onSelect={setSelectedBasin}
                darkMode={darkMode}
                language={language}
                t={t}
              />
            </div>

            {/* Citizen Feed - Spans full width on mobile, 2 columns on large */}
            <div className="lg:col-span-2">
              <CitizenFeed 
                reports={mockData.citizenReports}
                selectedBasin={selectedBasin}
                darkMode={darkMode}
                language={language}
                t={t}
              />
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  )
}

export default App
