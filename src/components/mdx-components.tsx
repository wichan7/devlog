import Image from "next/image"
import { useMDXComponent } from "next-contentlayer/hooks"
import { Link } from "@/i18n/navigation"

function MdxLink({
  href,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  if (!href || !href.startsWith("/")) {
    return <a href={href} {...props} />
  }
  return <Link href={href as Parameters<typeof Link>[0]["href"]} {...props} />
}

const components = {
  Image,
  a: MdxLink,
}

interface MdxProps {
  code: string
}

export function Mdx({ code }: MdxProps) {
  const Component = useMDXComponent(code)

  return <Component components={components} />
}
