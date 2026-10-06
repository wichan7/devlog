"use client"

import RssIcon from "@/assets/svg/rss.svg"

export function RssButton({ href }: { href: string }) {
  return (
    <a
      href={href}
      className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-xl transition-all duration-150 active:bg-[var(--color-bg-2)]"
      style={{
        border: "1px solid var(--color-border)",
        color: "var(--color-text-2)",
      }}
      target="_blank"
      title="RSS"
    >
      <RssIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
    </a>
  )
}
