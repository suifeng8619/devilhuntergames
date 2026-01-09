/**
 * Contract (Devil Contract) Types
 * Represents devil contracts that Human players can equip (max 3)
 */

export type ContractTier = 'S' | 'A' | 'B' | 'C'

export type ContractSource =
  | 'Contract Dealer'
  | 'Encounter'
  | 'Yakuza Raid'
  | 'Zombie Raid'
  | 'Gun Devil Raid'
  | 'Katana Raid'
  | 'Chainsaw Raid'
  | 'NPC Quest'
  | 'Black Market'

export interface ContractRating {
  pvp: 'S+' | 'S' | 'A' | 'B' | 'C'
  pve: 'S+' | 'S' | 'A' | 'B' | 'C'
}

export interface ContractAcquisition {
  method: ContractSource
  cost?: string // e.g., "3,000 Yen" or "30 eye items"
  dropRate?: number // e.g., 0.10 for 10%
  difficulty?: 'Easy' | 'Medium' | 'Hard' | 'Very Hard'
  soloable?: boolean
  notes?: string
}

export interface Contract {
  id: string // e.g., "future-devil"
  name: string // e.g., "Future Devil"
  tier: ContractTier
  rating: ContractRating
  emoji?: string // e.g., "🔮"

  // Core info
  description: string // Short description
  whyTier: string // Why this tier rating

  // Abilities
  abilities: {
    name: string
    description: string
    cooldown?: string
    damage?: string
  }[]

  // Side effects
  sideEffects?: {
    effect: string
    severity: 'Minor' | 'Moderate' | 'Major'
    description: string
  }[]

  // Acquisition
  acquisition: ContractAcquisition[]

  // Meta info
  meta: {
    usageRate?: string // e.g., "68% in high-end PvP"
    winRate?: string
    newbieFriendly: number // 1-10 scale
    skillCeiling: 'Low' | 'Medium' | 'High' | 'Very High'
    communityRating?: string
  }

  // Synergies
  synergiesWith?: string[] // IDs of other contracts/talents
  counters?: string[] // What this contract counters
  counteredBy?: string[] // What counters this contract

  // Related content
  recommendedBuilds?: string[] // IDs of builds
  guides?: string[] // Links to guide pages
}

export interface ContractListItem {
  id: string
  name: string
  tier: ContractTier
  rating: ContractRating
  emoji?: string
  shortDescription: string
}
