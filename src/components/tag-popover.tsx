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
      <PopoverButton className="outline-none">{t("menu.tag")}</PopoverButton>
      <PopoverPanel
        anchor="bottom end"
        className="flex flex-col w-40 !max-h-80 border-2 border-solid rounded-l-2xl mt-4 bg-white dark:bg-slate-950 shadow-lg"
      >
        {tags
          .sort((a, b) => b.count - a.count)
          .map((tag) => (
            <Link
              className="flex justify-between pt-2 pb-2 pl-4 pr-4 gap-2"
              key={tag.name}
              href={`/tags/${tag.name}`}
            >
              <div className="flex-grow overflow-hidden text-ellipsis whitespace-nowrap">
                {tag.name}
              </div>
              <div className="flex-none">({tag.count})</div>
            </Link>
          ))}
      </PopoverPanel>
    </Popover>
  )
}
