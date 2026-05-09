import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import { Toaster } from '@/components/ui/sonner'
import 'nextra-theme-docs/style.css'
import './globals.css'

export const metadata = {
  title: {
    default: 'Standards',
    template: '%s · Standards',
  },
  description:
    'Internal standards across design, requirements, and more.',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

const navbar = (
  <Navbar
    logo={<b>Standards</b>}
    projectLink="https://github.com/zeel-04/standards"
  />
)
const footer = <Footer>{new Date().getFullYear()} © Standards.</Footer>

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