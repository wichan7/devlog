import "./globals.css"
import en from "messages/en.json"

interface RootLayoutProps {
  children: React.ReactNode
}

// fallback meta
export const metadata = en.metadata

export default function RootLayout({ children }: RootLayoutProps) {
  return children
}
