"use client"

import Image from "next/image"
import { useTranslations } from "next-intl"
import { useState } from "react"
import { Link } from "@/i18n/navigation"
import { formatDate } from "@/lib/format-date"

const INITIAL_TAG_COUNT = 8

type Post = {
  _id: string
  title: string
  description?: string | null
  date: string
  tags: string[]
  slugAsParams: string
  thumbnail?: string | null
}

type Tag = {
  name: string
  count: number
}

interface PostListProps {
  posts: Post[]
  tags: Tag[]
  locale: string
}

export function PostList({ posts, tags, locale }: PostListProps) {
  const t = useTranslations()
  const [activeTag, setActiveTag] = useState<string | null>(null)
  const [expanded, setExpanded] = useState(false)

  const filteredPosts = activeTag
    ? posts.filter((post) => post.tags.includes(activeTag))
    : posts

  const sortedTags = [...tags].sort((a, b) => b.count - a.count)
  const visibleTags = expanded
    ? sortedTags
    : sortedTags.slice(0, INITIAL_TAG_COUNT)
  const hasMore = sortedTags.length > INITIAL_TAG_COUNT

  return (
    <div>
      <div className="flex gap-1.5 flex-wrap mb-8">
        <button
          onClick={() => setActiveTag(null)}
          className="flex-none px-3 py-1 rounded-full text-sm font-medium transition-colors duration-150"
          style={{
            background: !activeTag
              ? "var(--color-accent)"
              : "var(--color-bg-2)",
            color: !activeTag ? "var(--color-bg)" : "var(--color-text-2)",
          }}
        >
          {t("tags.all")}
        </button>
        {visibleTags.map((tag) => {
          const isActive = activeTag === tag.name
          return (
            <button
              key={tag.name}
              onClick={() => setActiveTag(isActive ? null : tag.name)}
              className="flex-none flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium transition-colors duration-150"
              style={{
                background: isActive
                  ? "var(--color-accent)"
                  : "var(--color-bg-2)",
                color: isActive ? "var(--color-bg)" : "var(--color-text-2)",
              }}
            >
              {tag.name}
              <span className="text-xs" style={{ opacity: 0.65 }}>
                {tag.count}
              </span>
            </button>
          )
        })}
        {hasMore && (
          <button
            onClick={() => setExpanded((v) => !v)}
            className="flex-none px-3 py-1 rounded-full text-sm font-medium transition-colors duration-150"
            style={{
              color: "var(--color-text-3)",
              border: "1px solid var(--color-border)",
            }}
          >
            {expanded
              ? t("tags.collapse")
              : `${t("tags.expand")} +${sortedTags.length - INITIAL_TAG_COUNT}`}
          </button>
        )}
      </div>

      <div className="divide-y" style={{ borderColor: "var(--color-border)" }}>
        {filteredPosts.map((post) => (
          <article key={post._id} className="group py-7 first:pt-1">
            <Link
              href={`/${post.slugAsParams}`}
              className="flex gap-4 items-start"
            >
              <div className="flex-1 min-w-0 space-y-1.5">
                <h2
                  className="text-lg font-semibold leading-snug transition-colors duration-150 group-hover:text-[var(--color-accent)]"
                  style={{
                    letterSpacing: "-0.02em",
                    color: "var(--color-text)",
                  }}
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
              </div>
              {post.thumbnail && (
                <div
                  className="flex-none w-20 h-20 rounded-md overflow-hidden relative"
                  style={{ background: "var(--color-bg-2)", border: "1px solid var(--color-border)", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}
                >
                  <Image
                    src={post.thumbnail}
                    alt=""
                    fill
                    sizes="320px"
                    className="object-cover"
                  />
                </div>
              )}
            </Link>
          </article>
        ))}
      </div>
    </div>
  )
}
