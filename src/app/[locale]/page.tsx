import { allPosts } from "contentlayer/generated"
import Link from "next/link"
import type { Metadata } from "next/types"
import { getTranslations } from "next-intl/server"

interface HomeProps {
  params: {
    locale: string
  }
}

const SITE_URL = process.env.SITE_URL || "https://blog.wichan.dev"

export async function generateMetadata({ params }: HomeProps): Promise<Metadata> {
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

  return (
    <div className="prose max-w-none dark:prose-invert">
      {allPosts
        .filter((post) => post.locale === locale)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .map((post) => (
          <article key={post._id}>
            <Link href={post.slug}>
              <h2>{post.title}</h2>
            </Link>
            {post.description && <p>{post.description}</p>}
          </article>
        ))}
    </div>
  )
}
