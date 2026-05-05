"use client"

import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react"
import EarthIcon from "@/assets/svg/earth.svg"
import i18nConfig from "@/i18n/constant.json"
import { usePathname, useRouter } from "@/i18n/navigation"

interface LocaleSwitchProps {
  currentLocale: string
}

export function LocaleSwitch({ currentLocale }: LocaleSwitchProps) {
  const router = useRouter()
  const pathname = usePathname()

  const changeLocale = (newLocale: string, close: () => void) => {
    router.push(pathname, { locale: newLocale })
    close()
  }

  return (
    <Popover className="relative">
      {({ close }) => (
        <>
          <PopoverButton
            className="h-9 flex items-center px-2.5 rounded-xl transition-all duration-150 hover:bg-[var(--color-bg-2)] active:scale-95 outline-none"
            style={{
              border: "1px solid var(--color-border)",
              color: "var(--color-text-2)",
            }}
            aria-label="Switch locale"
          >
            <EarthIcon className="w-3.5 h-3.5" />
          </PopoverButton>

          <PopoverPanel
            anchor="bottom start"
            className="py-1 rounded-xl overflow-hidden z-50 !mt-1"
            style={{
              border: "1px solid var(--color-border)",
              background: "var(--color-bg)",
              boxShadow:
                "rgba(0,0,0,0.12) 0px 16px 48px, rgba(0,0,0,0.06) 0px 4px 16px",
              minWidth: "5rem",
            }}
          >
            {i18nConfig.locales.map((locale) => (
              <button
                key={locale}
                onClick={() => changeLocale(locale, close)}
                className="w-full px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-left transition-colors hover:bg-[var(--color-bg-2)]"
                style={{
                  color:
                    locale === currentLocale
                      ? "var(--color-primary)"
                      : "var(--color-text-2)",
                }}
              >
                {locale}
              </button>
            ))}
          </PopoverPanel>
        </>
      )}
    </Popover>
  )
}
