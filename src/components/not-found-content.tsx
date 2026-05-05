"use client"

import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"

export function NotFoundContent() {
  const t = useTranslations("notFound")

  return (
    <div className="flex flex-col items-center justify-center py-32 gap-6 text-center">
      <span className="text-8xl font-bold text-[var(--color-accent)] font-display leading-none">
        404
      </span>
      <p className="text-[var(--color-text-2)] text-base">{t("message")}</p>
      <Link
        href="/"
        className="px-4 py-2 rounded-lg text-sm font-medium text-[var(--color-text-2)] hover:text-[var(--color-text)] hover:bg-[var(--color-border)] transition-all duration-150"
      >
        {t("back")}
      </Link>
    </div>
  )
}
