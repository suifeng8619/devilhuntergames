import type { Metadata } from 'next'
import { Inter, Noto_Sans_SC } from 'next/font/google'
import './globals.css'

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
  keywords: ['Devil Hunter', 'Roblox', 'Build Planner', 'Contracts', 'Guides'],
  authors: [{ name: 'Devil Hunter Games' }],
  openGraph: {
    title: 'Devil Hunter Games',
    description: 'Your ultimate decision support system for Roblox Devil Hunter',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${notoSansSC.variable} dark`}>
      <body className="font-sans">
        {children}
      </body>
    </html>
  )
}
