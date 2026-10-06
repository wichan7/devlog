import { Analytics } from "@vercel/analytics/react"
import { notFound } from "next/navigation"
import { hasLocale, NextIntlClientProvider } from "next-intl"
import { getTranslations, setRequestLocale } from "next-intl/server"
import GithubIcon from "@/assets/svg/github.svg"
import { BackToTopButton } from "@/components/back-to-top-button"
import { LocaleSwitch } from "@/components/locale-switch"
import { ThemeToggle } from "@/components/mode-toggle"
import { RandomPostButton } from "@/components/random-post-button"
import { RssButton } from "@/components/rss-button"
import { ThemeProvider } from "@/components/theme-provider"
import { Link } from "@/i18n/navigation"
import { routing } from "@/i18n/routing"
import { allPosts } from "@/lib/content"

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
  const feedUrl =
    locale === routing.defaultLocale ? "/feed.xml" : `/${locale}/feed.xml`
  const postUrls = allPosts
    .filter((post) => post.locale === locale)
    .map((post) => `/${post.slugAsParams}`)

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className="antialiased min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] tabular-nums">
        <NextIntlClientProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <header className="relative z-50 border-b border-[var(--color-border)] bg-[var(--color-bg-header)]">
              <div className="mx-auto flex max-w-5xl items-center justify-between gap-2 px-4 py-4 sm:gap-3 sm:px-6">
                <Link
                  href="/"
                  title={t("metadata.title")}
                  className="min-w-0 truncate text-sm font-bold tracking-tight transition-colors hover:text-[var(--color-accent)] focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] sm:text-lg"
                >
                  {t("metadata.title")}
                </Link>
                <div className="flex shrink-0 items-center gap-1 sm:gap-2">
                  <ThemeToggle />
                  <LocaleSwitch currentLocale={locale} />
                  <RandomPostButton hrefs={postUrls} />
                  <RssButton href={feedUrl} />
                  <a
                    href="https://github.com/wichan7"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    title="GitHub"
                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--color-border)] text-[var(--color-text-2)] transition-all duration-150 hover:text-[var(--color-text)] focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] active:scale-95 active:bg-[var(--color-bg-2)]"
                  >
                    <GithubIcon className="h-4 w-4" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </header>
            <main className="mx-auto max-w-3xl animate-fade-in px-4 py-8 sm:px-6 sm:py-12">
              {children}
            </main>
            <BackToTopButton label={t("common.backToTop")} />
            <Analytics />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
