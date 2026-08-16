import Image from "next/image"
import { MDXRemote } from "next-mdx-remote/rsc"
import rehypePrettyCode from "rehype-pretty-code"
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

const components = {
  Image,
  a: MdxLink,
}

interface MdxProps {
  source: string
}

export async function Mdx({ source }: MdxProps): Promise<React.ReactNode> {
  return await MDXRemote({
    source,
    components,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [[rehypePrettyCode, { theme: "dark-plus" }]],
      },
    },
  })
}
