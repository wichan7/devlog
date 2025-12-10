"use client"

import { useTheme } from "next-themes"
import DayIcon from "@/assets/svg/day.svg"
import NightIcon from "@/assets/svg/night.svg"

export function ModeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="relative border border-slate-200 dark:border-slate-700 rounded-lg w-10 h-10 flex items-center justify-center bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm transition-all duration-300 active:bg-slate-100 dark:active:bg-slate-700 active:shadow-md active:scale-110 active:scale-95 group"
    >
      <span className="sr-only">Toggle mode</span>
      <div>
        {theme !== "dark" ? (
          <NightIcon className="w-5 h-5 text-slate-700 dark:text-slate-300" />
        ) : (
          <DayIcon className="w-5 h-5 text-slate-700 dark:text-slate-300" />
        )}
      </div>
      <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 group-active:from-blue-500/10 group-active:via-purple-500/10 group-active:to-pink-500/10 transition-all duration-300 opacity-0 group-active:opacity-100"></span>
    </button>
  )
}
