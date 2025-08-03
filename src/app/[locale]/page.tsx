import { allPosts } from "contentlayer/generated"
import Link from "next/link"

interface Props {
  params: {
    locale: string
  }
}

export default function Home({ params }: Props) {
  const { locale } = params

  return (
    <div className="prose dark:prose-invert">
      {allPosts
        .filter((post) => post.locale === locale)
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
