"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import DayIcon from "@/assets/svg/day.svg"
import NightIcon from "@/assets/svg/night.svg"

export function ModeToggle() {
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  return (
    <button
      onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}
      className="w-9 h-9 flex items-center justify-center rounded-xl transition-all duration-150 hover:bg-[var(--color-bg-2)] active:scale-95"
      style={{
        border: "1px solid var(--color-border)",
        color: "var(--color-text-2)",
      }}
      aria-label="Toggle theme"
    >
      {mounted &&
        (resolvedTheme !== "dark" ? (
          <NightIcon className="w-4 h-4" />
        ) : (
          <DayIcon className="w-4 h-4" />
        ))}
    </button>
  )
}
