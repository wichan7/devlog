import { allPosts } from "contentlayer/generated"
import RSS from "rss"

const SITE_URL = process.env.SITE_URL ?? "https://blog.wichan.dev"

export async function GET() {
  const feed = new RSS({
    title: "wichan's devlog",
    description: "wichan's devlog",
    site_url: SITE_URL,
    feed_url: `${SITE_URL}/feed.xml`,
    language: "ko",
  })

  const posts = allPosts
    .filter((post) => post.locale === "ko")
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
