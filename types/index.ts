/**
 * Type Definitions Index
 * Central export point for all TypeScript types
 */

// Contract types
export type {
  Contract,
  ContractTier,
  ContractSource,
  ContractRating,
  ContractAcquisition,
  ContractListItem,
} from './contract'

// Talent types
export type {
  Talent,
  TalentTier,
  TalentSlotCost,
  TalentSource,
  TalentListItem,
  FiendBuild,
} from './talent'

// Hybrid types
export type {
  Hybrid,
  HybridTier,
  HybridRarity,
  HybridAcquisition,
  HybridTransformation,
  HybridListItem,
} from './hybrid'

// Raid types
export type {
  Raid,
  RaidDifficulty,
  RaidDrop,
  RaidRequirements,
  RaidStrategy,
  RaidListItem,
} from './raid'

// Code types
export type {
  Code,
  CodeStatus,
  CodeReward,
  CodeListItem,
  CodeSummary,
} from './code'

// Build types
export type {
  Build,
  BuildRating,
  BuildCost,
  BuildPlaystyle,
  BuildDifficulty,
  PathType,
  HumanBuild,
  FiendBuildConfig,
  HybridBuildConfig,
  BuildConfiguration,
  BuildListItem,
  BuildPlannerInput,
  BuildPlannerResult,
} from './build'

// Content types
export type {
  ContentMetadata,
  MarkdownContent,
  Guide,
  GuideCategory,
  GuideListItem,
  FAQItem,
  FAQCategory,
  SearchIndexItem,
  SiteConfig,
  NavItem,
  Navigation,
} from './content'

// Utility types
export type Tier = 'S+' | 'S' | 'A' | 'B' | 'C'

export type Rating = {
  pvp: Tier
  pve: Tier
}

export type Difficulty = 'Easy' | 'Medium' | 'Hard' | 'Very Hard'

export type Rarity = 'Common' | 'Uncommon' | 'Rare' | 'Very Rare' | 'Legendary'
