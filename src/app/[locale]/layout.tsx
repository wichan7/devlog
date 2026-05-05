import { allPosts } from "contentlayer/generated"
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
      <body className="antialiased min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] tabular-nums">
        <NextIntlClientProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="max-w-3xl mx-auto py-4 sm:py-8 px-4 sm:px-6">
              {/* 헤더 */}
              <header className="sticky top-3 z-50 mb-6 sm:mb-10">
                <div
                  className="backdrop-blur-md rounded-2xl px-3 py-2 flex items-center justify-between gap-2"
                  style={{
                    background: "var(--color-bg-header)",
                    border: "1px solid var(--color-border)",
                    boxShadow:
                      "rgba(0,0,0,0.04) 0px 2px 12px, rgba(0,0,0,0.02) 0px 1px 4px",
                  }}
                >
                  <div className="flex items-center gap-2">
                    <ModeToggle />
                    <LocaleSwitch currentLocale={locale} />
                  </div>

                  <nav className="flex items-center gap-0.5 ml-auto text-sm font-medium">
                    <Link
                      href="/"
                      className="px-3 py-1.5 rounded-lg text-[var(--color-text-2)] hover:text-[var(--color-text)] hover:bg-[var(--color-border)] transition-all duration-150"
                    >
                      {t("menu.home")}
                    </Link>
                    <Link
                      href="/about"
                      className="px-3 py-1.5 rounded-lg text-[var(--color-text-2)] hover:text-[var(--color-text)] hover:bg-[var(--color-border)] transition-all duration-150"
                    >
                      {t("menu.about")}
                    </Link>
                    <TagPopover tags={tagList} />
                  </nav>
                </div>
              </header>

              <main className="animate-fade-in">{children}</main>
            </div>
            <Analytics />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
