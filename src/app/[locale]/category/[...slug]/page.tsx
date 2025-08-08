import { allPosts } from "contentlayer/generated"
import type { Metadata } from "next"
import { Link } from "@/i18n/navigation"

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
  const categoryName = params.slug[0]
  const locale = params.locale

  return (
    <article className="py-6 prose dark:prose-invert">
      <h1>{categoryName}</h1>
      <hr />
      {allPosts
        .filter((post) => post.locale === locale)
        .filter((post) => post.tags.includes(categoryName))
        .map((post) => (
          <article key={post._id}>
            <Link href={post.slug}>
              <h2>{post.title}</h2>
            </Link>
            {post.description && <p>{post.description}</p>}
          </article>
        ))}
    </article>
  )
}
