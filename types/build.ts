/**
 * Build Types
 * Represents player builds (Human/Fiend/Hybrid configurations)
 */

export type PathType = 'Human' | 'Fiend' | 'Hybrid'

export type BuildPlaystyle =
  | 'Tank'
  | 'DPS'
  | 'Support'
  | 'Burst'
  | 'Sustain'
  | 'Mobility'
  | 'Control'
  | 'Balanced'

export type BuildDifficulty = 'Easy' | 'Medium' | 'Hard' | 'Very Hard'

export interface BuildRating {
  pvp: 'S+' | 'S' | 'A' | 'B' | 'C'
  pve: 'S+' | 'S' | 'A' | 'B' | 'C'
  overall: 'S+' | 'S' | 'A' | 'B' | 'C'
}

export interface BuildCost {
  yen: string // e.g., "150,000-300,000"
  timeInvestment: string // e.g., "20-40 hours"
  difficulty: BuildDifficulty
  rarityGating?: string // e.g., "5% drop rate for key item"
}

/**
 * Human Build - 3 Contracts
 */
export interface HumanBuild {
  path: 'Human'
  contracts: [string, string, string] // 3 Contract IDs (mandatory)
  weapons?: string[] // Optional weapon IDs
}

/**
 * Fiend Build - 4-5 Talents
 */
export interface FiendBuildConfig {
  path: 'Fiend'
  talents: string[] // 4-5 Talent IDs
  totalSlots: 4 | 5
}

/**
 * Hybrid Build - One Hybrid + no contracts/talents
 */
export interface HybridBuildConfig {
  path: 'Hybrid'
  hybridType: string // Hybrid ID
  supportItems?: string[] // Optional items that synergize
}

export type BuildConfiguration = HumanBuild | FiendBuildConfig | HybridBuildConfig

export interface Build {
  id: string // e.g., "ghost-walker"
  name: string // e.g., "Ghost Walker"
  slug: string // URL-friendly slug

  // Path & Configuration
  path: PathType
  configuration: BuildConfiguration

  // Overview
  description: string
  playstyle: BuildPlaystyle[]
  emoji?: string

  // Rating
  rating: BuildRating
  tier: 'S+' | 'S' | 'A' | 'B' | 'C'

  // Viability
  viability: {
    pvpViability: string // Detailed explanation
    pveViability: string
    metaStatus: 'Top Tier' | 'Strong' | 'Viable' | 'Niche' | 'Weak'
  }

  // Strengths & Weaknesses
  strengths: string[]
  weaknesses: string[]

  // Gameplay
  gameplay: {
    combos?: string[] // Key combo sequences
    rotation?: string // Ability rotation
    positioning?: string
    keyTips: string[]
  }

  // Acquisition
  cost: BuildCost

  // Requirements
  requirements: {
    fearLevel?: number
    skillRequirement: 'Low' | 'Medium' | 'High' | 'Very High'
    reactionTime: 'Low' | 'Medium' | 'High' | 'Very High'
  }

  // Meta
  meta: {
    usageRate?: string // e.g., "35% of top 100 players"
    winRate?: string
    popularity: number // 1-10
    newbieFriendly: number // 1-10
    createdDate?: string
    lastUpdated?: string
    author?: string
  }

  // Synergies & Counters
  synergies?: {
    items?: string[]
    playstyles?: string[]
  }

  counters?: {
    strongAgainst: string[] // Build IDs or playstyles
    weakAgainst: string[] // Build IDs or playstyles
  }

  // Alternatives
  alternatives?: {
    budget?: string[] // Cheaper build IDs with similar playstyle
    advanced?: string[] // More complex builds with higher ceiling
  }

  // Guide sections
  earlyGame?: string // How to play in early game
  midGame?: string
  lateGame?: string

  // Related content
  relatedGuides?: string[] // Guide IDs
  videoGuides?: { title: string; url: string }[]
}

export interface BuildListItem {
  id: string
  slug: string
  name: string
  path: PathType
  tier: 'S+' | 'S' | 'A' | 'B' | 'C'
  playstyle: BuildPlaystyle[]
  emoji?: string
  shortDescription: string
  rating: BuildRating
}

/**
 * Build Planner Input
 */
export interface BuildPlannerInput {
  path: PathType
  playstyle: BuildPlaystyle[]
  focusPvP: boolean
  focusPvE: boolean
  budget?: 'Low' | 'Medium' | 'High' | 'Unlimited'
  skillLevel?: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'
}

/**
 * Build Planner Output
 */
export interface BuildPlannerResult {
  recommendedBuilds: Build[]
  reasoning: string
  alternatives: Build[]
  warnings?: string[]
}
