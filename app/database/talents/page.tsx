import { Metadata } from 'next'
import { Sparkles, Filter, AlertTriangle } from 'lucide-react'
import TalentCard from '@/components/database/TalentCard'
import { getAllTalents } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Fiend Talents Database | Devil Hunter Games',
  description: 'Complete database of all Fiend talents in Roblox Devil Hunter. Find the best talent combinations with detailed effects, slot costs, and acquisition methods.',
}

export default function TalentsPage() {
  const talents = getAllTalents()

  // Sort by tier (S > A > B > C) then by name
  const sortedTalents = talents.sort((a, b) => {
    const tierOrder = { S: 0, A: 1, B: 2, C: 3 }
    const tierDiff = tierOrder[a.tier] - tierOrder[b.tier]
    if (tierDiff !== 0) return tierDiff
    return a.name.localeCompare(b.name)
  })

  // Group by tier
  const talentsByTier = sortedTalents.reduce((acc, talent) => {
    if (!acc[talent.tier]) acc[talent.tier] = []
    acc[talent.tier].push(talent)
    return acc
  }, {} as Record<string, typeof talents>)

  // Calculate mandatory talents
  const mandatoryTalents = talents.filter((t) => t.meta?.mandatory)

  return (
    <div className="min-h-screen bg-background-primary">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-background-secondary to-background-primary border-b border-border-primary">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="text-brand-primary" size={32} />
            <h1 className="text-3xl md:text-4xl font-bold text-text-primary">
              Fiend Talents Database
            </h1>
          </div>
          <p className="text-text-secondary text-lg max-w-3xl mb-6">
            Complete guide to Fiend talents. Choose wisely - you have 4-5 slots and can't remove talents once equipped.
          </p>

          {/* Important Warning */}
          <div className="bg-semantic-warningBg rounded-lg p-4 border border-semantic-warning mb-8">
            <div className="flex items-start gap-3">
              <AlertTriangle className="text-semantic-warning flex-shrink-0 mt-0.5" size={20} />
              <div>
                <h3 className="text-text-primary font-semibold mb-1">
                  Talents are PERMANENT
                </h3>
                <p className="text-text-secondary text-sm">
                  Once equipped, talents cannot be removed or swapped. Plan your build carefully before equipping!
                </p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-background-tertiary rounded-lg p-4 border border-border-primary">
              <div className="text-2xl font-bold text-brand-primary">
                {talents.length}
              </div>
              <div className="text-sm text-text-tertiary">Total Talents</div>
            </div>
            <div className="bg-background-tertiary rounded-lg p-4 border border-border-primary">
              <div className="text-2xl font-bold text-semantic-error">
                {mandatoryTalents.length}
              </div>
              <div className="text-sm text-text-tertiary">Must-Have</div>
            </div>
            <div className="bg-background-tertiary rounded-lg p-4 border border-border-primary">
              <div className="text-2xl font-bold text-tier-s">
                {talentsByTier.S?.length || 0}
              </div>
              <div className="text-sm text-text-tertiary">S-Tier META</div>
            </div>
            <div className="bg-background-tertiary rounded-lg p-4 border border-border-primary">
              <div className="text-2xl font-bold text-tier-a">
                {talentsByTier.A?.length || 0}
              </div>
              <div className="text-sm text-text-tertiary">A-Tier Strong</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Section (Placeholder for future) */}
      <div className="bg-background-secondary border-b border-border-primary">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
          <div className="flex items-center gap-2 text-text-tertiary">
            <Filter size={16} />
            <span className="text-sm">
              Filters coming soon: PvP/PvE focus, Slot cost, Activation type
            </span>
          </div>
        </div>
      </div>

      {/* Mandatory Talents Section */}
      {mandatoryTalents.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12 border-b border-border-primary">
          <div className="flex items-center gap-3 mb-6">
            <div className="inline-flex items-center px-4 py-2 rounded-lg text-lg font-bold border-2 border-semantic-error text-semantic-error bg-semantic-error/10">
              MUST HAVE
            </div>
            <div className="text-text-tertiary text-sm">
              Essential talents that almost every Fiend build requires
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mandatoryTalents.map((talent) => (
              <TalentCard key={talent.id} talent={talent} />
            ))}
          </div>
        </div>
      )}

      {/* Talents Grid by Tier */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
        {Object.entries(talentsByTier).map(([tier, tierTalents]) => (
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
                {tier === 'S' && 'META-defining talents - Essential for competitive builds'}
                {tier === 'A' && 'Strong talents - Highly recommended'}
                {tier === 'B' && 'Solid talents - Situational but viable'}
                {tier === 'C' && 'Basic talents - Consider alternatives'}
              </div>
            </div>

            {/* Talent Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tierTalents.map((talent) => (
                <TalentCard key={talent.id} talent={talent} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Slot Planning Helper */}
      <div className="bg-background-secondary border-t border-border-primary">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
          <h2 className="text-2xl font-bold text-text-primary mb-4">
            Slot Planning Tips
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-background-tertiary rounded-lg p-6 border border-border-primary">
              <h3 className="text-lg font-semibold text-text-primary mb-3">
                Standard Build (4 Slots)
              </h3>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li>• 2-slot S-tier mandatory talent (Ghost Walk or Stone Skin)</li>
                <li>• 2-slot defensive/offensive talent</li>
                <li>• Total: 4 slots used</li>
              </ul>
            </div>
            <div className="bg-background-tertiary rounded-lg p-6 border border-border-primary">
              <h3 className="text-lg font-semibold text-text-primary mb-3">
                Advanced Build (5 Slots)
              </h3>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li>• 2-slot S-tier mandatory talent</li>
                <li>• 2-slot A-tier talent</li>
                <li>• 1-slot utility talent</li>
                <li>• Total: 5 slots used (max optimization)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
