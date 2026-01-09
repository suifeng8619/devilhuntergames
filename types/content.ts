/**
 * General Content Types
 * For guides, pages, and other markdown content
 */

export interface ContentMetadata {
  title: string
  description: string
  slug: string
  author?: string
  createdAt?: string
  updatedAt?: string
  tags?: string[]
  category?: string
  readTime?: string // e.g., "5 min read"
}

export interface MarkdownContent {
  metadata: ContentMetadata
  content: string // Raw markdown
  htmlContent?: string // Processed HTML
}

/**
 * Guide Types
 */
export type GuideCategory =
  | 'Getting Started'
  | 'Contracts'
  | 'Builds'
  | 'PvP'
  | 'PvE'
  | 'Progression'
  | 'Advanced'

export interface Guide {
  id: string
  slug: string
  title: string
  description: string
  category: GuideCategory

  // Content
  content: string // Markdown content
  tableOfContents?: {
    title: string
    slug: string
    level: number
  }[]

  // Metadata
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'
  readTime: string
  tags: string[]

  // Dates
  createdAt: string
  updatedAt: string

  // Related
  relatedBuilds?: string[]
  relatedGuides?: string[]
}

export interface GuideListItem {
  id: string
  slug: string
  title: string
  description: string
  category: GuideCategory
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'
  readTime: string
  updatedAt: string
}

/**
 * FAQ Types
 */
export interface FAQItem {
  id: string
  question: string
  answer: string
  category: string
  tags?: string[]
  relatedContent?: string[] // IDs of related guides/builds
}

export interface FAQCategory {
  name: string
  items: FAQItem[]
}

/**
 * Search Index Types
 */
export interface SearchIndexItem {
  id: string
  type: 'contract' | 'talent' | 'hybrid' | 'raid' | 'build' | 'guide' | 'faq'
  title: string
  description: string
  content: string // Searchable content
  url: string
  tags: string[]
  tier?: string
  rating?: {
    pvp: string
    pve: string
  }
}

/**
 * Site Configuration Types
 */
export interface SiteConfig {
  name: string
  description: string
  url: string
  ogImage?: string
  links: {
    discord?: string
    github?: string
    youtube?: string
  }
}

/**
 * Navigation Types
 */
export interface NavItem {
  title: string
  href: string
  icon?: string
  description?: string
  children?: NavItem[]
}

export interface Navigation {
  main: NavItem[]
  footer: {
    company?: NavItem[]
    resources?: NavItem[]
    community?: NavItem[]
    legal?: NavItem[]
  }
}
