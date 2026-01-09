import { Metadata } from 'next'
import { BookOpen, Lightbulb, AlertTriangle, Swords, TrendingUp, Map } from 'lucide-react'
import GuideCard from '@/components/guides/GuideCard'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export const metadata: Metadata = {
  title: 'Devil Hunter Guides & Strategies | Devil Hunter Games',
  description:
    'Complete guides for Devil Hunter. Beginner tips, PvP strategies, mistake prevention, and Yen farming guides. Avoid permanent mistakes.',
  keywords: [
    'Devil Hunter guides',
    'Devil Hunter tips',
    'Devil Hunter strategies',
    'Devil Hunter beginner guide',
    'Devil Hunter PvP guide',
  ],
}

// Read guides data directly (will move to lib/content.ts later)
function getAllGuides() {
  const guidesDir = path.join(process.cwd(), 'content/guides')
  if (!fs.existsSync(guidesDir)) return []

  const files = fs.readdirSync(guidesDir).filter((file) => file.endsWith('.md'))

  return files.map((filename) => {
    const slug = filename.replace(/\.md$/, '')
    const filePath = path.join(guidesDir, filename)
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { data } = matter(fileContents)

    return {
      slug,
      title: data.title || '',
      description: data.description || '',
      category: data.category || '',
      difficulty: data.difficulty || '',
      readTime: data.readTime || '',
      lastUpdated: data.lastUpdated || '',
    }
  })
}

export default function GuidesPage() {
  const guides = getAllGuides()

  // Problem-oriented index mapping
  const problemIndex = [
    {
      problem: 'Which path should I choose?',
      icon: <Map className="text-brand-primary" size={24} />,
      guide: guides.find((g) => g.slug === 'getting-started'),
    },
    {
      problem: 'How do I avoid regrets?',
      icon: <AlertTriangle className="text-semantic-error" size={24} />,
      guide: guides.find((g) => g.slug === 'permanent-mistakes'),
    },
    {
      problem: 'Why do I keep losing in PvP?',
      icon: <Swords className="text-semantic-warning" size={24} />,
      guide: guides.find((g) => g.slug === 'pvp-mastery'),
    },
    {
      problem: 'How to farm Yen quickly?',
      icon: <TrendingUp className="text-tier-s" size={24} />,
      guide: guides.find((g) => g.slug === 'yen-farming'),
    },
    {
      problem: 'Which contracts should I choose?',
      icon: <Lightbulb className="text-tier-a" size={24} />,
      guide: guides.find((g) => g.slug === 'contract-decision'),
    },
  ]

  return (
    <div className="min-h-screen bg-background-primary">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-background-secondary to-background-primary border-b border-border-primary">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="text-brand-primary" size={32} />
            <h1 className="text-3xl md:text-4xl font-bold text-text-primary">
              Devil Hunter Guides & Strategies
            </h1>
          </div>
          <p className="text-text-secondary text-lg max-w-3xl">
            Expert answers to the most common Devil Hunter questions. Avoid permanent mistakes and
            master the game faster.
          </p>

          {/* Stats */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-background-tertiary rounded-lg p-4 border border-border-primary">
              <div className="text-2xl font-bold text-brand-primary">{guides.length}</div>
              <div className="text-sm text-text-tertiary">Total Guides</div>
            </div>
            <div className="bg-background-tertiary rounded-lg p-4 border border-border-primary">
              <div className="text-2xl font-bold text-semantic-success">27K+</div>
              <div className="text-sm text-text-tertiary">Players Helped</div>
            </div>
            <div className="bg-background-tertiary rounded-lg p-4 border border-border-primary">
              <div className="text-2xl font-bold text-tier-s">100%</div>
              <div className="text-sm text-text-tertiary">Free Content</div>
            </div>
          </div>
        </div>
      </div>

      {/* Problem-Oriented Index */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <h2 className="text-2xl font-bold text-text-primary mb-6">Quick Problem Solver</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {problemIndex.map(
            (item, index) =>
              item.guide && (
                <a
                  key={index}
                  href={`/guides/${item.guide.slug}`}
                  className="bg-background-secondary border-2 border-border-primary rounded-lg p-6 hover:border-brand-primary transition-all hover:scale-105 group"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 mt-1">{item.icon}</div>
                    <div>
                      <h3 className="font-bold text-text-primary mb-2 group-hover:text-brand-primary transition-colors">
                        {item.problem}
                      </h3>
                      <p className="text-sm text-text-secondary line-clamp-2">
                        {item.guide.description}
                      </p>
                      <div className="mt-3 flex items-center gap-2 text-xs text-text-tertiary">
                        <span className="px-2 py-1 rounded bg-background-tertiary border border-border-primary">
                          {item.guide.difficulty}
                        </span>
                        <span>{item.guide.readTime}</span>
                      </div>
                    </div>
                  </div>
                </a>
              )
          )}
        </div>
      </div>

      {/* All Guides Grid */}
      <div className="bg-background-secondary border-t border-border-primary">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
          <h2 className="text-2xl font-bold text-text-primary mb-6">All Guides</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {guides.map((guide) => (
              <GuideCard key={guide.slug} guide={guide} />
            ))}
          </div>

          {guides.length === 0 && (
            <div className="text-center py-12">
              <p className="text-text-secondary">No guides available yet. Check back soon!</p>
            </div>
          )}
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-4">
          Still Have Questions?
        </h2>
        <p className="text-text-secondary text-lg mb-6 max-w-2xl mx-auto">
          Join our Discord community of 27,000+ Devil Hunter players for real-time help and
          discussion.
        </p>
        <a
          href="https://discord.gg/devilhunter"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-brand-primary text-text-primary px-8 py-4 rounded-lg font-bold text-lg hover:bg-brand-secondary transition-all hover:scale-105 shadow-xl"
        >
          Join Discord Community
        </a>
      </div>
    </div>
  )
}
