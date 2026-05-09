import { allPosts } from "contentlayer/generated"
import RSS from "rss"
import i18nConfig from "@/i18n/constant.json"

const SITE_URL = process.env.SITE_URL ?? "https://blog.wichan.dev"

function feedUrl(locale: string) {
  return locale === i18nConfig.defaultLocale
    ? `${SITE_URL}/feed.xml`
    : `${SITE_URL}/${locale}/feed.xml`
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ locale: string }> },
) {
  const { locale } = await params

  const feed = new RSS({
    title: "wichan's devlog",
    description: "wichan's devlog",
    site_url: SITE_URL,
    feed_url: feedUrl(locale),
    language: locale,
  })

  const posts = allPosts
    .filter((post) => post.locale === locale)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  for (const post of posts) {
    feed.item({
      title: post.title,
      description: post.description ?? "",
      url: `${SITE_URL}/${post.slugAsParams}`,
      date: post.date,
    })
  }

  return new Response(feed.xml({ indent: true }), {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600",
    },
  })
}
