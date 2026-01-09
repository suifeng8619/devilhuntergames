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
  metadataBase: new URL('https://devilhuntergames.com'),
  title: 'Devil Hunter Guide - Best Devil Hunter Builds, Contracts & Strategies',
  description: 'Complete Devil Hunter guide with best Devil Hunter builds, contract database, and Devil Hunter strategies. Master Roblox Devil Hunter PvP and PvE with expert Devil Hunter tips.',
  keywords: [
    'Devil Hunter',
    'Devil Hunter guide',
    'Devil Hunter builds',
    'Devil Hunter contracts',
    'Roblox Devil Hunter',
    'Devil Hunter PvP',
    'Devil Hunter PvE',
    'Devil Hunter strategies',
    'Devil Hunter tips',
    'Devil Hunter talents',
    'Devil Hunter database',
  ],
  authors: [{ name: 'Devil Hunter Guide Team' }],
  alternates: {
    canonical: 'https://devilhuntergames.com',
  },
  openGraph: {
    title: 'Devil Hunter Guide - Best Devil Hunter Builds & Strategies',
    description:
      'Complete Devil Hunter guide for Roblox. Learn best Devil Hunter builds, contracts, and strategies to dominate Devil Hunter gameplay.',
    url: 'https://devilhuntergames.com',
    siteName: 'Devil Hunter Guide',
    locale: 'zh_CN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Devil Hunter Guide - Best Builds & Strategies',
    description: 'Master Roblox Devil Hunter with our comprehensive Devil Hunter guide, builds, and strategies',
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
