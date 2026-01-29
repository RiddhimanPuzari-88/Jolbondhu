"use client"

import { motion } from "framer-motion"
import { Bell, Download, FileText, Zap } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface ActionCenterProps {
  translations: {
    actionCenter: string
    triggerAlert: string
    exportReport: string
    viewSOP: string
  }
}

export function ActionCenter({ translations }: ActionCenterProps) {
  return (
    <Card className="border-0 bg-card shadow-lg">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <Zap className="h-4 w-4" />
          {translations.actionCenter}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button 
            className="w-full justify-start gap-3 rounded-xl bg-risk-high py-6 text-white hover:bg-risk-high/90"
            size="lg"
          >
            <Bell className="h-5 w-5" />
            {translations.triggerAlert}
          </Button>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button 
            variant="secondary"
            className="w-full justify-start gap-3 rounded-xl py-6"
            size="lg"
          >
            <Download className="h-5 w-5" />
            {translations.exportReport}
          </Button>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button 
            variant="outline"
            className="w-full justify-start gap-3 rounded-xl py-6 bg-transparent"
            size="lg"
          >
            <FileText className="h-5 w-5" />
            {translations.viewSOP}
          </Button>
        </motion.div>
      </CardContent>
    </Card>
  )
}
