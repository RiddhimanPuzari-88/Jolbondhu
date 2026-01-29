"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts"
import { CloudRain } from "lucide-react"
import type { RainfallData } from "@/lib/mock-data"

interface RainfallChartProps {
  data: RainfallData[]
  translations: {
    rainfallTrend: string
    actual: string
    predicted: string
  }
}

export function RainfallChart({ data, translations }: RainfallChartProps) {
  return (
    <Card className="border-0 bg-card shadow-lg">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <CloudRain className="h-4 w-4" />
          {translations.rainfallTrend}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="rainfallGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="oklch(0.55 0.15 200)" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="oklch(0.55 0.15 200)" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="predictedGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="oklch(0.75 0.18 85)" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="oklch(0.75 0.18 85)" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="time" 
                axisLine={false} 
                tickLine={false}
                tick={{ fill: 'oklch(0.5 0.02 220)', fontSize: 12 }}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false}
                tick={{ fill: 'oklch(0.5 0.02 220)', fontSize: 12 }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'oklch(0.98 0 0)',
                  border: '1px solid oklch(0.9 0.01 220)',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
                labelStyle={{ color: 'oklch(0.2 0.02 220)', fontWeight: 600 }}
              />
              <Area
                type="monotone"
                dataKey="rainfall"
                stroke="oklch(0.55 0.15 200)"
                strokeWidth={2}
                fill="url(#rainfallGradient)"
                name={translations.actual}
              />
              <Area
                type="monotone"
                dataKey="predicted"
                stroke="oklch(0.75 0.18 85)"
                strokeWidth={2}
                strokeDasharray="5 5"
                fill="url(#predictedGradient)"
                name={translations.predicted}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="mt-4 flex items-center justify-center gap-6">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-teal" />
            <span className="text-xs text-muted-foreground">{translations.actual}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-risk-medium" />
            <span className="text-xs text-muted-foreground">{translations.predicted}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
