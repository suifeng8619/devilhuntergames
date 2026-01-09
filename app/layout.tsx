import type { Metadata } from 'next'
import { Inter, Noto_Sans_SC } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const notoSansSC = Noto_Sans_SC({
  weight: ['400', '500', '700'],
  display: 'swap',
  variable: '--font-noto-sans-sc',
})

export const metadata: Metadata = {
  title: 'Devil Hunter Games - Your Ultimate Decision Support System',
  description: 'Make the right choices in Roblox Devil Hunter. Build planner, contract database, and comprehensive guides to help you avoid regret.',
  keywords: [
    'Devil Hunter',
    'Roblox',
    'Build Planner',
    'Contracts',
    'Guides',
    'Fiend Talents',
    'Hybrid Forms',
    'PvP',
    'PvE',
  ],
  authors: [{ name: 'Devil Hunter Games' }],
  openGraph: {
    title: 'Devil Hunter Games - Ultimate Decision Support System',
    description:
      'Make the right choices in Roblox Devil Hunter. Build planner, contract database, and comprehensive guides to help you avoid regret.',
    url: 'https://devilhuntergames.com',
    siteName: 'Devil Hunter Games',
    locale: 'zh_CN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Devil Hunter Games',
    description: 'Your ultimate decision support system for Roblox Devil Hunter',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh" className={`${inter.variable} ${notoSansSC.variable} dark`}>
      <body className="font-sans bg-background-primary text-text-primary min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
