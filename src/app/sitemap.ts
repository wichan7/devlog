import { allPosts } from "contentlayer/generated"
import type { MetadataRoute } from "next"
import i18nConfig from "@/i18n/constant.json"

const SITE_URL = process.env.SITE_URL || "https://blog.wichan.dev"
const locales = i18nConfig.locales

function localeUrl(locale: string, path: string) {
  const prefix = locale === "ko" ? "" : `/${locale}`
  return `${SITE_URL}${prefix}${path}`
}

export default function sitemap(): MetadataRoute.Sitemap {
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { path: "", priority: 1.0 },
    { path: "/about", priority: 0.8 },
  ].flatMap(({ path, priority }) =>
    locales.map((locale) => ({
      url: localeUrl(locale, path),
      changeFrequency: "weekly" as const,
      priority,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, localeUrl(l, path)]),
        ),
      },
    })),
  )

  // Posts grouped by slugAsParams (same post across locales)
  const slugSet = Array.from(new Set(allPosts.map((p) => p.slugAsParams)))

  const postPages: MetadataRoute.Sitemap = slugSet.flatMap((slugAsParams) => {
    const path = `/${slugAsParams}`
    return locales.map((locale) => {
      const post = allPosts.find(
        (p) => p.slugAsParams === slugAsParams && p.locale === locale,
      )
      return {
        url: localeUrl(locale, path),
        lastModified: post ? new Date(post.date) : new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.7,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, localeUrl(l, path)]),
          ),
        },
      }
    })
  })

  // Tag pages
  const tagSet = Array.from(new Set(allPosts.flatMap((p) => p.tags)))

  const tagPages: MetadataRoute.Sitemap = tagSet.flatMap((tag) =>
    locales.map((locale) => ({
      url: localeUrl(locale, `/tags/${tag}`),
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.5,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, localeUrl(l, `/tags/${tag}`)]),
        ),
      },
    })),
  )

  return [...staticPages, ...postPages, ...tagPages]
}
