"use client"

import { motion } from "framer-motion"
import { Map } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Basin, RiskLevel } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

interface ZoneMapProps {
  basins: Basin[]
  selectedBasin: string
  onSelectBasin: (id: string) => void
  language: "en" | "as"
  translations: {
    liveMap: string
  }
}

const riskColors: Record<RiskLevel, string> = {
  High: "fill-risk-high",
  Medium: "fill-risk-medium",
  Low: "fill-risk-low",
}

export function ZoneMap({ basins, selectedBasin, onSelectBasin, language, translations }: ZoneMapProps) {
  return (
    <Card className="border-0 bg-card shadow-lg">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <Map className="h-4 w-4" />
          {translations.liveMap}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-secondary/50">
          {/* Stylized Map Background */}
          <svg viewBox="0 0 100 100" className="h-full w-full">
            {/* Water/River */}
            <path
              d="M0 50 Q25 45 50 55 Q75 65 100 50 L100 100 L0 100 Z"
              className="fill-teal/20"
            />
            <path
              d="M0 55 Q30 50 55 60 Q80 70 100 55"
              className="stroke-teal/40 fill-none"
              strokeWidth="0.5"
            />
            
            {/* Roads */}
            <line x1="20" y1="0" x2="20" y2="100" className="stroke-border" strokeWidth="0.8" />
            <line x1="50" y1="0" x2="50" y2="100" className="stroke-border" strokeWidth="0.8" />
            <line x1="80" y1="0" x2="80" y2="100" className="stroke-border" strokeWidth="0.8" />
            <line x1="0" y1="30" x2="100" y2="30" className="stroke-border" strokeWidth="0.8" />
            <line x1="0" y1="70" x2="100" y2="70" className="stroke-border" strokeWidth="0.8" />

            {/* Grid pattern */}
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" className="stroke-border/30" strokeWidth="0.2" />
            </pattern>
            <rect width="100" height="100" fill="url(#grid)" />

            {/* Basin Markers */}
            {basins.map((basin) => {
              const isSelected = selectedBasin === basin.id
              const name = language === "as" ? basin.nameAssamese : basin.name

              return (
                <g key={basin.id}>
                  {/* Pulse animation for high risk */}
                  {basin.predictedRisk === "High" && (
                    <motion.circle
                      cx={basin.coordinates.x}
                      cy={basin.coordinates.y}
                      r={8}
                      className={cn(riskColors[basin.predictedRisk], "opacity-30")}
                      animate={{ r: [8, 14, 8], opacity: [0.3, 0.1, 0.3] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    />
                  )}
                  
                  {/* Selection ring */}
                  {isSelected && (
                    <motion.circle
                      cx={basin.coordinates.x}
                      cy={basin.coordinates.y}
                      r={10}
                      className="fill-none stroke-primary"
                      strokeWidth="1"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                    />
                  )}
                  
                  {/* Main marker */}
                  <motion.circle
                    cx={basin.coordinates.x}
                    cy={basin.coordinates.y}
                    r={6}
                    className={cn(riskColors[basin.predictedRisk], "cursor-pointer stroke-white")}
                    strokeWidth="1.5"
                    whileHover={{ scale: 1.3 }}
                    onClick={() => onSelectBasin(basin.id)}
                  />
                  
                  {/* Label */}
                  <text
                    x={basin.coordinates.x}
                    y={basin.coordinates.y - 10}
                    textAnchor="middle"
                    className="fill-foreground text-[3px] font-medium"
                  >
                    {name.split(" ")[0]}
                  </text>
                </g>
              )
            })}

            {/* Legend */}
            <g transform="translate(5, 85)">
              <rect x="0" y="0" width="25" height="12" rx="1" className="fill-background/80" />
              <circle cx="4" cy="4" r="2" className="fill-risk-high" />
              <text x="8" y="5.5" className="fill-foreground text-[2.5px]">High</text>
              <circle cx="4" cy="9" r="2" className="fill-risk-medium" />
              <text x="8" y="10.5" className="fill-foreground text-[2.5px]">Medium</text>
              <circle cx="17" cy="4" r="2" className="fill-risk-low" />
              <text x="21" y="5.5" className="fill-foreground text-[2.5px]">Low</text>
            </g>
          </svg>

          {/* Guwahati Label */}
          <div className="absolute bottom-3 right-3 rounded-lg bg-background/80 px-2 py-1 text-xs font-medium text-foreground backdrop-blur-sm">
            Guwahati, Assam
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
