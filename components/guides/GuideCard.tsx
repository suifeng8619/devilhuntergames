import Link from 'next/link'
import { Clock, BookOpen } from 'lucide-react'

interface Guide {
  slug: string
  title: string
  description: string
  category: string
  difficulty: string
  readTime: string
}

interface GuideCardProps {
  guide: Guide
}

export default function GuideCard({ guide }: GuideCardProps) {
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

  const getCategoryIcon = (category: string) => {
    // You can expand this with more specific icons based on category
    return <BookOpen size={20} />
  }

  return (
    <Link href={`/guides/${guide.slug}`}>
      <div className="group relative bg-background-secondary rounded-lg border border-border-primary hover:border-brand-primary transition-all duration-300 overflow-hidden h-full">
        {/* Difficulty Badge */}
        <div className="absolute top-4 right-4 z-10">
          <span
            className={`inline-flex items-center px-3 py-1 rounded-md text-xs font-bold border-2 ${getDifficultyColor(
              guide.difficulty
            )}`}
          >
            {guide.difficulty}
          </span>
        </div>

        <div className="p-6">
          {/* Category */}
          <div className="flex items-center gap-2 text-brand-primary text-xs font-semibold mb-3">
            {getCategoryIcon(guide.category)}
            <span>{guide.category}</span>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-text-primary group-hover:text-brand-primary transition-colors mb-3 pr-24">
            {guide.title}
          </h3>

          {/* Description */}
          <p className="text-text-secondary text-sm line-clamp-3 mb-4">{guide.description}</p>

          {/* Meta Information */}
          <div className="flex items-center gap-4 text-xs text-text-tertiary pt-4 border-t border-border-primary">
            <div className="flex items-center gap-1">
              <Clock size={12} />
              <span>{guide.readTime}</span>
            </div>
            <div className="text-brand-primary font-semibold group-hover:translate-x-2 transition-transform">
              Read Guide →
            </div>
          </div>
        </div>

        {/* Hover Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/0 to-brand-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      </div>
    </Link>
  )
}
