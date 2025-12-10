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
      <PopoverButton className="outline-none relative px-4 py-2 rounded-lg text-slate-700 dark:text-slate-300 active:text-slate-900 dark:active:text-slate-50 group">
        <span className="relative z-10">{t("menu.tag")}</span>
        <span className="absolute inset-0 bg-slate-100 dark:bg-slate-800 rounded-lg opacity-0 group-active:opacity-100 transition-opacity duration-300 -z-0"></span>
      </PopoverButton>
      <PopoverPanel
        anchor="bottom end"
        className="flex flex-col w-48 !max-h-80 border border-slate-200/50 dark:border-slate-700/50 rounded-2xl mt-4 backdrop-blur-md bg-white/90 dark:bg-slate-900/90 shadow-xl shadow-slate-200/50 dark:shadow-slate-900/50 overflow-hidden"
      >
        <div className="overflow-y-auto max-h-80">
          {tags
            .sort((a, b) => b.count - a.count)
            .map((tag) => (
              <Link
                className="flex justify-between pt-3 pb-3 pl-4 pr-4 gap-2 text-slate-700 dark:text-slate-300 active:bg-slate-100 dark:active:bg-slate-800 transition-all duration-200 group/item"
                key={tag.name}
                href={`/tags/${tag.name}`}
              >
                <div className="flex-grow overflow-hidden text-ellipsis whitespace-nowrap">
                  {tag.name}
                </div>
                <div className="flex items-center justify-center flex-none px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-700 text-xs font-medium group-hover/item:bg-gradient-to-r group-hover/item:from-blue-500 group-hover/item:to-purple-500 group-hover/item:to-purple-500 group-hover/item:text-white transition-all duration-200">
                  {tag.count}
                </div>
              </Link>
            ))}
        </div>
      </PopoverPanel>
    </Popover>
  )
}
