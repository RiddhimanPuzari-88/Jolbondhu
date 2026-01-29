"use client"

import { motion } from "framer-motion"
import { MessageSquare, CheckCircle, Clock, Droplets, CircleOff, Car, HelpCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { CitizenReport } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

interface CitizenFeedProps {
  reports: CitizenReport[]
  language: "en" | "as"
  translations: {
    recentReports: string
  }
}

const typeIcons = {
  waterlogging: Droplets,
  drain: CircleOff,
  road: Car,
  other: HelpCircle,
}

const typeColors = {
  waterlogging: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  drain: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
  road: "bg-red-500/10 text-red-600 dark:text-red-400",
  other: "bg-gray-500/10 text-gray-600 dark:text-gray-400",
}

export function CitizenFeed({ reports, language, translations }: CitizenFeedProps) {
  return (
    <Card className="border-0 bg-card shadow-lg">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <MessageSquare className="h-4 w-4" />
          {translations.recentReports}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[280px] px-6">
          <div className="space-y-3 pb-4">
            {reports.map((report, index) => {
              const Icon = typeIcons[report.type]
              const message = language === "as" ? report.messageAssamese : report.message
              const location = language === "as" ? report.locationAssamese : report.location

              return (
                <motion.div
                  key={report.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="rounded-xl bg-secondary/50 p-3"
                >
                  <div className="flex items-start gap-3">
                    <div className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-lg", typeColors[report.type])}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-foreground leading-snug">{message}</p>
                      <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                        <span className="inline-flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {report.timestamp}
                        </span>
                        <span>•</span>
                        <span>{location}</span>
                        {report.verified && (
                          <>
                            <span>•</span>
                            <span className="inline-flex items-center gap-1 text-risk-low">
                              <CheckCircle className="h-3 w-3" />
                              Verified
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
