/**
 * Content Management Library
 * Handles markdown parsing, file reading, and content transformation
 */

import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkHtml from 'remark-html'
import type { Contract, Talent, Hybrid, Raid, Code, Build, Guide } from '@/types'

// Base paths
const CONTENT_DIR = path.join(process.cwd(), 'content')
const DATABASE_DIR = path.join(CONTENT_DIR, 'database')
const GUIDES_DIR = path.join(CONTENT_DIR, 'guides')
const BUILDS_DIR = path.join(CONTENT_DIR, 'builds')

/**
 * Read and parse a markdown file
 */
export async function readMarkdownFile(filePath: string) {
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)

  // Convert markdown to HTML
  const processedContent = await remark().use(remarkHtml).process(content)
  const htmlContent = processedContent.toString()

  return {
    metadata: data,
    content,
    htmlContent,
  }
}

/**
 * Read JSON data file
 */
export function readJSONFile<T>(filePath: string): T {
  const fileContents = fs.readFileSync(filePath, 'utf8')
  return JSON.parse(fileContents) as T
}

/**
 * Get all files in a directory
 */
export function getFilesInDirectory(dirPath: string, extension = '.md'): string[] {
  if (!fs.existsSync(dirPath)) {
    return []
  }

  return fs
    .readdirSync(dirPath)
    .filter((file) => file.endsWith(extension))
    .map((file) => path.join(dirPath, file))
}

/**
 * Get all slugs from a directory
 */
export function getSlugs(dirPath: string): string[] {
  if (!fs.existsSync(dirPath)) {
    return []
  }

  return fs
    .readdirSync(dirPath)
    .filter((file) => file.endsWith('.md'))
    .map((file) => file.replace(/\.md$/, ''))
}

// =============================================================================
// CONTRACTS
// =============================================================================

/**
 * Get all contracts
 */
export function getAllContracts(): Contract[] {
  const contractsFile = path.join(DATABASE_DIR, 'contracts.json')
  if (!fs.existsSync(contractsFile)) {
    return []
  }
  return readJSONFile<Contract[]>(contractsFile)
}

/**
 * Get contract by ID
 */
export function getContractById(id: string): Contract | null {
  const contracts = getAllContracts()
  return contracts.find((c) => c.id === id) || null
}

/**
 * Get contracts by tier
 */
export function getContractsByTier(tier: string): Contract[] {
  const contracts = getAllContracts()
  return contracts.filter((c) => c.tier === tier)
}

// =============================================================================
// TALENTS
// =============================================================================

/**
 * Get all talents
 */
export function getAllTalents(): Talent[] {
  const talentsFile = path.join(DATABASE_DIR, 'talents.json')
  if (!fs.existsSync(talentsFile)) {
    return []
  }
  return readJSONFile<Talent[]>(talentsFile)
}

/**
 * Get talent by ID
 */
export function getTalentById(id: string): Talent | null {
  const talents = getAllTalents()
  return talents.find((t) => t.id === id) || null
}

/**
 * Get talents by tier
 */
export function getTalentsByTier(tier: string): Talent[] {
  const talents = getAllTalents()
  return talents.filter((t) => t.tier === tier)
}

// =============================================================================
// HYBRIDS
// =============================================================================

/**
 * Get all hybrids
 */
export function getAllHybrids(): Hybrid[] {
  const hybridsFile = path.join(DATABASE_DIR, 'hybrids.json')
  if (!fs.existsSync(hybridsFile)) {
    return []
  }
  return readJSONFile<Hybrid[]>(hybridsFile)
}

/**
 * Get hybrid by ID
 */
export function getHybridById(id: string): Hybrid | null {
  const hybrids = getAllHybrids()
  return hybrids.find((h) => h.id === id) || null
}

// =============================================================================
// RAIDS
// =============================================================================

/**
 * Get all raids
 */
export function getAllRaids(): Raid[] {
  const raidsFile = path.join(DATABASE_DIR, 'raids.json')
  if (!fs.existsSync(raidsFile)) {
    return []
  }
  return readJSONFile<Raid[]>(raidsFile)
}

/**
 * Get raid by ID
 */
export function getRaidById(id: string): Raid | null {
  const raids = getAllRaids()
  return raids.find((r) => r.id === id) || null
}

// =============================================================================
// CODES
// =============================================================================

/**
 * Get all codes
 */
export function getAllCodes(): Code[] {
  const codesFile = path.join(DATABASE_DIR, 'codes.json')
  if (!fs.existsSync(codesFile)) {
    return []
  }
  return readJSONFile<Code[]>(codesFile)
}

/**
 * Get active codes only
 */
export function getActiveCodes(): Code[] {
  const codes = getAllCodes()
  return codes.filter((c) => c.status === 'Active' || c.status === 'New')
}

// =============================================================================
// BUILDS
// =============================================================================

/**
 * Get all builds
 */
export async function getAllBuilds(): Promise<Build[]> {
  const buildFiles = getFilesInDirectory(BUILDS_DIR)

  const builds = await Promise.all(
    buildFiles.map(async (file) => {
      const { metadata } = await readMarkdownFile(file)
      return metadata as Build
    })
  )

  return builds
}

/**
 * Get build by slug
 */
export async function getBuildBySlug(slug: string): Promise<Build | null> {
  const buildFile = path.join(BUILDS_DIR, `${slug}.md`)

  if (!fs.existsSync(buildFile)) {
    return null
  }

  const { metadata, htmlContent } = await readMarkdownFile(buildFile)

  return {
    ...(metadata as Build),
    // Add rendered content if needed
  }
}

/**
 * Get build slugs for static generation
 */
export function getBuildSlugs(): string[] {
  return getSlugs(BUILDS_DIR)
}

// =============================================================================
// GUIDES
// =============================================================================

/**
 * Get all guides
 */
export async function getAllGuides(): Promise<Guide[]> {
  const guideFiles = getFilesInDirectory(GUIDES_DIR)

  const guides = await Promise.all(
    guideFiles.map(async (file) => {
      const { metadata, content } = await readMarkdownFile(file)
      return {
        ...metadata,
        content,
      } as Guide
    })
  )

  return guides
}

/**
 * Get guide by slug
 */
export async function getGuideBySlug(slug: string): Promise<Guide | null> {
  const guideFile = path.join(GUIDES_DIR, `${slug}.md`)

  if (!fs.existsSync(guideFile)) {
    return null
  }

  const { metadata, content, htmlContent } = await readMarkdownFile(guideFile)

  return {
    ...(metadata as Guide),
    content,
  }
}

/**
 * Get guide slugs for static generation
 */
export function getGuideSlugs(): string[] {
  return getSlugs(GUIDES_DIR)
}

// =============================================================================
// UTILITIES
// =============================================================================

/**
 * Sort items by tier (S+ > S > A > B > C)
 */
export function sortByTier<T extends { tier: string }>(items: T[]): T[] {
  const tierOrder: Record<string, number> = {
    'S+': 0,
    S: 1,
    A: 2,
    B: 3,
    C: 4,
  }

  return items.sort((a, b) => {
    return (tierOrder[a.tier] || 999) - (tierOrder[b.tier] || 999)
  })
}

/**
 * Generate search index
 */
export function generateSearchIndex() {
  // This will be implemented later for search functionality
  // For now, return empty array
  return []
}
