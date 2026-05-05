import { allPosts } from "contentlayer/generated"
import type { Metadata } from "next/types"
import { getTranslations } from "next-intl/server"
import { Link } from "@/i18n/navigation"
import { formatDate } from "@/lib/format-date"

interface HomeProps {
  params: {
    locale: string
  }
}

const SITE_URL = process.env.SITE_URL || "https://blog.wichan.dev"

export async function generateMetadata({
  params,
}: HomeProps): Promise<Metadata> {
  const { locale } = params
  const t = await getTranslations()

  return {
    title: t("metadata.title"),
    description: t("metadata.description"),
    alternates: {
      canonical: `${SITE_URL}${locale === "ko" ? "" : `/${locale}`}`,
      languages: {
        ko: SITE_URL,
        en: `${SITE_URL}/en`,
        ja: `${SITE_URL}/ja`,
      },
    },
  }
}

export default function Home({ params }: HomeProps) {
  const { locale } = params

  const posts = allPosts
    .filter((post) => post.locale === locale)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <div className="divide-y" style={{ borderColor: "var(--color-border)" }}>
      {posts.map((post) => (
        <article key={post._id} className="group py-7 first:pt-1">
          <Link href={`/${post.slugAsParams}`} className="block space-y-1.5">
            <h2
              className="text-lg font-semibold leading-snug transition-colors duration-150 group-hover:text-[var(--color-accent)]"
              style={{
                letterSpacing: "-0.02em",
                color: "var(--color-text)",
              }}
            >
              {post.title}
            </h2>
            {post.description && (
              <p
                className="text-sm leading-relaxed line-clamp-2"
                style={{ color: "var(--color-text-2)" }}
              >
                {post.description}
              </p>
            )}
            <time
              className="block text-xs pt-0.5"
              style={{ color: "var(--color-text-3)" }}
            >
              {formatDate(post.date, locale)}
            </time>
          </Link>
        </article>
      ))}
    </div>
  )
}
