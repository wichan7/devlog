"use client"

import { useTheme } from "next-themes"
import DayIcon from "@/assets/svg/day.svg"
import NightIcon from "@/assets/svg/night.svg"

export function ModeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="border rounded-md w-6 h-6 flex items-center justify-center"
    >
      <span className="sr-only">Toggle mode</span>
      {theme !== "dark" ? (
        <NightIcon className="w-4 h-4" />
      ) : (
        <DayIcon className="w-4 h-4" />
      )}
    </button>
  )
}
