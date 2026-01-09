/**
 * Raid & Devil Boss Types
 */

export type RaidDifficulty = 'Easy' | 'Medium' | 'Hard' | 'Very Hard' | 'Extreme'

export interface RaidDrop {
  item: string
  dropRate: number // 0-1 range (0.10 = 10%)
  rarity: 'Common' | 'Uncommon' | 'Rare' | 'Very Rare' | 'Legendary'
  exclusive?: boolean // Is this drop raid-exclusive?
}

export interface RaidRequirements {
  fearLevel?: number
  players?: {
    min: number
    max: number
    recommended: number
  }
  specialRequirement?: string // e.g., "Yakuza clan member (20 hearts)"
}

export interface RaidStrategy {
  teamComposition?: string
  requiredDPS?: string
  difficulty: RaidDifficulty
  soloable: boolean
  tips: string[]
  avoid: string[]
}

export interface Raid {
  id: string // e.g., "yakuza-raid"
  name: string // e.g., "Yakuza Raid"
  difficulty: RaidDifficulty
  emoji?: string // e.g., "🚬"

  // Location
  location: string
  locationDetails?: string // How to access

  // Requirements
  requirements: RaidRequirements

  // Boss info
  bossName: string
  bossLevel?: number
  bossHealth?: string
  bossAbilities?: string[]

  // Drops
  guaranteedDrops: RaidDrop[]
  possibleDrops?: RaidDrop[]

  // Rewards
  rewards: {
    yen: string // e.g., "50,000-100,000"
    xp?: string
    otherRewards?: string[]
  }

  // Strategy
  strategy: RaidStrategy

  // Meta
  meta: {
    popularityRating: number // 1-10
    farmWorthiness: number // 1-10
    newbieFriendly: number // 1-10
    timeToComplete: string // e.g., "15-20 minutes"
  }

  // Related content
  relatedContracts?: string[] // Contract IDs that drop here
  relatedTalents?: string[] // Talent IDs that drop here
  relatedHybrids?: string[] // Hybrid IDs that drop here
}

export interface RaidListItem {
  id: string
  name: string
  difficulty: RaidDifficulty
  emoji?: string
  keyDrop: string // Main reason to farm this raid
  dropRate: number
}
