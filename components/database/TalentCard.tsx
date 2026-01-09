import Link from 'next/link'
import { Sparkles, Zap, MapPin } from 'lucide-react'
import type { Talent } from '@/types/talent'

interface TalentCardProps {
  talent: Talent
}

export default function TalentCard({ talent }: TalentCardProps) {
  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'S':
        return 'border-tier-s text-tier-s bg-tier-s/10'
      case 'A':
        return 'border-tier-a text-tier-a bg-tier-a/10'
      case 'B':
        return 'border-tier-b text-tier-b bg-tier-b/10'
      case 'C':
        return 'border-tier-c text-tier-c bg-tier-c/10'
      default:
        return 'border-border-primary text-text-secondary'
    }
  }

  return (
    <Link href={`/database/talents/${talent.id}`}>
      <div className="group relative bg-background-secondary rounded-lg border border-border-primary hover:border-brand-primary transition-all duration-300 overflow-hidden h-full">
        {/* Tier Badge */}
        <div className="absolute top-4 right-4 z-10">
          <span
            className={`inline-flex items-center px-3 py-1 rounded-md text-xs font-bold border-2 ${getTierColor(
              talent.tier
            )}`}
          >
            {talent.tier}-Tier
          </span>
        </div>

        {/* Mandatory Badge */}
        {talent.meta?.mandatory && (
          <div className="absolute top-4 left-4 z-10">
            <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-bold bg-semantic-error/20 text-semantic-error border border-semantic-error/50">
              MUST HAVE
            </span>
          </div>
        )}

        <div className="p-6">
          {/* Header */}
          <div className="mb-4 mt-8">
            <h3 className="text-xl font-bold text-text-primary group-hover:text-brand-primary transition-colors mb-2">
              {talent.name}
            </h3>
            <p className="text-text-secondary text-sm line-clamp-2">
              {talent.effect}
            </p>
          </div>

          {/* Slot Cost */}
          <div className="flex items-center gap-4 mb-4 pb-4 border-b border-border-primary">
            <div className="flex items-center gap-2">
              <Sparkles size={16} className="text-brand-primary" />
              <span className="text-xs text-text-tertiary">Slots:</span>
              <span className="text-sm font-semibold text-text-primary">
                {talent.slotCost.slots}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Zap size={16} className="text-text-tertiary" />
              <span className="text-xs text-text-tertiary">Activation:</span>
              <span className="text-sm font-semibold text-text-primary">
                {talent.activation}
              </span>
            </div>
          </div>

          {/* Source */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <MapPin size={14} className="text-brand-primary" />
              <span className="text-xs font-semibold text-text-secondary">Source</span>
            </div>
            <div className="space-y-1">
              <div className="text-xs text-text-tertiary">
                • {talent.source.devilType} ({talent.source.bodyPart})
              </div>
              <div className="text-xs text-text-tertiary">
                • {talent.source.farmLocation}
              </div>
              <div className="text-xs text-brand-primary">
                • Kill {talent.source.killRequirement}x to unlock
              </div>
            </div>
          </div>

          {/* Best For */}
          {talent.bestFor && talent.bestFor.length > 0 && (
            <div className="flex items-center gap-2 mb-4">
              {talent.bestFor.map((use) => (
                <span
                  key={use}
                  className="text-xs px-2 py-1 rounded-md bg-background-tertiary text-text-secondary border border-border-primary"
                >
                  {use}
                </span>
              ))}
            </div>
          )}

          {/* Meta Info */}
          {talent.meta && (
            <div className="pt-4 border-t border-border-primary">
              <div className="flex items-center justify-between text-xs">
                <span className="text-text-tertiary">Newbie Friendly</span>
                <div className="flex items-center gap-1">
                  {[...Array(10)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-full ${
                        i < talent.meta.newbieFriendly
                          ? 'bg-brand-primary'
                          : 'bg-background-tertiary'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Hover Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/0 to-brand-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      </div>
    </Link>
  )
}
