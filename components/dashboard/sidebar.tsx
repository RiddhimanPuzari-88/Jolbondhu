"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Droplets,
  LayoutDashboard,
  Map,
  BarChart3,
  MessageSquareWarning,
  Settings,
  Menu,
  X,
  Leaf
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface SidebarProps {
  language: "en" | "as"
  translations: {
    dashboard: string
    liveMap: string
    analytics: string
    citizenReports: string
    settings: string
    sdgBadge: string
  }
}

const navItems = [
  { key: "dashboard", icon: LayoutDashboard },
  { key: "liveMap", icon: Map },
  { key: "analytics", icon: BarChart3 },
  { key: "citizenReports", icon: MessageSquareWarning },
  { key: "settings", icon: Settings },
] as const

export function Sidebar({ language, translations }: SidebarProps) {
  const [activeItem, setActiveItem] = useState("dashboard")
  const [mobileOpen, setMobileOpen] = useState(false)

  const sidebarContent = (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal text-sidebar-primary-foreground">
          <Droplets className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-sidebar-foreground">JolBondhu+</h1>
          <p className="text-xs text-sidebar-foreground/60">Flood Intelligence</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = activeItem === item.key
          return (
            <button
              key={item.key}
              onClick={() => {
                setActiveItem(item.key)
                setMobileOpen(false)
              }}
              className={cn(
                "flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
              )}
            >
              <Icon className="h-5 w-5" />
              {translations[item.key as keyof typeof translations]}
              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="ml-auto h-2 w-2 rounded-full bg-teal"
                />
              )}
            </button>
          )
        })}
      </nav>

      {/* SDG Badge */}
      <div className="mx-3 mb-4 rounded-xl bg-sidebar-accent/50 p-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-risk-low/20">
            <Leaf className="h-4 w-4 text-risk-low" />
          </div>
          <p className="text-xs text-sidebar-foreground/80 leading-tight">
            {translations.sdgBadge}
          </p>
        </div>
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile Toggle */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed left-4 top-4 z-50 lg:hidden"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Desktop Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 bg-sidebar lg:block">
        {sidebarContent}
      </aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 z-50 w-64 bg-sidebar lg:hidden"
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
