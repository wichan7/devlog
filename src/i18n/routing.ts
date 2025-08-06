import { defineRouting } from "next-intl/routing"
import { defaultLocale, locales } from "./constant"

export const routing = defineRouting({ locales, defaultLocale })
