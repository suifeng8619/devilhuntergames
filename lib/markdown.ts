import { remark } from 'remark'
import remarkHtml from 'remark-html'
import remarkGfm from 'remark-gfm'
import { rehype } from 'rehype'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrism from 'rehype-prism-plus'

/**
 * Convert markdown to HTML with full processing
 */
export async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark()
    .use(remarkGfm)
    .use(remarkHtml, { sanitize: false })
    .process(markdown)

  let html = result.toString()

  const rehypeResult = await rehype()
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, {
      behavior: 'wrap',
      properties: {
        className: ['heading-link'],
      },
    })
    .use(rehypePrism, {
      ignoreMissing: true,
      showLineNumbers: false,
    })
    .process(html)

  return rehypeResult.toString()
}

/**
 * Extract table of contents
 */
export function extractTableOfContents(markdown: string): {
  level: number
  text: string
  slug: string
}[] {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm
  const headings: { level: number; text: string; slug: string }[] = []

  let match
  while ((match = headingRegex.exec(markdown)) !== null) {
    const level = match[1].length
    const text = match[2].trim()
    const slug = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')

    headings.push({ level, text, slug })
  }

  return headings
}

/**
 * Extract excerpt (first paragraph)
 */
export function extractExcerpt(markdown: string, maxLength: number = 160): string {
  const content = markdown.replace(/^---[\s\S]*?---\n/, '')
  const firstParagraph = content.split('\n\n')[0]

  let plainText = firstParagraph
    .replace(/#{1,6}\s+/g, '')
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/\*(.+?)\*/g, '$1')
    .replace(/\[(.+?)\]\(.+?\)/g, '$1')
    .replace(/`(.+?)`/g, '$1')
    .trim()

  if (plainText.length > maxLength) {
    plainText = plainText.substring(0, maxLength).trim() + '...'
  }

  return plainText
}

/**
 * Estimate reading time
 */
export function estimateReadingTime(markdown: string): string {
  const content = markdown.replace(/^---[\s\S]*?---\n/, '')

  const plainText = content
    .replace(/#{1,6}\s+/g, '')
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/\*(.+?)\*/g, '$1')
    .replace(/\[(.+?)\]\(.+?\)/g, '$1')
    .replace(/`(.+?)`/g, '$1')
    .replace(/```[\s\S]*?```/g, '')

  const wordCount = plainText.split(/\s+/).filter((word) => word.length > 0).length
  const readingTimeMinutes = Math.ceil(wordCount / 200)

  return `${readingTimeMinutes} min`
}
