import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import { Toaster } from '@/components/ui/sonner'
import 'nextra-theme-docs/style.css'
import './globals.css'

export const metadata = {
  title: {
    default: 'Design System',
    template: '%s · Design System',
  },
  description:
    'House design system built on shadcn/ui and Tailwind v4 — opinionated defaults for colour, radius, typography, and patterns.',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

const navbar = <Navbar logo={<b>Design System</b>} />
const footer = <Footer>{new Date().getFullYear()} © Design System.</Footer>

export default async function RootLayout({ children }) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <Head />
      <body>
        <Layout
          navbar={navbar}
          pageMap={await getPageMap()}
          footer={footer}
        >
          {children}
        </Layout>
        <Toaster />
      </body>
    </html>
  )
}