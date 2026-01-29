"use client"

import { motion } from "framer-motion"
import { AlertTriangle, Droplets, CircleOff } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Basin, RiskLevel } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

interface RiskStatusCardProps {
  basin: Basin
  language: "en" | "as"
  translations: {
    highestRiskArea: string
    riskLevel: string
    currentRainfall: string
    drainageBlockage: string
  }
}

const riskConfig: Record<RiskLevel, { color: string; bgColor: string; pulseColor: string }> = {
  High: {
    color: "text-risk-high",
    bgColor: "bg-risk-high/10",
    pulseColor: "bg-risk-high"
  },
  Medium: {
    color: "text-risk-medium",
    bgColor: "bg-risk-medium/10",
    pulseColor: "bg-risk-medium"
  },
  Low: {
    color: "text-risk-low",
    bgColor: "bg-risk-low/10",
    pulseColor: "bg-risk-low"
  }
}

export function RiskStatusCard({ basin, language, translations }: RiskStatusCardProps) {
  const risk = riskConfig[basin.predictedRisk]
  const basinName = language === "as" ? basin.nameAssamese : basin.name

  return (
    <Card className="relative overflow-hidden border-0 bg-card shadow-lg">
      {/* Animated background gradient */}
      <div className={cn("absolute inset-0 opacity-30", risk.bgColor)} />
      
      <CardHeader className="relative pb-2">
        <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <AlertTriangle className="h-4 w-4" />
          {translations.highestRiskArea}
        </CardTitle>
      </CardHeader>

      <CardContent className="relative space-y-6">
        {/* Main Risk Display */}
        <div className="flex items-center gap-4">
          {/* Pulsating Circle */}
          <div className="relative flex h-20 w-20 items-center justify-center">
            <motion.div
              animate={{
                scale: basin.predictedRisk === "High" ? [1, 1.4, 1] : [1, 1.2, 1],
                opacity: [0.5, 0.2, 0.5]
              }}
              transition={{
                repeat: Infinity,
                duration: basin.predictedRisk === "High" ? 1 : 2
              }}
              className={cn("absolute inset-0 rounded-full", risk.pulseColor)}
            />
            <motion.div
              animate={{
                scale: basin.predictedRisk === "High" ? [1, 1.2, 1] : 1
              }}
              transition={{
                repeat: Infinity,
                duration: basin.predictedRisk === "High" ? 0.8 : 0
              }}
              className={cn("absolute inset-2 rounded-full", risk.pulseColor, "opacity-40")}
            />
            <div className={cn("relative z-10 flex h-14 w-14 items-center justify-center rounded-full", risk.pulseColor)}>
              <AlertTriangle className="h-7 w-7 text-white" />
            </div>
          </div>

          {/* Basin Info */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-foreground">{basinName}</h2>
            <div className={cn("mt-1 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-semibold", risk.bgColor, risk.color)}>
              {translations.riskLevel}: {basin.predictedRisk}
            </div>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-xl bg-secondary/50 p-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Droplets className="h-4 w-4" />
              <span className="text-xs">{translations.currentRainfall}</span>
            </div>
            <p className="mt-1 text-2xl font-bold text-foreground">{basin.currentRainfall} <span className="text-sm font-normal text-muted-foreground">mm</span></p>
          </div>
          
          <div className="rounded-xl bg-secondary/50 p-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <CircleOff className="h-4 w-4" />
              <span className="text-xs">{translations.drainageBlockage}</span>
            </div>
            <p className="mt-1 text-2xl font-bold text-foreground">{basin.drainageBlockage}<span className="text-sm font-normal text-muted-foreground">%</span></p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
