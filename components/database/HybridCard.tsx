import Link from 'next/link'
import { AlertTriangle, Swords, Target, Clock } from 'lucide-react'

interface Hybrid {
  id: string
  name: string
  tier: string
  rarity: string
  emoji: string
  description: string
  rating: {
    pvp: string
    pve: string
  }
  transformation: {
    abilities: Array<{
      name: string
      key: string
      description: string
    }>
  }
  acquisition: {
    dropRate?: number
    averageTimeToObtain: string
  }
  warnings: Array<{
    type: string
    severity: string
  }>
}

interface HybridCardProps {
  hybrid: Hybrid
}

export default function HybridCard({ hybrid }: HybridCardProps) {
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

  const getRatingColor = (rating: string) => {
    if (rating === 'S+' || rating === 'S') return 'text-tier-s'
    if (rating === 'A+' || rating === 'A') return 'text-tier-a'
    if (rating === 'B+' || rating === 'B') return 'text-tier-b'
    return 'text-tier-c'
  }

  const getRarityColor = (rarity: string) => {
    if (rarity === 'Event Only') return 'border-semantic-error text-semantic-error bg-semantic-error/10'
    if (rarity === 'Very Rare') return 'border-semantic-warning text-semantic-warning bg-semantic-warning/10'
    return 'border-tier-b text-tier-b bg-tier-b/10'
  }

  const hasCriticalWarning = hybrid.warnings.some(w => w.severity === 'Critical')

  return (
    <Link href={`/database/hybrids/${hybrid.id}`}>
      <div className="group relative bg-background-secondary rounded-lg border border-border-primary hover:border-brand-primary transition-all duration-300 overflow-hidden h-full">
        {/* Badges */}
        <div className="absolute top-4 right-4 z-10 flex flex-col gap-2 items-end">
          {/* Tier Badge */}
          <span
            className={`inline-flex items-center px-3 py-1 rounded-md text-xs font-bold border-2 ${getTierColor(
              hybrid.tier
            )}`}
          >
            {hybrid.tier}-Tier
          </span>
          {/* Rarity Badge */}
          <span
            className={`inline-flex items-center px-2 py-1 rounded text-xs font-semibold border ${getRarityColor(
              hybrid.rarity
            )}`}
          >
            {hybrid.rarity}
          </span>
        </div>

        <div className="p-6">
          {/* Warning Icon */}
          {hasCriticalWarning && (
            <div className="mb-2 flex items-center gap-2 text-semantic-error">
              <AlertTriangle size={20} className="animate-pulse-slow" />
              <span className="text-xs font-bold">PERMANENT CHOICE</span>
            </div>
          )}

          {/* Header */}
          <div className="mb-4">
            <h3 className="text-xl font-bold text-text-primary group-hover:text-brand-primary transition-colors mb-2">
              {hybrid.emoji} {hybrid.name}
            </h3>
            <p className="text-text-secondary text-sm line-clamp-2">
              {hybrid.description}
            </p>
          </div>

          {/* Ratings */}
          <div className="flex items-center gap-4 mb-4 pb-4 border-b border-border-primary">
            <div className="flex items-center gap-2">
              <Swords size={16} className="text-text-tertiary" />
              <span className="text-xs text-text-tertiary">PvP:</span>
              <span className={`text-sm font-bold ${getRatingColor(hybrid.rating.pvp)}`}>
                {hybrid.rating.pvp}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Target size={16} className="text-text-tertiary" />
              <span className="text-xs text-text-tertiary">PvE:</span>
              <span className={`text-sm font-bold ${getRatingColor(hybrid.rating.pve)}`}>
                {hybrid.rating.pve}
              </span>
            </div>
          </div>

          {/* Drop Rate (if available) */}
          {hybrid.acquisition.dropRate !== undefined && (
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-text-secondary">Drop Rate</span>
                <span className="text-sm font-bold text-semantic-error">
                  {(hybrid.acquisition.dropRate * 100).toFixed(1)}%
                </span>
              </div>
              <div className="w-full bg-background-tertiary rounded-full h-2">
                <div
                  className="bg-semantic-error rounded-full h-2 transition-all"
                  style={{ width: `${hybrid.acquisition.dropRate * 100}%` }}
                />
              </div>
            </div>
          )}

          {/* Time to Obtain */}
          <div className="mb-4 flex items-center gap-2">
            <Clock size={14} className="text-brand-primary" />
            <span className="text-xs text-text-tertiary">Est. Time:</span>
            <span className="text-xs font-semibold text-text-primary">
              {hybrid.acquisition.averageTimeToObtain}
            </span>
          </div>

          {/* Abilities Count */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-semibold text-text-secondary">
                Transformation Abilities
              </span>
            </div>
            <div className="space-y-1">
              {hybrid.transformation.abilities.slice(0, 2).map((ability, index) => (
                <div key={index} className="text-xs text-text-tertiary">
                  • {ability.name} ({ability.key})
                </div>
              ))}
              {hybrid.transformation.abilities.length > 2 && (
                <div className="text-xs text-brand-primary">
                  +{hybrid.transformation.abilities.length - 2} more abilities...
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Hover Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/0 to-brand-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      </div>
    </Link>
  )
}
