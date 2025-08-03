import { allPages } from "contentlayer/generated"
import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { Mdx } from "@/components/mdx-components"
import { locales } from "@/i18n/locales.json"

interface PageProps {
  params: {
    slug: string[]
    locale: string
  }
}

async function getPageFromParams(params: PageProps["params"]) {
  const slug = params?.slug?.join("/")
  const currentLocale = params?.locale

  const page = allPages.find(
    (page) => page.slug === `/${currentLocale}/pages/${slug}`,
  )

  return page ?? null
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const page = await getPageFromParams(params)

  if (!page) {
    return {}
  }

  return {
    title: page.title,
    description: page.description,
  }
}

export async function generateStaticParams(): Promise<PageProps["params"][]> {
  return locales.flatMap((locale) =>
    allPages
      .filter((page) => page.locale === locale)
      .map((page) => ({
        slug: page.slugAsParams.split("/"),
        locale,
      })),
  )
}

export default async function PagePage({ params }: PageProps) {
  const page = await getPageFromParams(params)

  if (!page) {
    notFound()
  }

  return (
    <article className="py-6 prose dark:prose-invert">
      <h1>{page.title}</h1>
      {page.description && <p className="text-xl">{page.description}</p>}
      <hr />
      <Mdx code={page.body.code} />
    </article>
  )
}
