"use client"

import { useEffect, useState } from "react"
import BackToTopIcon from "@/assets/svg/back-to-top.svg"

export function BackToTopButton({ label }: { label: string }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const updateVisibility = () => setVisible(window.scrollY > 200)

    updateVisibility()
    window.addEventListener("scroll", updateVisibility, { passive: true })
    return () => window.removeEventListener("scroll", updateVisibility)
  }, [])

  if (!visible) return null

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={() => {
        const reduceMotion = window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        ).matches
        window.scrollTo({ top: 0, behavior: reduceMotion ? "instant" : "smooth" })
      }}
      className="fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] right-4 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-text-2)] shadow-md transition-colors active:bg-[var(--color-bg-2)] active:text-[var(--color-text)] focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] sm:right-6 lg:right-[calc(50%-28rem)]"
    >
      <BackToTopIcon className="h-5 w-5" aria-hidden="true" />
    </button>
  )
}
