"use client"

import { useEffect, useState } from "react"

export function Clock() {
  const [time, setTime] = useState<Date | null>(null)

  useEffect(() => {
    setTime(new Date()) // run ONLY on client

    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // ✅ Prevent hydration error
  if (!time) return null

  return (
    <div className="rounded-xl bg-card p-4 shadow">
      <h2 className="text-sm text-muted-foreground">
        Current Time
      </h2>

      <p className="text-2xl font-bold">
        {time.toLocaleTimeString()}
      </p>
    </div>
  )
}
