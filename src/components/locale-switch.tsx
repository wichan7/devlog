"use client"

import EarthIcon from "@/assets/svg/earth.svg"
import i18nConfig from "@/i18n/constant.json"
import { usePathname, useRouter } from "@/i18n/navigation"

interface LocaleSwitchProps {
  currentLocale: string
}

export function LocaleSwitch({ currentLocale }: LocaleSwitchProps) {
  const router = useRouter()
  const pathname = usePathname()

  const changeLocale = (newLocale: string) => {
    router.push(pathname, { locale: newLocale })
  }

  const handleClick = () => {
    const currentIndex = i18nConfig.locales.findIndex(
      (locale) => locale === currentLocale,
    )
    const nextIndex = (currentIndex + 1) % i18nConfig.locales.length
    const nextLocale = i18nConfig.locales.at(nextIndex)

    nextLocale && changeLocale(nextLocale)
  }

  return (
    <button
      className="h-9 flex items-center gap-1.5 px-2.5 rounded-xl transition-all duration-150 hover:bg-[var(--color-bg-2)] active:scale-95"
      style={{ border: "1px solid var(--color-border)", color: "var(--color-text-2)" }}
      onClick={handleClick}
      aria-label="Switch locale"
    >
      <EarthIcon className="w-3.5 h-3.5" />
      <span className="text-xs font-semibold uppercase tracking-wider">
        {currentLocale}
      </span>
    </button>
  )
}
