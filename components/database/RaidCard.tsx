import Link from 'next/link'
import { Users, Clock, Zap, CheckCircle, XCircle } from 'lucide-react'

interface Raid {
  id: string
  name: string
  difficulty: string
  emoji: string
  bossName: string
  bossLevel: number
  requirements: {
    fearLevel: number
    players: {
      min: number
      max: number
      recommended: number
    }
  }
  guaranteedDrops: Array<{
    item: string
    dropRate: number
    rarity: string
    exclusive?: boolean
  }>
  meta: {
    farmWorthiness: number
    timeToComplete: string
  }
  strategy: {
    soloable: boolean
  }
}

interface RaidCardProps {
  raid: Raid
}

export default function RaidCard({ raid }: RaidCardProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Very Hard':
        return 'border-semantic-error text-semantic-error bg-semantic-error/10'
      case 'Hard':
        return 'border-semantic-warning text-semantic-warning bg-semantic-warning/10'
      case 'Medium':
        return 'border-tier-b text-tier-b bg-tier-b/10'
      case 'Easy':
        return 'border-semantic-success text-semantic-success bg-semantic-success/10'
      default:
        return 'border-border-primary text-text-secondary'
    }
  }

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Legendary':
        return 'text-tier-s'
      case 'Very Rare':
        return 'text-tier-a'
      case 'Rare':
        return 'text-tier-b'
      default:
        return 'text-text-tertiary'
    }
  }

  // Get top 2 most valuable drops
  const topDrops = raid.guaranteedDrops
    .sort((a, b) => {
      const rarityOrder = { Legendary: 0, 'Very Rare': 1, Rare: 2, Uncommon: 3, Common: 4 }
      return (
        (rarityOrder[a.rarity as keyof typeof rarityOrder] || 99) -
        (rarityOrder[b.rarity as keyof typeof rarityOrder] || 99)
      )
    })
    .slice(0, 2)

  return (
    <Link href={`/database/raids/${raid.id}`}>
      <div className="group relative bg-background-secondary rounded-lg border border-border-primary hover:border-brand-primary transition-all duration-300 overflow-hidden h-full">
        {/* Difficulty Badge */}
        <div className="absolute top-4 right-4 z-10">
          <span
            className={`inline-flex items-center px-3 py-1 rounded-md text-xs font-bold border-2 ${getDifficultyColor(
              raid.difficulty
            )}`}
          >
            {raid.difficulty}
          </span>
        </div>

        <div className="p-6">
          {/* Header */}
          <div className="mb-4">
            <h3 className="text-xl font-bold text-text-primary group-hover:text-brand-primary transition-colors mb-2">
              {raid.emoji} {raid.name}
            </h3>
            <div className="flex items-center gap-2 text-text-secondary text-sm">
              <span className="font-semibold">{raid.bossName}</span>
              <span className="text-text-tertiary">• Lv {raid.bossLevel}</span>
            </div>
          </div>

          {/* Top Drops */}
          <div className="mb-4 pb-4 border-b border-border-primary">
            <div className="text-xs font-semibold text-text-secondary mb-2">Top Drops:</div>
            <div className="space-y-2">
              {topDrops.map((drop, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-semibold ${getRarityColor(drop.rarity)}`}>
                        {drop.item}
                      </span>
                      {drop.exclusive && (
                        <span className="text-xs px-1.5 py-0.5 rounded bg-brand-primary/20 text-brand-primary font-semibold">
                          Exclusive
                        </span>
                      )}
                    </div>
                    <span
                      className={`text-xs font-bold ${
                        drop.dropRate <= 0.05
                          ? 'text-semantic-error'
                          : drop.dropRate <= 0.15
                          ? 'text-semantic-warning'
                          : 'text-semantic-success'
                      }`}
                    >
                      {(drop.dropRate * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="w-full bg-background-tertiary rounded-full h-1.5">
                    <div
                      className={`rounded-full h-1.5 transition-all ${
                        drop.dropRate <= 0.05
                          ? 'bg-semantic-error'
                          : drop.dropRate <= 0.15
                          ? 'bg-semantic-warning'
                          : 'bg-semantic-success'
                      }`}
                      style={{ width: `${Math.min(drop.dropRate * 100, 100)}%` }}
                    />
                  </div>
                </div>
              ))}
              {raid.guaranteedDrops.length > 2 && (
                <div className="text-xs text-brand-primary">
                  +{raid.guaranteedDrops.length - 2} more drops...
                </div>
              )}
            </div>
          </div>

          {/* Requirements & Stats */}
          <div className="space-y-3">
            {/* Fear Level */}
            <div className="flex items-center justify-between text-xs">
              <span className="text-text-tertiary">Fear Level Req.</span>
              <span className="font-semibold text-text-primary">{raid.requirements.fearLevel}+</span>
            </div>

            {/* Players */}
            <div className="flex items-center justify-between text-xs">
              <span className="text-text-tertiary flex items-center gap-1">
                <Users size={12} />
                Players
              </span>
              <span className="font-semibold text-text-primary">
                {raid.requirements.players.min}-{raid.requirements.players.max}{' '}
                <span className="text-brand-primary">
                  (rec. {raid.requirements.players.recommended})
                </span>
              </span>
            </div>

            {/* Time */}
            <div className="flex items-center justify-between text-xs">
              <span className="text-text-tertiary flex items-center gap-1">
                <Clock size={12} />
                Est. Time
              </span>
              <span className="font-semibold text-text-primary">{raid.meta.timeToComplete}</span>
            </div>

            {/* Soloable */}
            <div className="flex items-center justify-between text-xs">
              <span className="text-text-tertiary">Soloable</span>
              <span className="flex items-center gap-1">
                {raid.strategy.soloable ? (
                  <>
                    <CheckCircle size={12} className="text-semantic-success" />
                    <span className="font-semibold text-semantic-success">Yes</span>
                  </>
                ) : (
                  <>
                    <XCircle size={12} className="text-semantic-error" />
                    <span className="font-semibold text-semantic-error">No</span>
                  </>
                )}
              </span>
            </div>

            {/* Farm Value */}
            <div className="flex items-center justify-between text-xs pt-3 border-t border-border-primary">
              <span className="text-text-tertiary flex items-center gap-1">
                <Zap size={12} />
                Farm Value
              </span>
              <div className="flex items-center gap-1">
                {[...Array(10)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-1.5 h-1.5 rounded-full ${
                      i < raid.meta.farmWorthiness ? 'bg-brand-primary' : 'bg-background-tertiary'
                    }`}
                  />
                ))}
                <span className="font-semibold text-brand-primary ml-1">
                  {raid.meta.farmWorthiness}/10
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Hover Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/0 to-brand-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      </div>
    </Link>
  )
}
