import { allPosts } from "contentlayer/generated"
import type { Metadata } from "next"
import { Link } from "@/i18n/navigation"
import { formatDate } from "@/lib/format-date"

interface PageProps {
  params: {
    slug: string[]
    locale: string
  }
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  return {
    title: params.slug[0],
  }
}

export default async function PagePage({ params }: PageProps) {
  const tagName = params.slug[0]
  const locale = params.locale

  const posts = allPosts
    .filter((post) => post.locale === locale)
    .filter((post) => post.tags.includes(tagName))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <div className="py-4">
      <header
        className="mb-8 pb-6"
        style={{ borderBottom: "1px solid var(--color-border)" }}
      >
        <p className="text-xs mb-1" style={{ color: "var(--color-text-3)" }}>
          TAG
        </p>
        <h1
          className="text-2xl font-bold"
          style={{ letterSpacing: "-0.025em", color: "var(--color-text)" }}
        >
          {tagName}
        </h1>
      </header>

      <div className="divide-y" style={{ borderColor: "var(--color-border)" }}>
        {posts.map((post) => (
          <article key={post._id} className="group py-7 first:pt-1">
            <Link href={`/${post.slugAsParams}`} className="block space-y-1.5">
              <h2
                className="text-lg font-semibold leading-snug transition-colors duration-150 group-hover:text-[#f54e00]"
                style={{ letterSpacing: "-0.02em", color: "var(--color-text)" }}
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
    </div>
  )
}
