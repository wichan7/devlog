import fs from "node:fs"
import path from "node:path"
import fg from "fast-glob"
import matter from "gray-matter"

const contentDirectory = path.join(process.cwd(), "content")

type ContentDocument = {
  _id: string
  title: string
  description?: string
  slug: string
  slugAsParams: string
  locale: string
  thumbnail: string | null
  body: {
    raw: string
  }
}

export type Post = ContentDocument & {
  date: string
  tags: string[]
}

export type Page = ContentDocument

type PageFrontmatter = Pick<ContentDocument, "title" | "description">
type PostFrontmatter = PageFrontmatter & {
  date: string | Date
  tags: string[]
}

function readDocument<T extends PageFrontmatter>(filePath: string) {
  const source = fs.readFileSync(path.join(contentDirectory, filePath), "utf8")
  const { content, data } = matter(source)
  const flattenedPath = filePath.replace(/\.mdx$/, "")

  return {
    _id: filePath,
    title: data.title,
    description: data.description,
    slug: `/${flattenedPath}`,
    slugAsParams: flattenedPath.split("/").slice(1).join("/"),
    locale: flattenedPath.split("/")[0],
    thumbnail: content.match(/!\[.*?\]\((.+?)\)/)?.[1] ?? null,
    body: { raw: content },
    data: data as T,
  }
}

function loadPosts(): Post[] {
  return fg.sync("*/posts/**/*.mdx", { cwd: contentDirectory }).map((filePath) => {
    const { data, ...document } = readDocument<PostFrontmatter>(filePath)

    return {
      ...document,
      date: data.date instanceof Date ? data.date.toISOString().slice(0, 10) : data.date,
      tags: data.tags,
    }
  })
}

function loadPages(): Page[] {
  return fg.sync("*/pages/**/*.mdx", { cwd: contentDirectory }).map((filePath) => {
    const { data: _data, ...document } = readDocument<PageFrontmatter>(filePath)
    return document
  })
}

export const allPosts = loadPosts()
export const allPages = loadPages()
