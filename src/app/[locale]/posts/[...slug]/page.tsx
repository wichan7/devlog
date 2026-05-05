import { allPosts } from "contentlayer/generated"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Giscus from "@/components/giscus"
import { Mdx } from "@/components/mdx-components"
import { Link } from "@/i18n/navigation"
import { formatDate } from "@/lib/format-date"

interface PostProps {
  params: {
    slug: string[]
    locale: string
  }
}

async function getPostFromParams(params: PostProps["params"]) {
  const slug = params?.slug?.join("/")
  const currentLocale = params?.locale

  const post = allPosts.find(
    (post) => post.slug === `/${currentLocale}/posts/${slug}`,
  )

  return post ?? null
}

const SITE_URL = process.env.SITE_URL || "https://blog.wichan.dev"

export async function generateMetadata({
  params,
}: PostProps): Promise<Metadata> {
  const post = await getPostFromParams(params)

  if (!post) {
    return {}
  }

  const slug = params.slug.join("/")

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `${SITE_URL}${params.locale === "ko" ? "" : `/${params.locale}`}/posts/${slug}`,
      languages: {
        ko: `${SITE_URL}/posts/${slug}`,
        en: `${SITE_URL}/en/posts/${slug}`,
        ja: `${SITE_URL}/ja/posts/${slug}`,
      },
    },
  }
}

export async function generateStaticParams(): Promise<PostProps["params"][]> {
  return allPosts.map((post) => ({
    slug: post.slugAsParams.split("/"),
    locale: post.locale,
  }))
}

export default async function PostPage({ params }: PostProps) {
  const post = await getPostFromParams(params)

  if (!post) {
    notFound()
  }

  return (
    <article className="py-4">
      {/* Article header */}
      <header
        className="mb-8 pb-6"
        style={{ borderBottom: "1px solid var(--color-border)" }}
      >
        <h1
          className="text-3xl sm:text-4xl font-bold leading-tight mb-3"
          style={{ letterSpacing: "-0.03em", color: "var(--color-text)" }}
        >
          {post.title}
        </h1>
        {post.description && (
          <p
            className="text-base leading-relaxed mb-4"
            style={{ color: "var(--color-text-2)" }}
          >
            {post.description}
          </p>
        )}
        <time className="text-xs" style={{ color: "var(--color-text-3)" }}>
          {formatDate(post.date, params.locale)}
        </time>
      </header>

      {/* Article body */}
      <div className="prose max-w-none dark:prose-invert">
        <Mdx code={post.body.code} />
      </div>

      {/* Tags */}
      {post.tags.length > 0 && (
        <footer
          className="mt-10 pt-6 flex flex-wrap gap-2"
          style={{ borderTop: "1px solid var(--color-border)" }}
        >
          {post.tags.map((tag) => (
            <Link key={tag} href={`/tags/${tag}`} className="warm-tag">
              {tag}
            </Link>
          ))}
        </footer>
      )}

      <Giscus currentLocale={params.locale} />
    </article>
  )
}
