"use client"

import ShuffleIcon from "@/assets/svg/shuffle.svg"
import { useRouter } from "@/i18n/navigation"

export function RandomPostButton({ hrefs }: { hrefs: string[] }) {
  const router = useRouter()

  return (
    <button
      type="button"
      onClick={() => {
        const href = hrefs[Math.floor(Math.random() * hrefs.length)]
        if (href) router.push(href)
      }}
      className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-xl transition-all duration-150 active:bg-[var(--color-bg-2)]"
      style={{
        border: "1px solid var(--color-border)",
        color: "var(--color-text-2)",
      }}
      title="Random post"
      aria-label="Random post"
    >
      <ShuffleIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
    </button>
  )
}
