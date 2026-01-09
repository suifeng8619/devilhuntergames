/**
 * Hybrid Transformation Types
 * Represents rare hybrid forms (permanent one-time choice)
 */

export type HybridTier = 'S' | 'A' | 'B' | 'C'

export type HybridRarity = 'Common' | 'Uncommon' | 'Rare' | 'Very Rare' | 'Event Only'

export interface HybridAcquisition {
  method: 'Raid Drop' | 'Event' | 'Special Quest' | 'Black Market'
  raidName?: string // e.g., "Katana Raid"
  dropRate?: number // e.g., 0.05 for 5%
  eventName?: string
  availability: 'Always' | 'Seasonal' | 'Event Only' | 'Limited'

  requirements: {
    item: string // e.g., "Surgery Kit"
    itemRarity: HybridRarity
  }[]

  averageTimeToObtain?: string // e.g., "20 hours" or "60 raids"
  communitySuccessRate?: string // e.g., "1% players"
}

export interface HybridTransformation {
  activationKey: string // e.g., "L"
  duration?: string // e.g., "60 seconds"
  cooldown?: string // e.g., "180 seconds"

  // Transformation stats
  healthBoost?: string
  damageBoost?: string
  speedBoost?: string
  regeneration?: string

  // Special mechanics
  uniqueMechanics: string[]

  // Abilities during transformation
  abilities: {
    name: string
    key: string // e.g., "Z", "X", "C"
    description: string
    damage?: string
    cooldown?: string
  }[]
}

export interface Hybrid {
  id: string // e.g., "katana-hybrid"
  name: string // e.g., "Katana Hybrid"
  tier: HybridTier
  rarity: HybridRarity
  emoji?: string // e.g., "🗡️"

  // Core info
  description: string
  transformationForm: string // e.g., "Samurai demon form"
  whyTier: string

  // Rating
  rating: {
    pvp: 'S+' | 'S' | 'A' | 'B' | 'C'
    pve: 'S+' | 'S' | 'A' | 'B' | 'C'
  }

  // Transformation details
  transformation: HybridTransformation

  // Acquisition
  acquisition: HybridAcquisition

  // Important warnings
  warnings: {
    type: 'Irreversible' | 'Cost' | 'Time' | 'Difficulty'
    message: string
    severity: 'Critical' | 'High' | 'Medium' | 'Low'
  }[]

  // Meta
  meta: {
    usageRate?: string // e.g., "15% of players"
    recommendationLevel: 'Highly Recommended' | 'Recommended' | 'Situational' | 'Not Recommended'
    skillCeiling: 'Low' | 'Medium' | 'High' | 'Very High'
    newbieFriendly: number // 1-10 scale
  }

  // Comparisons
  alternativeTo?: string[] // IDs of other hybrids
  betterThan?: string[]
  worseThan?: string[]

  // Build recommendations
  recommendedBuilds?: string[]
  playstyle: string
  strengths: string[]
  weaknesses: string[]
}

export interface HybridListItem {
  id: string
  name: string
  tier: HybridTier
  rarity: HybridRarity
  emoji?: string
  shortDescription: string
  dropRate?: number
}
