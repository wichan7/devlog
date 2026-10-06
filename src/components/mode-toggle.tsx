"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import DayIcon from "@/assets/svg/day.svg"
import NightIcon from "@/assets/svg/night.svg"

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  return (
    <button
      onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}
      className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-xl transition-all duration-150 active:bg-[var(--color-bg-2)]"
      style={{
        border: "1px solid var(--color-border)",
        color: "var(--color-text-2)",
      }}
      aria-label="Toggle theme"
    >
      {mounted &&
        (resolvedTheme !== "dark" ? (
          <NightIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        ) : (
          <DayIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        ))}
    </button>
  )
}
