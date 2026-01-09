/**
 * Redeem Code Types
 */

export type CodeStatus = 'Active' | 'Expired' | 'New' | 'Limited Time'

export interface CodeReward {
  type: 'Yen' | 'Fiend Reroll' | 'Clan Reroll' | 'SP Reset' | 'Contract' | 'Item'
  amount?: string // e.g., "200K Yen"
  item?: string // e.g., "Eraser Devil"
}

export interface Code {
  id: string
  code: string // The actual code to redeem (case-sensitive)
  status: CodeStatus

  // Rewards
  rewards: CodeReward[]
  totalValue?: string // e.g., "200K+ Yen equivalent"

  // Metadata
  addedDate?: string // When code was added
  expiryDate?: string // When code expires (if limited)
  description?: string

  // Usage
  caseSensitive: boolean
  redeemable: 'Once' | 'Multiple' | 'Daily'
}

export interface CodeListItem {
  code: string
  status: CodeStatus
  rewardSummary: string // e.g., "200K Yen + Rerolls"
  highlight?: boolean // Feature this code (e.g., NEW codes)
}

/**
 * Code Summary for quick display
 */
export interface CodeSummary {
  totalCodes: number
  activeCodes: number
  totalYenValue: string // e.g., "275,000+ Yen"
  lastUpdated: string
}
