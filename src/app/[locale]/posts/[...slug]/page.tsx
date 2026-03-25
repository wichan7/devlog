import { allPosts } from "contentlayer/generated"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Giscus from "@/components/giscus"
import { Mdx } from "@/components/mdx-components"
import { Link } from "@/i18n/navigation"

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
    <article className="py-6 prose max-w-none dark:prose-invert">
      <h1 className="mb-2">{post.title}</h1>
      {post.description && (
        <p className="text-xl mt-0 text-slate-700 dark:text-slate-200">
          {post.description}
        </p>
      )}
      <hr className="my-4" />
      <Mdx code={post.body.code} />
      <div className="not-prose flex flex-wrap gap-2 mt-8">
        {post.tags.map((tag) => (
          <Link
            key={tag}
            href={`/tags/${tag}`}
            className="px-3 py-1 text-sm rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            {tag}
          </Link>
        ))}
      </div>
      <Giscus currentLocale={params.locale} />
    </article>
  )
}
