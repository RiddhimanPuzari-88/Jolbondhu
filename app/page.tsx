"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Sidebar } from "@/components/dashboard/sidebar"
import { TopBar } from "@/components/dashboard/top-bar"
import { RiskStatusCard } from "@/components/dashboard/risk-status-card"
import { RainfallChart } from "@/components/dashboard/rainfall-chart"
import { ZoneList } from "@/components/dashboard/zone-list"
import { CitizenFeed } from "@/components/dashboard/citizen-feed"
import { ActionCenter } from "@/components/dashboard/action-center"
import { ZoneMap } from "@/components/dashboard/zone-map"
import { Clock } from "@/components/dashboard/clock"

import { basins, citizenReports, rainfallData, translations } from "@/lib/mock-data"

export default function DashboardPage() {
  const [language, setLanguage] = useState<"en" | "as">("en")
  const [selectedBasinId, setSelectedBasinId] = useState("jalukbari")

  const t = translations[language]
  const selectedBasin = basins.find(b => b.id === selectedBasinId) || basins[0]

  // Find highest risk basin for initial display
  const highestRiskBasin = basins.reduce((prev, current) => {
    const riskOrder = { High: 3, Medium: 2, Low: 1 }
    return riskOrder[current.predictedRisk] > riskOrder[prev.predictedRisk] ? current : prev
  }, basins[0])

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <Sidebar language={language} translations={t} />

      {/* Main Content */}
      <main className="lg:pl-64">
        {/* Top Bar */}
        <TopBar
          language={language}
          onLanguageChange={setLanguage}
          translations={t}
        />

        {/* Dashboard Content */}
        <div className="p-4 lg:p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid gap-4 lg:gap-6"
          >
            <div className="grid gap-4 lg:grid-cols-3">
   <Clock />
</div>

            {/* Top Row - Hero Risk Status + Rainfall Chart */}
            <div className="grid gap-4 lg:grid-cols-2 lg:gap-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <RiskStatusCard
                  basin={selectedBasin}
                  language={language}
                  translations={t}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <RainfallChart data={rainfallData} translations={t} />
              </motion.div>
            </div>

            {/* Middle Row - Zone Map + Zone List */}
            <div className="grid gap-4 lg:grid-cols-2 lg:gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <ZoneMap
                  basins={basins}
                  selectedBasin={selectedBasinId}
                  onSelectBasin={setSelectedBasinId}
                  language={language}
                  translations={t}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <ZoneList
                  basins={basins}
                  selectedBasin={selectedBasinId}
                  onSelectBasin={setSelectedBasinId}
                  language={language}
                  translations={t}
                />
              </motion.div>
            </div>

            {/* Bottom Row - Citizen Feed + Action Center */}
            <div className="grid gap-4 lg:grid-cols-2 lg:gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <CitizenFeed
                  reports={citizenReports}
                  language={language}
                  translations={t}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <ActionCenter translations={t} />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
