"use client"

import { useRouter } from "@/i18n/navigation"
import ShuffleIcon from "@/assets/svg/shuffle.svg"

export function RandomPostButton({ hrefs }: { hrefs: string[] }) {
  const router = useRouter()

  return (
    <button
      type="button"
      onClick={() => {
        const href = hrefs[Math.floor(Math.random() * hrefs.length)]
        if (href) router.push(href)
      }}
      className="w-9 h-9 flex items-center justify-center rounded-xl transition-all duration-150 hover:bg-[var(--color-bg-2)] active:scale-95"
      style={{ border: "1px solid var(--color-border)", color: "var(--color-text-2)" }}
      title="Random post"
      aria-label="Random post"
    ><ShuffleIcon className="w-4 h-4" /></button>
  )
}
