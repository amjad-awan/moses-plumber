
import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { business } from '@/config/business'
import { SiteFooter, SiteHeader } from '@/components/site-chrome'
import './globals.css'

export const metadata: Metadata = {
  title: `${business.name} | Plumbing, Gas & Electrical Services`,
  description: `Professional plumbing, gas installation and electrical services in ${business.serviceArea}. Contact ${business.name} to discuss your requirements.`,
  metadataBase: new URL(
    business.websiteUrl.startsWith('http')
      ? business.websiteUrl
      : 'https://example.com',
  ),
  robots: {
    index: !business.name.includes('['),
    follow: true,
  },
 icons: {
  icon: [
    { url: '/icon.svg', type: 'image/svg+xml' },
    { url: '/favicon.ico', sizes: 'any' },
  ],
  apple: '/apple-icon.png',
},
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#102A43',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <SiteHeader />
        {children}
        <SiteFooter />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
