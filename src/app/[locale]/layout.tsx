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
        className={`antialiased min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-slate-900 dark:text-slate-50 tabular-nums ${inter.className}`}
      >
        <NextIntlClientProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="min-h-screen">
              <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
              </div>

              <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                {/* 헤더 */}
                <header className="sticky top-4 z-50 mb-8">
                  <div className="relative backdrop-blur-md bg-white/70 dark:bg-slate-900/70 rounded-2xl border border-slate-200/50 dark:border-slate-700/50 shadow-lg shadow-slate-200/50 dark:shadow-slate-900/50 p-4 transition-all duration-300">
                    <div className="flex items-center justify-between gap-4 flex-wrap">
                      <div className="flex items-center gap-3">
                        <ModeToggle />
                        <LocaleSwitch currentLocale={locale} />
                      </div>

                      <nav className="flex items-center gap-3 ml-auto text-sm font-medium">
                        <Link
                          href="/"
                          className="relative px-4 py-2 rounded-lg text-slate-700 dark:text-slate-300 transition-all duration-300 active:text-slate-900 dark:active:text-slate-50 group"
                        >
                          <span className="relative z-10">
                            {t("menu.home")}
                          </span>
                          <span className="absolute inset-0 bg-slate-100 dark:bg-slate-800 rounded-lg opacity-0 group-active:opacity-100 transition-opacity duration-300 -z-0"></span>
                          <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-active:w-full group-active:left-0 transition-all duration-300 -z-0"></span>
                        </Link>
                        <Link
                          href="/about"
                          className="relative px-4 py-2 rounded-lg text-slate-700 dark:text-slate-300 transition-all duration-300 active:text-slate-900 dark:active:text-slate-50 group"
                        >
                          <span className="relative z-10">
                            {t("menu.about")}
                          </span>
                          <span className="absolute inset-0 bg-slate-100 dark:bg-slate-800 rounded-lg opacity-0 group-active:opacity-100 transition-opacity duration-300 -z-0"></span>
                          <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-active:w-full group-active:left-0 transition-all duration-300 -z-0"></span>
                        </Link>
                        <div className="transform transition-transform duration-200 active:scale-105">
                          <TagPopover tags={tagList} />
                        </div>
                      </nav>
                    </div>
                  </div>
                </header>

                <main className="animate-fade-in">{children}</main>
              </div>
            </div>
            <Analytics />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
