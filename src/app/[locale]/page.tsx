import { allPosts } from "contentlayer/generated"
import Link from "next/link"
import type { Metadata } from "next/types"
import { getTranslations } from "next-intl/server"

interface HomeProps {
  params: {
    locale: string
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations()

  return {
    title: t("metadata.title"),
    description: t("metadata.description"),
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
