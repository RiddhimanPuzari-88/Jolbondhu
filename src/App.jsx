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
  const [currentTime, setCurrentTime] = useState(new Date())

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
        darkMode={darkMode}
        t={t}
        language={language}
      />
      
      <div className="lg:ml-64 transition-all duration-300">
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
              <ActionCenter darkMode={darkMode} language={language} t={t} />
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
