import { allPosts } from "contentlayer/generated"
import type { Metadata } from "next/types"
import { getTranslations } from "next-intl/server"
import { PostList } from "@/components/post-list"

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
    .map(({ _id, title, description, date, tags, slugAsParams, thumbnail }) => ({
      _id,
      title,
      description,
      date,
      tags,
      slugAsParams,
      thumbnail,
    }))

  const tagMap = posts
    .flatMap((post) => post.tags)
    .reduce(
      (acc, tag) => {
        acc[tag] = (acc[tag] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

  const tags = Object.entries(tagMap).map(([name, count]) => ({ name, count }))

  return <PostList posts={posts} tags={tags} locale={locale} />
}
