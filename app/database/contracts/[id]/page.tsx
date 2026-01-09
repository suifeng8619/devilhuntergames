import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
  Shield,
  Swords,
  Target,
  AlertTriangle,
  Coins,
  Users,
  TrendingUp,
  ArrowLeft,
  Clock,
  Zap,
} from 'lucide-react'
import { getAllContracts, getContractById } from '@/lib/content'

interface ContractPageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({
  params,
}: ContractPageProps): Promise<Metadata> {
  const resolvedParams = await params
  const contract = getContractById(resolvedParams.id)

  if (!contract) {
    return {
      title: 'Contract Not Found | Devil Hunter Games',
    }
  }

  return {
    title: `${contract.name} - ${contract.tier}-Tier Contract | Devil Hunter Games`,
    description: `${contract.description}. PvP: ${contract.rating.pvp}, PvE: ${contract.rating.pve}. ${contract.whyTier}`,
  }
}

export async function generateStaticParams() {
  const contracts = getAllContracts()
  return contracts.map((contract) => ({
    id: contract.id,
  }))
}

export default async function ContractPage({ params }: ContractPageProps) {
  const resolvedParams = await params
  const contract = getContractById(resolvedParams.id)

  if (!contract) {
    notFound()
  }

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'S':
        return 'border-tier-s text-tier-s bg-tier-s/10'
      case 'A':
        return 'border-tier-a text-tier-a bg-tier-a/10'
      case 'B':
        return 'border-tier-b text-tier-b bg-tier-b/10'
      case 'C':
        return 'border-tier-c text-tier-c bg-tier-c/10'
      default:
        return 'border-border-primary text-text-secondary'
    }
  }

  const getRatingColor = (rating: string) => {
    if (rating === 'S+' || rating === 'S') return 'text-tier-s'
    if (rating === 'A') return 'text-tier-a'
    if (rating === 'B') return 'text-tier-b'
    return 'text-tier-c'
  }

  const getDifficultyColor = (difficulty: string) => {
    if (difficulty === 'Easy') return 'text-tier-b'
    if (difficulty === 'Medium') return 'text-semantic-warning'
    return 'text-semantic-error'
  }

  return (
    <div className="min-h-screen bg-background-primary">
      {/* Back Button */}
      <div className="bg-background-secondary border-b border-border-primary">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
          <Link
            href="/database/contracts"
            className="inline-flex items-center gap-2 text-text-secondary hover:text-brand-primary transition-colors"
          >
            <ArrowLeft size={16} />
            <span className="text-sm">Back to Contracts</span>
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-b from-background-secondary to-background-primary border-b border-border-primary">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <span
                  className={`inline-flex items-center px-4 py-2 rounded-lg text-lg font-bold border-2 ${getTierColor(
                    contract.tier
                  )}`}
                >
                  {contract.tier}-Tier
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
                {contract.name}
              </h1>
              <p className="text-text-secondary text-lg mb-6">
                {contract.description}
              </p>

              {/* Ratings */}
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Swords size={20} className="text-text-tertiary" />
                  <span className="text-text-tertiary">PvP:</span>
                  <span className={`text-xl font-bold ${getRatingColor(contract.rating.pvp)}`}>
                    {contract.rating.pvp}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Target size={20} className="text-text-tertiary" />
                  <span className="text-text-tertiary">PvE:</span>
                  <span className={`text-xl font-bold ${getRatingColor(contract.rating.pve)}`}>
                    {contract.rating.pve}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Why This Tier */}
          <div className="mt-8 bg-background-tertiary rounded-lg p-6 border border-brand-primary/30">
            <div className="flex items-start gap-3">
              <TrendingUp className="text-brand-primary flex-shrink-0 mt-1" size={20} />
              <div>
                <h3 className="text-text-primary font-semibold mb-2">Why {contract.tier}-Tier?</h3>
                <p className="text-text-secondary">{contract.whyTier}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Abilities */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <Shield className="text-brand-primary" size={24} />
                <h2 className="text-2xl font-bold text-text-primary">Abilities</h2>
              </div>
              <div className="space-y-4">
                {contract.abilities.map((ability, index) => (
                  <div
                    key={index}
                    className="bg-background-secondary rounded-lg p-6 border border-border-primary"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-semibold text-text-primary">
                        {ability.name}
                      </h3>
                      <div className="flex items-center gap-3 text-sm">
                        {ability.cooldown && (
                          <div className="flex items-center gap-1 text-text-tertiary">
                            <Clock size={14} />
                            {ability.cooldown}
                          </div>
                        )}
                        {ability.damage && (
                          <div className="flex items-center gap-1 text-brand-primary">
                            <Zap size={14} />
                            {ability.damage}
                          </div>
                        )}
                      </div>
                    </div>
                    <p className="text-text-secondary">{ability.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Side Effects */}
            {contract.sideEffects && contract.sideEffects.length > 0 && (
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <AlertTriangle className="text-semantic-warning" size={24} />
                  <h2 className="text-2xl font-bold text-text-primary">Side Effects</h2>
                </div>
                <div className="space-y-4">
                  {contract.sideEffects.map((effect, index) => (
                    <div
                      key={index}
                      className="bg-background-secondary rounded-lg p-6 border border-semantic-warning/30"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-semibold text-text-primary">
                          {effect.effect}
                        </h3>
                        <span
                          className={`text-xs px-2 py-1 rounded-md ${
                            effect.severity === 'Major'
                              ? 'bg-semantic-error/20 text-semantic-error'
                              : effect.severity === 'Moderate'
                              ? 'bg-semantic-warning/20 text-semantic-warning'
                              : 'bg-semantic-info/20 text-semantic-info'
                          }`}
                        >
                          {effect.severity}
                        </span>
                      </div>
                      <p className="text-text-secondary">{effect.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Acquisition Methods */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <Coins className="text-brand-primary" size={24} />
                <h2 className="text-2xl font-bold text-text-primary">
                  How to Obtain
                </h2>
              </div>
              <div className="space-y-4">
                {contract.acquisition.map((method, index) => (
                  <div
                    key={index}
                    className="bg-background-secondary rounded-lg p-6 border border-border-primary"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-semibold text-text-primary">
                        {method.method}
                      </h3>
                      <div className="flex items-center gap-2">
                        {method.difficulty && (
                          <span className={`text-sm font-medium ${getDifficultyColor(method.difficulty)}`}>
                            {method.difficulty}
                          </span>
                        )}
                        {method.soloable && (
                          <span className="text-xs px-2 py-1 rounded-md bg-tier-b/20 text-tier-b">
                            Soloable
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      {method.cost && (
                        <div className="flex items-center gap-2">
                          <Coins size={14} className="text-text-tertiary" />
                          <span className="text-text-tertiary">Cost:</span>
                          <span className="text-text-primary">{method.cost}</span>
                        </div>
                      )}
                      {method.dropRate && (
                        <div className="flex items-center gap-2">
                          <TrendingUp size={14} className="text-text-tertiary" />
                          <span className="text-text-tertiary">Drop Rate:</span>
                          <span className="text-text-primary">
                            {(method.dropRate * 100).toFixed(1)}%
                          </span>
                        </div>
                      )}
                      {method.notes && (
                        <p className="text-text-secondary mt-2">{method.notes}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column - Meta Info */}
          <div className="space-y-6">
            {/* Meta Stats */}
            {contract.meta && (
              <div className="bg-background-secondary rounded-lg p-6 border border-border-primary sticky top-24">
                <div className="flex items-center gap-2 mb-4">
                  <Users className="text-brand-primary" size={20} />
                  <h3 className="text-lg font-bold text-text-primary">Meta Analysis</h3>
                </div>
                <div className="space-y-4">
                  {contract.meta.usageRate && (
                    <div>
                      <div className="text-sm text-text-tertiary mb-1">Usage Rate</div>
                      <div className="text-text-primary font-semibold">
                        {contract.meta.usageRate}
                      </div>
                    </div>
                  )}
                  {contract.meta.winRate && (
                    <div>
                      <div className="text-sm text-text-tertiary mb-1">Win Rate</div>
                      <div className="text-text-primary font-semibold">
                        {contract.meta.winRate}
                      </div>
                    </div>
                  )}
                  <div>
                    <div className="text-sm text-text-tertiary mb-2">
                      Newbie Friendly: {contract.meta.newbieFriendly}/10
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(10)].map((_, i) => (
                        <div
                          key={i}
                          className={`flex-1 h-2 rounded-full ${
                            i < contract.meta.newbieFriendly
                              ? 'bg-brand-primary'
                              : 'bg-background-tertiary'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  {contract.meta.skillCeiling && (
                    <div>
                      <div className="text-sm text-text-tertiary mb-1">Skill Ceiling</div>
                      <div className="text-text-primary font-semibold">
                        {contract.meta.skillCeiling}
                      </div>
                    </div>
                  )}
                  {contract.meta.communityRating && (
                    <div className="pt-4 border-t border-border-primary">
                      <div className="text-sm text-text-tertiary mb-2">Community Says</div>
                      <div className="text-text-secondary italic">
                        "{contract.meta.communityRating}"
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Synergies */}
            {contract.synergiesWith && contract.synergiesWith.length > 0 && (
              <div className="bg-background-secondary rounded-lg p-6 border border-border-primary">
                <h3 className="text-lg font-bold text-text-primary mb-4">
                  Synergizes With
                </h3>
                <div className="space-y-2">
                  {contract.synergiesWith.map((synergy) => (
                    <Link
                      key={synergy}
                      href={`/database/contracts/${synergy}`}
                      className="block text-sm text-brand-primary hover:text-brand-secondary transition-colors"
                    >
                      → {synergy.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Recommended Builds */}
            {contract.recommendedBuilds && contract.recommendedBuilds.length > 0 && (
              <div className="bg-background-secondary rounded-lg p-6 border border-border-primary">
                <h3 className="text-lg font-bold text-text-primary mb-4">
                  Recommended Builds
                </h3>
                <div className="space-y-2">
                  {contract.recommendedBuilds.map((build) => (
                    <Link
                      key={build}
                      href={`/builds/${build}`}
                      className="block text-sm text-brand-primary hover:text-brand-secondary transition-colors"
                    >
                      → {build.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
