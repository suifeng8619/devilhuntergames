import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
  Shield,
  Users,
  Clock,
  Coins,
  TrendingUp,
  ArrowLeft,
  Target,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Zap,
  Heart,
} from 'lucide-react'
import fs from 'fs'
import path from 'path'

interface RaidPageProps {
  params: Promise<{ id: string }>
}

// Temporary - will move to lib/content.ts
function getAllRaids() {
  const raidsFile = path.join(process.cwd(), 'content/database/raids.json')
  if (!fs.existsSync(raidsFile)) return []
  const fileContents = fs.readFileSync(raidsFile, 'utf8')
  return JSON.parse(fileContents)
}

function getRaidById(id: string) {
  const raids = getAllRaids()
  return raids.find((r: any) => r.id === id) || null
}

export async function generateMetadata({ params }: RaidPageProps): Promise<Metadata> {
  const resolvedParams = await params
  const raid = getRaidById(resolvedParams.id)

  if (!raid) {
    return {
      title: 'Raid Not Found | Devil Hunter Games',
    }
  }

  return {
    title: `${raid.name} - ${raid.difficulty} Raid | Devil Hunter Games`,
    description: `Complete ${raid.name} guide. Boss: ${raid.bossName} (Lv ${raid.bossLevel}). Drop rates, strategies, and rewards.`,
  }
}

export async function generateStaticParams() {
  const raids = getAllRaids()
  return raids.map((raid: any) => ({
    id: raid.id,
  }))
}

export default async function RaidPage({ params }: RaidPageProps) {
  const resolvedParams = await params
  const raid = getRaidById(resolvedParams.id)

  if (!raid) {
    notFound()
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Very Hard':
        return 'border-semantic-error text-semantic-error bg-semantic-error/10'
      case 'Hard':
        return 'border-semantic-warning text-semantic-warning bg-semantic-warning/10'
      case 'Medium':
        return 'border-tier-b text-tier-b bg-tier-b/10'
      case 'Easy':
        return 'border-semantic-success text-semantic-success bg-semantic-success/10'
      default:
        return 'border-border-primary text-text-secondary'
    }
  }

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Legendary':
        return 'text-tier-s'
      case 'Very Rare':
        return 'text-tier-a'
      case 'Rare':
        return 'text-tier-b'
      case 'Uncommon':
        return 'text-tier-c'
      default:
        return 'text-text-tertiary'
    }
  }

  return (
    <div className="min-h-screen bg-background-primary">
      {/* Back Button */}
      <div className="bg-background-secondary border-b border-border-primary">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
          <Link
            href="/database/raids"
            className="inline-flex items-center gap-2 text-text-secondary hover:text-brand-primary transition-colors"
          >
            <ArrowLeft size={16} />
            <span className="text-sm">Back to Raids</span>
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
                  className={`inline-flex items-center px-4 py-2 rounded-lg text-lg font-bold border-2 ${getDifficultyColor(
                    raid.difficulty
                  )}`}
                >
                  {raid.difficulty}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
                {raid.emoji} {raid.name}
              </h1>
              <p className="text-text-secondary text-lg mb-2">{raid.location}</p>
              {raid.locationDetails && (
                <p className="text-text-tertiary text-sm mb-6">{raid.locationDetails}</p>
              )}

              {/* Boss Info */}
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Shield size={20} className="text-text-tertiary" />
                  <span className="text-text-tertiary">Boss:</span>
                  <span className="text-xl font-bold text-text-primary">{raid.bossName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-text-tertiary">Level:</span>
                  <span className="text-xl font-bold text-brand-primary">{raid.bossLevel}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Boss Health & Abilities */}
          {(raid.bossHealth || raid.bossAbilities) && (
            <div className="mt-8 bg-background-tertiary rounded-lg p-6 border border-border-primary">
              {raid.bossHealth && (
                <div className="flex items-center gap-3 mb-4">
                  <Heart className="text-semantic-error" size={20} />
                  <span className="text-text-secondary">Boss Health:</span>
                  <span className="text-lg font-bold text-semantic-error">{raid.bossHealth}</span>
                </div>
              )}
              {raid.bossAbilities && (
                <div>
                  <div className="text-sm font-semibold text-text-secondary mb-2">
                    Boss Abilities:
                  </div>
                  <ul className="space-y-1">
                    {raid.bossAbilities.map((ability: string, index: number) => (
                      <li key={index} className="text-sm text-text-primary flex items-start gap-2">
                        <span className="text-brand-primary">•</span>
                        {ability}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Drop Table */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <Target className="text-brand-primary" size={24} />
                <h2 className="text-2xl font-bold text-text-primary">Loot Drops</h2>
              </div>
              <div className="bg-background-secondary rounded-lg border border-border-primary overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-background-tertiary">
                      <tr className="border-b border-border-primary">
                        <th className="text-left py-3 px-4 text-text-secondary font-semibold">
                          Item
                        </th>
                        <th className="text-left py-3 px-4 text-text-secondary font-semibold">
                          Rarity
                        </th>
                        <th className="text-right py-3 px-4 text-text-secondary font-semibold">
                          Drop Rate
                        </th>
                        <th className="text-center py-3 px-4 text-text-secondary font-semibold">
                          Exclusive
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {raid.guaranteedDrops
                        .sort((a: any, b: any) => a.dropRate - b.dropRate)
                        .map((drop: any, index: number) => (
                          <tr key={index} className="border-b border-border-primary last:border-0">
                            <td className="py-3 px-4 text-text-primary font-semibold">
                              {drop.item}
                            </td>
                            <td className="py-3 px-4">
                              <span className={`font-semibold ${getRarityColor(drop.rarity)}`}>
                                {drop.rarity}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-right">
                              <div className="flex items-center justify-end gap-3">
                                <div className="w-24 bg-background-tertiary rounded-full h-2">
                                  <div
                                    className={`rounded-full h-2 ${
                                      drop.dropRate <= 0.05
                                        ? 'bg-semantic-error'
                                        : drop.dropRate <= 0.15
                                        ? 'bg-semantic-warning'
                                        : 'bg-semantic-success'
                                    }`}
                                    style={{ width: `${Math.min(drop.dropRate * 100, 100)}%` }}
                                  />
                                </div>
                                <span
                                  className={`font-bold ${
                                    drop.dropRate <= 0.05
                                      ? 'text-semantic-error'
                                      : drop.dropRate <= 0.15
                                      ? 'text-semantic-warning'
                                      : 'text-semantic-success'
                                  }`}
                                >
                                  {(drop.dropRate * 100).toFixed(1)}%
                                </span>
                              </div>
                            </td>
                            <td className="py-3 px-4 text-center">
                              {drop.exclusive ? (
                                <span className="inline-flex items-center px-2 py-1 rounded bg-brand-primary/20 text-brand-primary text-xs font-bold">
                                  Yes
                                </span>
                              ) : (
                                <span className="text-text-tertiary text-xs">—</span>
                              )}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* Strategy */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <Zap className="text-brand-primary" size={24} />
                <h2 className="text-2xl font-bold text-text-primary">Strategy & Tips</h2>
              </div>
              <div className="bg-background-secondary rounded-lg p-6 border border-border-primary space-y-6">
                {/* Team Composition */}
                {raid.strategy.teamComposition && (
                  <div>
                    <div className="text-sm font-semibold text-text-secondary mb-2">
                      Recommended Team:
                    </div>
                    <div className="text-text-primary font-semibold">
                      {raid.strategy.teamComposition}
                    </div>
                  </div>
                )}

                {/* DPS Requirement */}
                {raid.strategy.requiredDPS && (
                  <div>
                    <div className="text-sm font-semibold text-text-secondary mb-2">
                      Required DPS:
                    </div>
                    <span
                      className={`inline-flex px-3 py-1 rounded font-bold ${
                        raid.strategy.requiredDPS === 'Very High'
                          ? 'bg-semantic-error/20 text-semantic-error'
                          : raid.strategy.requiredDPS === 'High'
                          ? 'bg-semantic-warning/20 text-semantic-warning'
                          : 'bg-tier-b/20 text-tier-b'
                      }`}
                    >
                      {raid.strategy.requiredDPS}
                    </span>
                  </div>
                )}

                {/* Tips */}
                {raid.strategy.tips && (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <CheckCircle className="text-semantic-success" size={18} />
                      <div className="text-sm font-semibold text-text-secondary">Pro Tips:</div>
                    </div>
                    <ul className="space-y-2">
                      {raid.strategy.tips.map((tip: string, index: number) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <span className="text-semantic-success mt-0.5">✓</span>
                          <span className="text-text-secondary">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* What to Avoid */}
                {raid.strategy.avoid && (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <XCircle className="text-semantic-error" size={18} />
                      <div className="text-sm font-semibold text-text-secondary">Avoid:</div>
                    </div>
                    <ul className="space-y-2">
                      {raid.strategy.avoid.map((avoid: string, index: number) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <span className="text-semantic-error mt-0.5">✕</span>
                          <span className="text-text-secondary">{avoid}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </section>

            {/* Requirements */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="text-semantic-warning" size={24} />
                <h2 className="text-2xl font-bold text-text-primary">Requirements</h2>
              </div>
              <div className="bg-background-secondary rounded-lg p-6 border border-border-primary">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-text-secondary">Fear Level</span>
                    <span className="text-lg font-bold text-text-primary">
                      {raid.requirements.fearLevel}+
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-text-secondary flex items-center gap-2">
                      <Users size={16} />
                      Players
                    </span>
                    <span className="text-lg font-bold text-text-primary">
                      {raid.requirements.players.min}-{raid.requirements.players.max}{' '}
                      <span className="text-sm text-brand-primary">
                        (rec. {raid.requirements.players.recommended})
                      </span>
                    </span>
                  </div>
                  {raid.requirements.specialRequirement && (
                    <div className="pt-4 border-t border-border-primary">
                      <div className="text-xs text-text-tertiary mb-1">Special Requirement:</div>
                      <div className="text-sm text-text-primary">
                        {raid.requirements.specialRequirement}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </section>
          </div>

          {/* Right Column - Sticky Sidebar */}
          <div className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            {/* Quick Stats */}
            <div className="bg-background-secondary rounded-lg p-6 border border-border-primary">
              <h3 className="text-lg font-bold text-text-primary mb-4">Quick Info</h3>
              <div className="space-y-3">
                <div>
                  <div className="text-xs text-text-tertiary mb-1">Soloable</div>
                  <div className="flex items-center gap-2">
                    {raid.strategy.soloable ? (
                      <>
                        <CheckCircle size={16} className="text-semantic-success" />
                        <span className="text-sm font-semibold text-semantic-success">Yes</span>
                      </>
                    ) : (
                      <>
                        <XCircle size={16} className="text-semantic-error" />
                        <span className="text-sm font-semibold text-semantic-error">No</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Rewards */}
            <div className="bg-background-secondary rounded-lg p-6 border border-border-primary">
              <h3 className="text-lg font-bold text-text-primary mb-4">Rewards</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Coins size={14} className="text-brand-primary" />
                    <div className="text-xs text-text-tertiary">Yen Reward</div>
                  </div>
                  <div className="text-sm font-semibold text-text-primary">{raid.rewards.yen}</div>
                </div>
                {raid.rewards.xp && (
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <TrendingUp size={14} className="text-brand-primary" />
                      <div className="text-xs text-text-tertiary">XP Reward</div>
                    </div>
                    <div className="text-sm font-semibold text-text-primary">{raid.rewards.xp}</div>
                  </div>
                )}
              </div>
            </div>

            {/* Meta Info */}
            {raid.meta && (
              <div className="bg-background-secondary rounded-lg p-6 border border-border-primary">
                <h3 className="text-lg font-bold text-text-primary mb-4">Meta Analysis</h3>
                <div className="space-y-3">
                  <div>
                    <div className="text-xs text-text-tertiary mb-1">Popularity</div>
                    <div className="flex items-center gap-1">
                      {[...Array(10)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-2 h-2 rounded-full ${
                            i < raid.meta.popularityRating
                              ? 'bg-brand-primary'
                              : 'bg-background-tertiary'
                          }`}
                        />
                      ))}
                      <span className="text-sm font-semibold text-brand-primary ml-2">
                        {raid.meta.popularityRating}/10
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-text-tertiary mb-1">Farm Value</div>
                    <div className="flex items-center gap-1">
                      {[...Array(10)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-2 h-2 rounded-full ${
                            i < raid.meta.farmWorthiness ? 'bg-tier-s' : 'bg-background-tertiary'
                          }`}
                        />
                      ))}
                      <span className="text-sm font-semibold text-tier-s ml-2">
                        {raid.meta.farmWorthiness}/10
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-text-tertiary mb-1">Newbie Friendly</div>
                    <div className="flex items-center gap-1">
                      {[...Array(10)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-2 h-2 rounded-full ${
                            i < raid.meta.newbieFriendly
                              ? 'bg-semantic-success'
                              : 'bg-background-tertiary'
                          }`}
                        />
                      ))}
                      <span className="text-sm font-semibold text-semantic-success ml-2">
                        {raid.meta.newbieFriendly}/10
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Clock size={14} className="text-brand-primary" />
                      <div className="text-xs text-text-tertiary">Time to Complete</div>
                    </div>
                    <div className="text-sm font-semibold text-text-primary">
                      {raid.meta.timeToComplete}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Related Content */}
            {(raid.relatedContracts ||
              raid.relatedTalents ||
              raid.relatedHybrids) && (
              <div className="bg-background-secondary rounded-lg p-6 border border-border-primary">
                <h3 className="text-lg font-bold text-text-primary mb-4">Related Content</h3>
                <div className="space-y-3 text-sm">
                  {raid.relatedContracts && (
                    <div>
                      <div className="text-xs text-text-tertiary mb-2">Contracts:</div>
                      <div className="flex flex-wrap gap-2">
                        {raid.relatedContracts.map((contractId: string) => (
                          <Link
                            key={contractId}
                            href={`/database/contracts/${contractId}`}
                            className="px-3 py-1 rounded bg-background-tertiary border border-border-primary hover:border-brand-primary transition-colors text-text-primary"
                          >
                            {contractId.split('-').map((w: string) => w[0].toUpperCase() + w.slice(1)).join(' ')}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                  {raid.relatedHybrids && (
                    <div>
                      <div className="text-xs text-text-tertiary mb-2">Hybrids:</div>
                      <div className="flex flex-wrap gap-2">
                        {raid.relatedHybrids.map((hybridId: string) => (
                          <Link
                            key={hybridId}
                            href={`/database/hybrids/${hybridId}`}
                            className="px-3 py-1 rounded bg-background-tertiary border border-border-primary hover:border-brand-primary transition-colors text-text-primary"
                          >
                            {hybridId.split('-').map((w: string) => w[0].toUpperCase() + w.slice(1)).join(' ')}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
