import { Metadata } from 'next'
import { Database, Filter } from 'lucide-react'
import ContractCard from '@/components/database/ContractCard'
import { getAllContracts } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Contracts Database | Devil Hunter Games',
  description: 'Complete database of all Devil contracts in Roblox Devil Hunter. Find the best contracts for PvP and PvE with detailed stats, abilities, and acquisition methods.',
}

export default function ContractsPage() {
  const contracts = getAllContracts()

  // Sort by tier (S > A > B > C) then by name
  const sortedContracts = contracts.sort((a, b) => {
    const tierOrder = { S: 0, A: 1, B: 2, C: 3 }
    const tierDiff = tierOrder[a.tier] - tierOrder[b.tier]
    if (tierDiff !== 0) return tierDiff
    return a.name.localeCompare(b.name)
  })

  // Group by tier
  const contractsByTier = sortedContracts.reduce((acc, contract) => {
    if (!acc[contract.tier]) acc[contract.tier] = []
    acc[contract.tier].push(contract)
    return acc
  }, {} as Record<string, typeof contracts>)

  return (
    <div className="min-h-screen bg-background-primary">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-background-secondary to-background-primary border-b border-border-primary">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16">
          <div className="flex items-center gap-3 mb-4">
            <Database className="text-brand-primary" size={32} />
            <h1 className="text-3xl md:text-4xl font-bold text-text-primary">
              Contracts Database
            </h1>
          </div>
          <p className="text-text-secondary text-lg max-w-3xl">
            Complete guide to all Devil contracts. Compare ratings, abilities, and acquisition methods to make informed decisions.
          </p>

          {/* Stats */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-background-tertiary rounded-lg p-4 border border-border-primary">
              <div className="text-2xl font-bold text-brand-primary">
                {contracts.length}
              </div>
              <div className="text-sm text-text-tertiary">Total Contracts</div>
            </div>
            <div className="bg-background-tertiary rounded-lg p-4 border border-border-primary">
              <div className="text-2xl font-bold text-tier-s">
                {contractsByTier.S?.length || 0}
              </div>
              <div className="text-sm text-text-tertiary">S-Tier META</div>
            </div>
            <div className="bg-background-tertiary rounded-lg p-4 border border-border-primary">
              <div className="text-2xl font-bold text-tier-a">
                {contractsByTier.A?.length || 0}
              </div>
              <div className="text-sm text-text-tertiary">A-Tier Strong</div>
            </div>
            <div className="bg-background-tertiary rounded-lg p-4 border border-border-primary">
              <div className="text-2xl font-bold text-tier-b">
                {(contractsByTier.B?.length || 0) + (contractsByTier.C?.length || 0)}
              </div>
              <div className="text-sm text-text-tertiary">B/C-Tier</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Section (Placeholder for future) */}
      <div className="bg-background-secondary border-b border-border-primary">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
          <div className="flex items-center gap-2 text-text-tertiary">
            <Filter size={16} />
            <span className="text-sm">Filters coming soon: PvP/PvE, Acquisition method, Difficulty</span>
          </div>
        </div>
      </div>

      {/* Contracts Grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
        {Object.entries(contractsByTier).map(([tier, tierContracts]) => (
          <div key={tier} className="mb-12">
            {/* Tier Header */}
            <div className="flex items-center gap-3 mb-6">
              <div
                className={`inline-flex items-center px-4 py-2 rounded-lg text-lg font-bold border-2 ${
                  tier === 'S'
                    ? 'border-tier-s text-tier-s bg-tier-s/10'
                    : tier === 'A'
                    ? 'border-tier-a text-tier-a bg-tier-a/10'
                    : tier === 'B'
                    ? 'border-tier-b text-tier-b bg-tier-b/10'
                    : 'border-tier-c text-tier-c bg-tier-c/10'
                }`}
              >
                {tier}-Tier
              </div>
              <div className="text-text-tertiary text-sm">
                {tier === 'S' && 'META-defining contracts - Must have for competitive play'}
                {tier === 'A' && 'Strong contracts - Viable for all content'}
                {tier === 'B' && 'Solid contracts - Good for beginners'}
                {tier === 'C' && 'Basic contracts - Starter options'}
              </div>
            </div>

            {/* Contract Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tierContracts.map((contract) => (
                <ContractCard key={contract.id} contract={contract} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
