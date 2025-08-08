"use client"

import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react"
import Link from "next/link"
import { useTranslations } from "next-intl"

interface CategoryPopoverProps {
  tags: { name: string; count: number }[]
}

export function CategoryPopover({ tags }: CategoryPopoverProps) {
  const t = useTranslations()

  return (
    <Popover className="relative">
      <PopoverButton className="outline-none">
        {t("menu.category")}
      </PopoverButton>
      <PopoverPanel
        anchor="bottom end"
        className="flex flex-col w-40 border-2 border-solid rounded-2xl mt-4 bg-white dark:bg-slate-950"
      >
        {tags
          .sort((a, b) => b.count - a.count)
          .map((tag) => (
            <Link
              className="flex justify-between pt-2 pb-2 pl-4 pr-4 gap-2"
              key={tag.name}
              href={`/category/${tag.name}`}
            >
              <div className="flex-grow overflow-hidden text-ellipsis">
                {tag.name}
              </div>
              <div className="flex-none">({tag.count})</div>
            </Link>
          ))}
      </PopoverPanel>
    </Popover>
  )
}
