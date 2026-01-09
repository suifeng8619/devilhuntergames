/**
 * Fiend Talent Types
 * Represents talents that Fiend players can equip (4-5 slots)
 */

export type TalentTier = 'S' | 'A' | 'B' | 'C'

export interface TalentSlotCost {
  slots: number // 1-3 slots (powerful talents cost more)
  unlockRequirement?: string // e.g., "Violence Fiend NPC quest for 5th slot"
}

export interface TalentSource {
  devilType: string // e.g., "Ghost Devil"
  bodyPart: string // e.g., "Ghost Devil's Arm"
  killRequirement: number // Number of kills needed (usually 25)
  dropRate?: number // Drop rate for the body part
  farmLocation?: string
}

export interface Talent {
  id: string // e.g., "ghost-walk"
  name: string // e.g., "Ghost Walk"
  tier: TalentTier
  emoji?: string // e.g., "👻"

  // Core info
  effect: string // Main effect description
  whyTier: string // Why this tier rating

  // Slot cost
  slotCost: TalentSlotCost

  // Source
  source: TalentSource

  // Usage
  bestFor: ('PvP' | 'PvE' | 'Tank' | 'DPS' | 'Support' | 'Mobility')[]

  // Stats impact
  statsImpact?: {
    health?: string
    damage?: string
    defense?: string
    speed?: string
    regeneration?: string
  }

  // Activation
  activation: 'Passive' | 'On Hit' | 'On Dodge' | 'On Kill' | 'Conditional'
  activationDetails?: string

  // Meta
  meta: {
    usageRate?: string
    mandatory?: boolean // Is this talent mandatory for builds?
    newbieFriendly: number // 1-10 scale
    skillCeiling: 'Low' | 'Medium' | 'High' | 'Very High'
  }

  // Synergies
  synergiesWith?: string[] // IDs of other talents
  replacedBy?: string[] // Better alternatives

  // Build recommendations
  recommendedBuilds?: string[]
}

export interface TalentListItem {
  id: string
  name: string
  tier: TalentTier
  emoji?: string
  effect: string
  slotCost: number
}

/**
 * Fiend Build - Combination of 4-5 talents
 */
export interface FiendBuild {
  id: string
  name: string
  talents: string[] // Array of talent IDs
  totalSlots: 4 | 5

  playstyle: string
  strengths: string[]
  weaknesses: string[]

  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Very Hard'
  rating: {
    pvp: 'S+' | 'S' | 'A' | 'B' | 'C'
    pve: 'S+' | 'S' | 'A' | 'B' | 'C'
  }
}
