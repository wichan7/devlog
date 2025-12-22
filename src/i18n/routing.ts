import { defineRouting } from "next-intl/routing"
import i18nConfig from "@/i18n/constant.json"

export const routing = defineRouting({
  locales: i18nConfig.locales,
  defaultLocale: i18nConfig.defaultLocale,
  localeDetection: false,
})
