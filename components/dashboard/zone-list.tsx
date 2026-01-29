"use client"

import { motion } from "framer-motion"
import { MapPin, Droplets, AlertCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Basin, RiskLevel } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

interface ZoneListProps {
  basins: Basin[]
  selectedBasin: string
  onSelectBasin: (id: string) => void
  language: "en" | "as"
  translations: {
    zoneStatus: string
  }
}

const riskBadge: Record<RiskLevel, { bg: string; text: string }> = {
  High: { bg: "bg-risk-high/15", text: "text-risk-high" },
  Medium: { bg: "bg-risk-medium/15", text: "text-risk-medium" },
  Low: { bg: "bg-risk-low/15", text: "text-risk-low" },
}

export function ZoneList({ basins, selectedBasin, onSelectBasin, language, translations }: ZoneListProps) {
  return (
    <Card className="border-0 bg-card shadow-lg">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <MapPin className="h-4 w-4" />
          {translations.zoneStatus}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {basins.map((basin) => {
          const risk = riskBadge[basin.predictedRisk]
          const isSelected = selectedBasin === basin.id
          const name = language === "as" ? basin.nameAssamese : basin.name

          return (
            <motion.button
              key={basin.id}
              onClick={() => onSelectBasin(basin.id)}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className={cn(
                "w-full rounded-xl p-3 text-left transition-all",
                isSelected
                  ? "bg-primary/10 ring-2 ring-primary"
                  : "bg-secondary/50 hover:bg-secondary"
              )}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={cn("flex h-10 w-10 items-center justify-center rounded-lg", risk.bg)}>
                    <AlertCircle className={cn("h-5 w-5", risk.text)} />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{name}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Droplets className="h-3 w-3" />
                      <span>{basin.currentRainfall} mm</span>
                      <span>•</span>
                      <span>{basin.lastUpdated}</span>
                    </div>
                  </div>
                </div>
                <span className={cn("rounded-full px-2.5 py-1 text-xs font-semibold", risk.bg, risk.text)}>
                  {basin.predictedRisk}
                </span>
              </div>
            </motion.button>
          )
        })}
      </CardContent>
    </Card>
  )
}
