import { Inter } from "next/font/google"
import Link from "next/link"
import { notFound } from "next/navigation"
import { hasLocale, NextIntlClientProvider } from "next-intl"
import { getTranslations } from "next-intl/server"
import { Analytics } from "@/components/analytics"
import { ModeToggle } from "@/components/mode-toggle"
import { ThemeProvider } from "@/components/theme-provider"
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

  const t = await getTranslations()

  return (
    <html lang={locale}>
      <body
        className={`antialiased min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 ${inter.className}`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="max-w-2xl mx-auto py-10 px-4">
            <header>
              <div className="flex items-center justify-between">
                <ModeToggle />
                <nav className="ml-auto text-sm font-medium space-x-6">
                  <Link href="/">{t("menu.home")}</Link>
                  <Link href="/about">{t("menu.about")}</Link>
                </nav>
              </div>
            </header>
            <main>
              <NextIntlClientProvider>{children}</NextIntlClientProvider>
            </main>
          </div>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
