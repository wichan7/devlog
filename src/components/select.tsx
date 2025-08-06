"use client"

import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react"
import { useTranslations } from "next-intl"

export function Select() {
  const t = useTranslations()

  // todo
  const categories = [
    "Analytics",
    "Engagement",
    "Integrations",
    "Analytics",
    "Engagement",
    "Integrations",
  ]

  return (
    <Popover className="relative">
      <PopoverButton>{t("menu.category")}</PopoverButton>
      <PopoverPanel
        anchor="bottom start"
        className="flex flex-col border-2 border-solid rounded-2xl mt-4 bg-white dark:bg-slate-950"
      >
        {categories.map((category) => (
          <a
            className="pt-2 pb-2 pl-4 pr-4"
            key={`${category}${Math.random()}`}
            href={`/${category}`}
          >
            {category}
          </a>
        ))}
      </PopoverPanel>
    </Popover>
  )
}
