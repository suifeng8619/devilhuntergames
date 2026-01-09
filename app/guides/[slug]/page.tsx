import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, BookOpen, Clock, Calendar, AlertTriangle } from 'lucide-react'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { markdownToHtml, extractTableOfContents } from '@/lib/markdown'

// Temporary data reading (will move to lib/content.ts later)
interface Guide {
  slug: string
  content: string
  title: string
  description: string
  category: string
  difficulty: string
  readTime: string
  lastUpdated: string
  relatedGuides: string[]
  relatedContracts: string[]
}

function getAllGuides(): Guide[] {
  const guidesDir = path.join(process.cwd(), 'content/guides')
  if (!fs.existsSync(guidesDir)) return []

  const files = fs.readdirSync(guidesDir).filter((file) => file.endsWith('.md'))

  return files.map((filename) => {
    const slug = filename.replace(/\.md$/, '')
    const filePath = path.join(guidesDir, filename)
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      slug,
      content,
      title: data.title || '',
      description: data.description || '',
      category: data.category || '',
      difficulty: data.difficulty || '',
      readTime: data.readTime || '',
      lastUpdated: data.lastUpdated || '',
      relatedGuides: data.relatedGuides || [],
      relatedContracts: data.relatedContracts || [],
    }
  })
}

function getGuideBySlug(slug: string): Guide | null {
  const guides = getAllGuides()
  return guides.find((g) => g.slug === slug) || null
}

// Generate static params for all guides
export async function generateStaticParams() {
  const guides = getAllGuides()
  return guides.map((guide) => ({
    slug: guide.slug,
  }))
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const guide = getGuideBySlug(slug)

  if (!guide) {
    return {
      title: 'Guide Not Found | Devil Hunter Games',
    }
  }

  return {
    title: `${guide.title} | Devil Hunter Games`,
    description: guide.description,
    keywords: [
      'Devil Hunter guide',
      guide.title,
      guide.category,
      'Devil Hunter tips',
      'Devil Hunter strategies',
    ],
    openGraph: {
      title: `${guide.title} | Devil Hunter Games`,
      description: guide.description,
      type: 'article',
      publishedTime: guide.lastUpdated,
    },
  }
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const guide = getGuideBySlug(slug)

  if (!guide) {
    notFound()
  }

  // Convert markdown to HTML (content is from our own markdown files, sanitized by remark/rehype)
  const htmlContent = await markdownToHtml(guide.content)

  // Extract table of contents
  const toc = extractTableOfContents(guide.content)

  // Get difficulty color
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'border-semantic-success text-semantic-success bg-semantic-success/10'
      case 'Intermediate':
        return 'border-tier-b text-tier-b bg-tier-b/10'
      case 'Advanced':
        return 'border-semantic-warning text-semantic-warning bg-semantic-warning/10'
      case 'Expert':
        return 'border-semantic-error text-semantic-error bg-semantic-error/10'
      default:
        return 'border-border-primary text-text-secondary'
    }
  }

  // Get related guides
  const allGuides = getAllGuides()
  const relatedGuidesData = guide.relatedGuides
    .map((slug) => allGuides.find((g) => g.slug === slug))
    .filter((g): g is Guide => g !== undefined)

  return (
    <div className="min-h-screen bg-background-primary">
      {/* Back Button */}
      <div className="px-4 md:px-8 lg:px-16 py-4 border-b border-border-primary">
        <Link
          href="/guides"
          className="inline-flex items-center gap-2 text-text-secondary hover:text-brand-primary transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Back to Guides</span>
        </Link>
      </div>

      {/* Hero Section */}
      <section className="px-4 md:px-8 lg:px-16 py-12 bg-gradient-to-b from-background-secondary to-background-primary border-b border-border-primary">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span
              className={`inline-flex items-center px-3 py-1 rounded-md text-xs font-bold border-2 ${getDifficultyColor(
                guide.difficulty
              )}`}
            >
              {guide.difficulty}
            </span>
            <span className="px-3 py-1 rounded-md text-xs font-semibold bg-brand-primary/20 text-brand-primary border border-brand-primary/50">
              {guide.category}
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold mb-4 text-text-primary">{guide.title}</h1>

          <p className="text-text-secondary text-lg mb-6 max-w-3xl">{guide.description}</p>

          <div className="flex flex-wrap items-center gap-6 text-sm text-text-tertiary">
            <div className="flex items-center gap-2">
              <Clock size={16} />
              <span>{guide.readTime} read</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              <span>Last updated: {guide.lastUpdated}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-4 md:px-8 lg:px-16 py-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left 2/3 - Guide Content */}
          <div className="lg:col-span-2">
            <article
              className="prose prose-invert prose-lg max-w-none
                prose-headings:text-text-primary prose-headings:font-bold
                prose-p:text-text-secondary prose-p:leading-relaxed
                prose-a:text-brand-primary prose-a:no-underline hover:prose-a:underline
                prose-strong:text-text-primary prose-strong:font-bold
                prose-code:text-brand-primary prose-code:bg-background-secondary prose-code:px-1 prose-code:py-0.5 prose-code:rounded
                prose-pre:bg-background-secondary prose-pre:border prose-pre:border-border-primary
                prose-ul:text-text-secondary prose-ol:text-text-secondary
                prose-li:text-text-secondary prose-li:marker:text-brand-primary
                prose-blockquote:text-text-secondary prose-blockquote:border-l-brand-primary
                prose-table:text-text-secondary
                prose-th:text-text-primary prose-th:bg-background-secondary
                prose-td:border-border-primary
                prose-img:rounded-lg prose-img:border prose-img:border-border-primary"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
          </div>

          {/* Right 1/3 - Sticky Sidebar */}
          <div className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            {/* Table of Contents */}
            {toc.length > 0 && (
              <div className="bg-background-secondary rounded-lg p-6 border border-border-primary">
                <h3 className="text-lg font-bold text-text-primary mb-4 flex items-center gap-2">
                  <BookOpen size={20} className="text-brand-primary" />
                  Table of Contents
                </h3>
                <nav className="space-y-2">
                  {toc.map((heading, index) => (
                    <a
                      key={index}
                      href={`#${heading.slug}`}
                      className={`block text-sm hover:text-brand-primary transition-colors ${
                        heading.level === 2
                          ? 'text-text-primary font-semibold'
                          : 'text-text-secondary pl-4'
                      }`}
                    >
                      {heading.text}
                    </a>
                  ))}
                </nav>
              </div>
            )}

            {/* Related Guides */}
            {relatedGuidesData.length > 0 && (
              <div className="bg-background-secondary rounded-lg p-6 border border-border-primary">
                <h3 className="text-lg font-bold text-text-primary mb-4">Related Guides</h3>
                <div className="space-y-3">
                  {relatedGuidesData.map((relatedGuide) => (
                    <Link
                      key={relatedGuide.slug}
                      href={`/guides/${relatedGuide.slug}`}
                      className="block group"
                    >
                      <div className="text-sm">
                        <p className="font-semibold text-text-primary group-hover:text-brand-primary transition-colors mb-1">
                          {relatedGuide.title}
                        </p>
                        <p className="text-text-tertiary text-xs">{relatedGuide.readTime}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Related Contracts */}
            {guide.relatedContracts.length > 0 && (
              <div className="bg-background-secondary rounded-lg p-6 border border-border-primary">
                <h3 className="text-lg font-bold text-text-primary mb-4">Related Contracts</h3>
                <div className="space-y-3">
                  {guide.relatedContracts.map((contractId) => (
                    <Link
                      key={contractId}
                      href={`/database/contracts/${contractId}`}
                      className="block text-sm text-text-secondary hover:text-brand-primary transition-colors"
                    >
                      {contractId
                        .split('-')
                        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(' ')}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Help Box */}
            <div className="bg-semantic-warning/10 border border-semantic-warning rounded-lg p-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="text-semantic-warning flex-shrink-0 mt-1" size={20} />
                <div>
                  <h4 className="font-bold text-text-primary mb-2">Still Have Questions?</h4>
                  <p className="text-sm text-text-secondary mb-3">
                    Join our Discord community of 27,000+ players for real-time help.
                  </p>
                  <a
                    href="https://discord.gg/devilhunter"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-brand-primary hover:underline"
                  >
                    Join Discord →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Navigation */}
      <section className="px-4 md:px-8 lg:px-16 py-12 border-t border-border-primary bg-background-secondary">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-text-primary mb-4">Explore More Guides</h2>
          <Link
            href="/guides"
            className="inline-flex items-center gap-2 bg-brand-primary text-text-primary px-6 py-3 rounded-lg font-bold hover:bg-brand-secondary transition-all"
          >
            <BookOpen size={20} />
            View All Guides
          </Link>
        </div>
      </section>
    </div>
  )
}
