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
      className="border rounded-md w-auto h-6 flex items-center justify-center gap-1 pl-1 pr-1"
      onClick={handleClick}
    >
      <span className="sr-only">Toggle mode</span>
      <EarthIcon className="w-4 h-4" /> {currentLocale}
    </button>
  )
}
