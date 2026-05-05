"use client"

import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"

interface TagPopoverProps {
  tags: { name: string; count: number }[]
}

export function TagPopover({ tags }: TagPopoverProps) {
  const t = useTranslations()

  return (
    <Popover className="relative">
      <PopoverButton
        className="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-150 outline-none"
        style={{ color: "var(--color-text-2)" }}
      >
        {t("menu.tag")}
      </PopoverButton>
      <PopoverPanel
        anchor="bottom end"
        className="flex flex-col w-52 !max-h-80 rounded-2xl mt-2 overflow-hidden z-50"
        style={{
          background: "var(--color-bg)",
          border: "1px solid var(--color-border)",
          boxShadow:
            "rgba(0,0,0,0.12) 0px 16px 48px, rgba(0,0,0,0.06) 0px 4px 16px",
        }}
      >
        <div className="overflow-y-auto max-h-80 py-1.5">
          {tags
            .sort((a, b) => b.count - a.count)
            .map((tag) => (
              <Link
                className="flex justify-between items-center px-4 py-2.5 text-sm transition-colors duration-150"
                style={{ color: "var(--color-text-2)" }}
                key={tag.name}
                href={`/tags/${tag.name}`}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.color = "var(--color-text)"
                  el.style.background = "var(--color-bg-2)"
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.color = "var(--color-text-2)"
                  el.style.background = "transparent"
                }}
              >
                <span className="overflow-hidden text-ellipsis whitespace-nowrap">
                  {tag.name}
                </span>
                <span
                  className="flex-none text-xs px-1.5 py-0.5 rounded-full ml-2"
                  style={{
                    background: "var(--color-bg-3)",
                    color: "var(--color-text-3)",
                  }}
                >
                  {tag.count}
                </span>
              </Link>
            ))}
        </div>
      </PopoverPanel>
    </Popover>
  )
}
