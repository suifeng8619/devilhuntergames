import { Metadata } from 'next'
import { Database, Shield } from 'lucide-react'
import RaidCard from '@/components/database/RaidCard'
import fs from 'fs'
import path from 'path'

export const metadata: Metadata = {
  title: 'Raids & Boss Fights Database | Devil Hunter Games',
  description:
    'Complete raid guides for Devil Hunter. Yakuza Raid, Zombie Raid, Katana Raid drop rates, strategies, and rewards. Solo to 6-player boss fights.',
  keywords: [
    'Devil Hunter Raids',
    'Yakuza Raid',
    'Katana Raid',
    'Zombie Raid',
    'Boss fights',
    'Raid drops',
    'Roblox Devil Hunter',
  ],
}

// Read raids data directly (will move to lib/content.ts later)
function getAllRaids() {
  const raidsFile = path.join(process.cwd(), 'content/database/raids.json')
  if (!fs.existsSync(raidsFile)) return []
  const fileContents = fs.readFileSync(raidsFile, 'utf8')
  return JSON.parse(fileContents)
}

export default function RaidsPage() {
  const raids = getAllRaids()

  // Group by difficulty in specific order: Medium > Hard > Very Hard
  const difficultyOrder = ['Medium', 'Hard', 'Very Hard']
  const raidsByDifficulty = difficultyOrder.reduce((acc, difficulty) => {
    const matchingRaids = raids.filter((r: any) => r.difficulty === difficulty)
    if (matchingRaids.length > 0) {
      acc[difficulty] = matchingRaids
    }
    return acc
  }, {} as Record<string, any[]>)

  // Calculate stats
  const totalRaids = raids.length
  const avgDropRate =
    raids.reduce((sum: number, r: any) => {
      const topDrop = r.guaranteedDrops.sort((a: any, b: any) => a.dropRate - b.dropRate)[0]
      return sum + (topDrop?.dropRate || 0)
    }, 0) / totalRaids

  const soloableRaids = raids.filter((r: any) => r.strategy.soloable).length
  const maxPlayers = Math.max(...raids.map((r: any) => r.requirements.players.max))

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

  const getDifficultyDescription = (difficulty: string) => {
    switch (difficulty) {
      case 'Very Hard':
        return 'End-game content - High skill & gear required'
      case 'Hard':
        return 'Challenging raids - Team coordination essential'
      case 'Medium':
        return 'Accessible content - Good for learning mechanics'
      case 'Easy':
        return 'Entry-level raids - Solo-friendly'
      default:
        return ''
    }
  }

  return (
    <div className="min-h-screen bg-background-primary">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-background-secondary to-background-primary border-b border-border-primary">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16">
          <div className="flex items-center gap-3 mb-4">
            <Database className="text-brand-primary" size={32} />
            <h1 className="text-3xl md:text-4xl font-bold text-text-primary">
              Raids & Boss Fights
            </h1>
          </div>
          <p className="text-text-secondary text-lg max-w-3xl">
            Complete raid guides with boss strategies, drop rates, and team compositions. From
            solo-friendly to 6-player challenges.
          </p>

          {/* Stats */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-background-tertiary rounded-lg p-4 border border-border-primary">
              <div className="text-2xl font-bold text-brand-primary">{totalRaids}</div>
              <div className="text-sm text-text-tertiary">Total Raids</div>
            </div>
            <div className="bg-background-tertiary rounded-lg p-4 border border-border-primary">
              <div className="text-2xl font-bold text-semantic-warning">
                {(avgDropRate * 100).toFixed(1)}%
              </div>
              <div className="text-sm text-text-tertiary">Avg Drop Rate</div>
            </div>
            <div className="bg-background-tertiary rounded-lg p-4 border border-border-primary">
              <div className="text-2xl font-bold text-semantic-success">{soloableRaids}</div>
              <div className="text-sm text-text-tertiary">Soloable Raids</div>
            </div>
            <div className="bg-background-tertiary rounded-lg p-4 border border-border-primary">
              <div className="text-2xl font-bold text-tier-s">{maxPlayers}</div>
              <div className="text-sm text-text-tertiary">Max Players</div>
            </div>
          </div>
        </div>
      </div>

      {/* Raids Grid - Grouped by Difficulty */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
        {Object.entries(raidsByDifficulty).map(([difficulty, difficultyRaids]) => (
          <div key={difficulty} className="mb-12">
            {/* Difficulty Header */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-3">
                <Shield
                  className={
                    difficulty === 'Very Hard'
                      ? 'text-semantic-error'
                      : difficulty === 'Hard'
                      ? 'text-semantic-warning'
                      : 'text-tier-b'
                  }
                  size={24}
                />
                <div
                  className={`inline-flex items-center px-4 py-2 rounded-lg text-lg font-bold border-2 ${getDifficultyColor(
                    difficulty
                  )}`}
                >
                  {difficulty}
                </div>
              </div>
              <div className="flex-1 text-text-tertiary text-sm">
                {getDifficultyDescription(difficulty)}
                <span className="ml-2 text-brand-primary">
                  ({difficultyRaids.length} {difficultyRaids.length === 1 ? 'raid' : 'raids'})
                </span>
              </div>
            </div>

            {/* Raid Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {difficultyRaids.map((raid: any) => (
                <RaidCard key={raid.id} raid={raid} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
