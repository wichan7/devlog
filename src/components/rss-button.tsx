"use client"

import RssIcon from "@/assets/svg/rss.svg"

export function RssButton({ href }: { href: string }) {
  return (
    <a
      href={href}
      className="w-9 h-9 flex items-center justify-center rounded-xl transition-all duration-150 hover:bg-[var(--color-bg-2)] active:scale-95"
      style={{
        border: "1px solid var(--color-border)",
        color: "var(--color-text-2)",
      }}
      title="RSS"
    >
      <RssIcon className="w-4 h-4" />
    </a>
  )
}
