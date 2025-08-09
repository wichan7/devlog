import { allPosts } from "contentlayer/generated"
import { Inter } from "next/font/google"
import { notFound } from "next/navigation"
import { hasLocale, NextIntlClientProvider } from "next-intl"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { Analytics } from "@/components/analytics"
import { LocaleSwitch } from "@/components/locale-switch"
import { ModeToggle } from "@/components/mode-toggle"
import { TagPopover } from "@/components/tag-popover"
import { ThemeProvider } from "@/components/theme-provider"
import { Link } from "@/i18n/navigation"
import { routing } from "@/i18n/routing"

const inter = Inter({ subsets: ["latin"] })

interface LocaleLayoutProps {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  setRequestLocale(locale)
  const t = await getTranslations()

  const tagList = Object.entries(
    allPosts
      .filter((post) => post.locale === locale)
      .flatMap((post) => post.tags)
      .reduce(
        (acc, tag) => {
          acc[tag] = (acc[tag] || 0) + 1
          return acc
        },
        {} as Record<string, number>,
      ),
  ).map(([name, count]) => ({ name, count }))

  return (
    <html lang={locale}>
      <body
        className={`antialiased min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 tabular-nums ${inter.className}`}
      >
        <NextIntlClientProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="max-w-2xl mx-auto py-10 px-4">
              <header>
                <div className="flex items-center justify-between gap-2">
                  <ModeToggle />
                  <LocaleSwitch currentLocale={locale} />
                  <nav className="flex ml-auto text-sm font-medium space-x-6">
                    <Link href="/">{t("menu.home")}</Link>
                    <Link href="/about">{t("menu.about")}</Link>
                    <TagPopover tags={tagList} />
                  </nav>
                </div>
              </header>
              <main>{children}</main>
            </div>
            <Analytics />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
