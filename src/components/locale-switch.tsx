"use client"

import { usePathname, useRouter } from "next/navigation"
import EarthIcon from "@/assets/svg/earth.svg"
import { locales } from "@/i18n/constant"

interface LocaleSwitchProps {
  currentLocale: string
}

export function LocaleSwitch({ currentLocale }: LocaleSwitchProps) {
  const router = useRouter()
  const pathname = usePathname()

  const changeLocale = (newLocale: string) => {
    const segments = pathname.split("/")
    segments[1] = newLocale
    router.push(segments.join("/"))
  }

  const handleClick = () => {
    const currentIndex = locales.findIndex((locale) => locale === currentLocale)
    const nextIndex = (currentIndex + 1) % locales.length
    const nextLocale = locales.at(nextIndex)

    nextLocale && changeLocale(nextLocale)
  }

  return (
    <button
      className="relative border border-slate-200 dark:border-slate-700 rounded-lg w-auto h-10 flex items-center justify-center gap-2 px-3 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm transition-all duration-300 active:bg-slate-100 dark:active:bg-slate-700 active:shadow-md active:scale-105 active:scale-95 group"
      onClick={handleClick}
    >
      <span className="sr-only">Toggle locale</span>
      <EarthIcon className="w-4 h-4 text-slate-700 dark:text-slate-300" />
      <span className="text-sm font-medium text-slate-700 dark:text-slate-300 uppercase">
        {currentLocale}
      </span>
      <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 group-active:from-blue-500/10 group-active:via-purple-500/10 group-active:to-pink-500/10 transition-all duration-300 opacity-0 group-active:opacity-100" />
    </button>
  )
}
