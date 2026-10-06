import rehypeToc from "@jsdevtools/rehype-toc"
import Image from "next/image"
import { MDXRemote } from "next-mdx-remote/rsc"
import rehypePrettyCode from "rehype-pretty-code"
import rehypeSlug from "rehype-slug"
import remarkGfm from "remark-gfm"
import { Link } from "@/i18n/navigation"

function MdxLink({
  href,
  popover,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  if (!href || !href.startsWith("/")) {
    return <a href={href} popover={popover} {...props} />
  }
  return <Link href={href as Parameters<typeof Link>[0]["href"]} {...props} />
}

function MdxNav({ children, className, ...props }: React.ComponentProps<"nav">) {
  if (className !== "toc") {
    return <nav className={className} {...props}>{children}</nav>
  }

  return (
    <aside className="not-prose absolute bottom-0 left-full top-0 hidden w-60 pl-8 xl:block [&:has(.toc-level-1:empty)]:hidden">
      <nav aria-label="On this page" className="sticky top-24 border-l border-[var(--color-border)] pl-4 pr-2 text-sm [&_ol_ol]:pl-3 [&_a]:block [&_a]:py-1 [&_a]:font-normal [&_a]:text-[var(--color-text-2)] [&_a]:no-underline [&_a]:[overflow-wrap:anywhere] [&_a:hover]:text-[var(--color-accent)] [&_a:focus-visible]:ring-2 [&_a:focus-visible]:ring-[var(--color-accent)]">
        <p className="mb-3 font-semibold">On this page</p>
        {children}
      </nav>
    </aside>
  )
}

const components = {
  Image,
  a: MdxLink,
}

interface MdxProps {
  source: string
  toc?: boolean
}

export async function Mdx({ source, toc = false }: MdxProps): Promise<React.ReactNode> {
  return await MDXRemote({
    source,
    components: { ...components, ...(toc ? { nav: MdxNav } : {}) },
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          [rehypePrettyCode, { theme: "dark-plus" }],
          ...(toc ? [rehypeSlug, rehypeToc] : []),
        ],
      },
    },
  })
}
