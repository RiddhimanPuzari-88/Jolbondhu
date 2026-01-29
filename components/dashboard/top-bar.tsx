"use client"

import { useTheme } from "next-themes"
import { motion } from "framer-motion"
import { Sun, Moon, Globe, Activity } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface TopBarProps {
  language: "en" | "as"
  onLanguageChange: (lang: "en" | "as") => void
  translations: {
    systemOnline: string
    lastUpdated: string
    justNow: string
  }
}

export function TopBar({ language, onLanguageChange, translations }: TopBarProps) {
  const { theme, setTheme } = useTheme()

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/80 px-4 backdrop-blur-md lg:px-6">
      {/* Left spacer for mobile menu */}
      <div className="w-10 lg:hidden" />

      {/* Status */}
      <div className="hidden items-center gap-2 sm:flex">
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="h-2 w-2 rounded-full bg-risk-low"
        />
        <span className="text-sm font-medium text-foreground">
          {translations.systemOnline}
        </span>
        <span className="text-sm text-muted-foreground">
          | {translations.lastUpdated} {translations.justNow}
        </span>
      </div>

      {/* Mobile Status */}
      <div className="flex items-center gap-2 sm:hidden">
        <Activity className="h-4 w-4 text-risk-low" />
        <span className="text-xs font-medium">ONLINE</span>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-2">
        {/* Language Toggle */}
        <div className="flex items-center rounded-xl bg-secondary p-1">
          <button
            onClick={() => onLanguageChange("en")}
            className={cn(
              "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-all",
              language === "en"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Globe className="h-4 w-4" />
            <span className="hidden sm:inline">EN</span>
          </button>
          <button
            onClick={() => onLanguageChange("as")}
            className={cn(
              "rounded-lg px-3 py-1.5 text-sm font-medium transition-all",
              language === "as"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <span>অসমীয়া</span>
          </button>
        </div>

        {/* Theme Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="rounded-xl"
        >
          <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </div>
    </header>
  )
}
