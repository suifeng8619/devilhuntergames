import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
  Shield,
  Swords,
  Target,
  AlertTriangle,
  Clock,
  Zap,
  ArrowLeft,
  TrendingUp,
  Heart,
  Sparkles,
  CheckCircle,
  XCircle,
} from 'lucide-react'
import fs from 'fs'
import path from 'path'

interface HybridPageProps {
  params: Promise<{ id: string }>
}

// Temporary - will move to lib/content.ts
function getAllHybrids() {
  const hybridsFile = path.join(process.cwd(), 'content/database/hybrids.json')
  if (!fs.existsSync(hybridsFile)) return []
  const fileContents = fs.readFileSync(hybridsFile, 'utf8')
  return JSON.parse(fileContents)
}

function getHybridById(id: string) {
  const hybrids = getAllHybrids()
  return hybrids.find((h: any) => h.id === id) || null
}

export async function generateMetadata({
  params,
}: HybridPageProps): Promise<Metadata> {
  const resolvedParams = await params
  const hybrid = getHybridById(resolvedParams.id)

  if (!hybrid) {
    return {
      title: 'Hybrid Not Found | Devil Hunter Games',
    }
  }

  return {
    title: `${hybrid.name} - ${hybrid.tier}-Tier Hybrid | Devil Hunter Games`,
    description: `${hybrid.description}. PvP: ${hybrid.rating.pvp}, PvE: ${hybrid.rating.pve}. ${hybrid.whyTier}`,
  }
}

export async function generateStaticParams() {
  const hybrids = getAllHybrids()
  return hybrids.map((hybrid: any) => ({
    id: hybrid.id,
  }))
}

export default async function HybridPage({ params }: HybridPageProps) {
  const resolvedParams = await params
  const hybrid = getHybridById(resolvedParams.id)

  if (!hybrid) {
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
    if (rating === 'A+' || rating === 'A') return 'text-tier-a'
    if (rating === 'B+' || rating === 'B') return 'text-tier-b'
    return 'text-tier-c'
  }

  const getRarityColor = (rarity: string) => {
    if (rarity === 'Event Only') return 'border-semantic-error text-semantic-error bg-semantic-error/10'
    if (rarity === 'Very Rare') return 'border-semantic-warning text-semantic-warning bg-semantic-warning/10'
    return 'border-tier-b text-tier-b bg-tier-b/10'
  }

  const allHybrids = getAllHybrids()
  const alternativeHybrid = allHybrids.find((h: any) => h.id !== hybrid.id)

  return (
    <div className="min-h-screen bg-background-primary">
      {/* Back Button */}
      <div className="bg-background-secondary border-b border-border-primary">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
          <Link
            href="/database/hybrids"
            className="inline-flex items-center gap-2 text-text-secondary hover:text-brand-primary transition-colors"
          >
            <ArrowLeft size={16} />
            <span className="text-sm">Back to Hybrids</span>
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-b from-background-secondary to-background-primary border-b border-border-primary">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16">
          {/* Critical Warnings */}
          {hybrid.warnings.some((w: any) => w.severity === 'Critical') && (
            <div className="bg-semantic-error/10 border-2 border-semantic-error rounded-lg p-4 mb-6">
              <div className="flex items-center gap-3">
                <AlertTriangle className="text-semantic-error flex-shrink-0" size={24} />
                <div>
                  <p className="text-semantic-error font-bold text-sm">
                    ⚠️ PERMANENT CHOICE - Cannot be reversed!
                  </p>
                  {hybrid.warnings
                    .filter((w: any) => w.severity === 'Critical')
                    .map((warning: any, index: number) => (
                      <p key={index} className="text-text-primary text-sm mt-1">
                        {warning.message}
                      </p>
                    ))}
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4 flex-wrap">
                <span
                  className={`inline-flex items-center px-4 py-2 rounded-lg text-lg font-bold border-2 ${getTierColor(
                    hybrid.tier
                  )}`}
                >
                  {hybrid.tier}-Tier
                </span>
                <span
                  className={`inline-flex items-center px-3 py-1 rounded text-sm font-semibold border ${getRarityColor(
                    hybrid.rarity
                  )}`}
                >
                  {hybrid.rarity}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
                {hybrid.emoji} {hybrid.name}
              </h1>
              <p className="text-text-secondary text-lg mb-2">
                {hybrid.description}
              </p>
              <p className="text-text-tertiary italic mb-6">
                {hybrid.transformationForm}
              </p>

              {/* Ratings */}
              <div className="flex items-center gap-6 mb-4">
                <div className="flex items-center gap-2">
                  <Swords size={20} className="text-text-tertiary" />
                  <span className="text-text-tertiary">PvP:</span>
                  <span className={`text-xl font-bold ${getRatingColor(hybrid.rating.pvp)}`}>
                    {hybrid.rating.pvp}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Target size={20} className="text-text-tertiary" />
                  <span className="text-text-tertiary">PvE:</span>
                  <span className={`text-xl font-bold ${getRatingColor(hybrid.rating.pve)}`}>
                    {hybrid.rating.pve}
                  </span>
                </div>
              </div>

              {/* Playstyle */}
              <div className="inline-flex items-center gap-2 bg-background-tertiary px-4 py-2 rounded-lg border border-border-primary">
                <Sparkles size={16} className="text-brand-primary" />
                <span className="text-sm text-text-secondary">Playstyle:</span>
                <span className="text-sm font-semibold text-text-primary">
                  {hybrid.playstyle}
                </span>
              </div>
            </div>
          </div>

          {/* Why This Tier */}
          <div className="mt-8 bg-background-tertiary rounded-lg p-6 border border-brand-primary/30">
            <div className="flex items-start gap-3">
              <TrendingUp className="text-brand-primary flex-shrink-0 mt-1" size={20} />
              <div>
                <h3 className="text-text-primary font-semibold mb-2">
                  Why {hybrid.tier}-Tier?
                </h3>
                <p className="text-text-secondary">{hybrid.whyTier}</p>
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
            {/* Transformation Stats */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <Heart className="text-brand-primary" size={24} />
                <h2 className="text-2xl font-bold text-text-primary">
                  Transformation Details
                </h2>
              </div>
              <div className="bg-background-secondary rounded-lg p-6 border border-border-primary">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                  <div>
                    <div className="text-xs text-text-tertiary mb-1">Duration</div>
                    <div className="text-lg font-bold text-text-primary">
                      {hybrid.transformation.duration}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-text-tertiary mb-1">Cooldown</div>
                    <div className="text-lg font-bold text-text-primary">
                      {hybrid.transformation.cooldown}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-text-tertiary mb-1">Activation</div>
                    <div className="text-lg font-bold text-brand-primary">
                      Key {hybrid.transformation.activationKey}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  {hybrid.transformation.healthBoost && (
                    <div className="flex items-center justify-between p-3 bg-background-tertiary rounded border border-border-primary">
                      <span className="text-sm text-text-secondary">Health Boost</span>
                      <span className="text-sm font-bold text-semantic-success">
                        {hybrid.transformation.healthBoost}
                      </span>
                    </div>
                  )}
                  {hybrid.transformation.damageBoost && (
                    <div className="flex items-center justify-between p-3 bg-background-tertiary rounded border border-border-primary">
                      <span className="text-sm text-text-secondary">Damage Boost</span>
                      <span className="text-sm font-bold text-semantic-error">
                        {hybrid.transformation.damageBoost}
                      </span>
                    </div>
                  )}
                  {hybrid.transformation.speedBoost && (
                    <div className="flex items-center justify-between p-3 bg-background-tertiary rounded border border-border-primary">
                      <span className="text-sm text-text-secondary">Speed Boost</span>
                      <span className="text-sm font-bold text-tier-a">
                        {hybrid.transformation.speedBoost}
                      </span>
                    </div>
                  )}
                  {hybrid.transformation.regeneration && (
                    <div className="flex items-center justify-between p-3 bg-background-tertiary rounded border border-border-primary">
                      <span className="text-sm text-text-secondary">Regeneration</span>
                      <span className="text-sm font-bold text-semantic-success">
                        {hybrid.transformation.regeneration}
                      </span>
                    </div>
                  )}
                </div>

                {/* Unique Mechanics */}
                {hybrid.transformation.uniqueMechanics && (
                  <div>
                    <div className="text-sm font-semibold text-text-secondary mb-2">
                      Unique Mechanics:
                    </div>
                    <ul className="space-y-1">
                      {hybrid.transformation.uniqueMechanics.map((mechanic: string, index: number) => (
                        <li key={index} className="text-sm text-text-primary flex items-start gap-2">
                          <span className="text-brand-primary">✓</span>
                          {mechanic}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </section>

            {/* Transformation Abilities */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <Shield className="text-brand-primary" size={24} />
                <h2 className="text-2xl font-bold text-text-primary">
                  Transformation Abilities
                </h2>
              </div>
              <div className="space-y-4">
                {hybrid.transformation.abilities.map((ability: any, index: number) => (
                  <div
                    key={index}
                    className="bg-background-secondary rounded-lg p-6 border border-border-primary"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-lg font-semibold text-text-primary">
                          {ability.name}
                        </h3>
                        <span className="inline-flex items-center gap-1 text-xs text-brand-primary font-semibold mt-1">
                          Key {ability.key}
                        </span>
                      </div>
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

            {/* Acquisition Methods */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <Target className="text-brand-primary" size={24} />
                <h2 className="text-2xl font-bold text-text-primary">
                  How to Obtain
                </h2>
              </div>
              <div className="bg-background-secondary rounded-lg p-6 border border-border-primary">
                <div className="space-y-4">
                  <div>
                    <div className="text-sm font-semibold text-text-secondary mb-2">
                      Acquisition Method:
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-text-primary">
                        {hybrid.acquisition.method}
                      </span>
                      {hybrid.acquisition.raidName && (
                        <span className="text-sm text-text-tertiary">
                          ({hybrid.acquisition.raidName})
                        </span>
                      )}
                      {hybrid.acquisition.eventName && (
                        <span className="text-sm text-text-tertiary">
                          ({hybrid.acquisition.eventName})
                        </span>
                      )}
                    </div>
                  </div>

                  {hybrid.acquisition.dropRate !== undefined && (
                    <div>
                      <div className="text-sm font-semibold text-text-secondary mb-2">
                        Drop Rate:
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex-1 bg-background-tertiary rounded-full h-3">
                          <div
                            className="bg-semantic-error rounded-full h-3 transition-all"
                            style={{ width: `${hybrid.acquisition.dropRate * 100}%` }}
                          />
                        </div>
                        <span className="text-lg font-bold text-semantic-error">
                          {(hybrid.acquisition.dropRate * 100).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  )}

                  <div>
                    <div className="text-sm font-semibold text-text-secondary mb-2">
                      Average Time to Obtain:
                    </div>
                    <div className="text-text-primary">{hybrid.acquisition.averageTimeToObtain}</div>
                  </div>

                  {hybrid.acquisition.requirements && (
                    <div>
                      <div className="text-sm font-semibold text-text-secondary mb-2">
                        Requirements:
                      </div>
                      <ul className="space-y-2">
                        {hybrid.acquisition.requirements.map((req: any, index: number) => (
                          <li key={index} className="flex items-center gap-2">
                            <span className="text-brand-primary">•</span>
                            <span className="text-text-primary">{req.item}</span>
                            <span
                              className={`text-xs px-2 py-0.5 rounded ${
                                req.itemRarity === 'Legendary'
                                  ? 'bg-tier-s/20 text-tier-s'
                                  : req.itemRarity === 'Very Rare'
                                  ? 'bg-tier-a/20 text-tier-a'
                                  : 'bg-tier-b/20 text-tier-b'
                              }`}
                            >
                              {req.itemRarity}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {hybrid.acquisition.communitySuccessRate && (
                    <div className="pt-4 border-t border-border-primary">
                      <div className="text-xs text-text-tertiary">
                        Community Success Rate: {hybrid.acquisition.communitySuccessRate}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* Strengths & Weaknesses */}
            <section>
              <h2 className="text-2xl font-bold text-text-primary mb-4">
                Strengths & Weaknesses
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Strengths */}
                <div className="bg-background-secondary rounded-lg p-6 border border-semantic-success/30">
                  <div className="flex items-center gap-2 mb-4">
                    <CheckCircle className="text-semantic-success" size={20} />
                    <h3 className="text-lg font-semibold text-text-primary">Strengths</h3>
                  </div>
                  <ul className="space-y-2">
                    {hybrid.strengths.map((strength: string, index: number) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <span className="text-semantic-success mt-0.5">✓</span>
                        <span className="text-text-secondary">{strength}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Weaknesses */}
                <div className="bg-background-secondary rounded-lg p-6 border border-semantic-error/30">
                  <div className="flex items-center gap-2 mb-4">
                    <XCircle className="text-semantic-error" size={20} />
                    <h3 className="text-lg font-semibold text-text-primary">Weaknesses</h3>
                  </div>
                  <ul className="space-y-2">
                    {hybrid.weaknesses.map((weakness: string, index: number) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <span className="text-semantic-error mt-0.5">✕</span>
                        <span className="text-text-secondary">{weakness}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column - Sticky Sidebar */}
          <div className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            {/* Meta Info */}
            {hybrid.meta && (
              <div className="bg-background-secondary rounded-lg p-6 border border-border-primary">
                <h3 className="text-lg font-bold text-text-primary mb-4">Meta Analysis</h3>
                <div className="space-y-3">
                  <div>
                    <div className="text-xs text-text-tertiary mb-1">Usage Rate</div>
                    <div className="text-sm font-semibold text-text-primary">
                      {hybrid.meta.usageRate}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-text-tertiary mb-1">Recommendation</div>
                    <div className="text-sm font-semibold text-text-primary">
                      {hybrid.meta.recommendationLevel}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-text-tertiary mb-1">Skill Ceiling</div>
                    <div className="text-sm font-semibold text-text-primary">
                      {hybrid.meta.skillCeiling}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-text-tertiary mb-1">Newbie Friendly</div>
                    <div className="flex items-center gap-1">
                      {[...Array(10)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-2 h-2 rounded-full ${
                            i < hybrid.meta.newbieFriendly
                              ? 'bg-brand-primary'
                              : 'bg-background-tertiary'
                          }`}
                        />
                      ))}
                      <span className="text-sm font-semibold text-text-primary ml-2">
                        {hybrid.meta.newbieFriendly}/10
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Alternative Hybrid */}
            {alternativeHybrid && (
              <div className="bg-background-secondary rounded-lg p-6 border border-border-primary">
                <h3 className="text-lg font-bold text-text-primary mb-4">
                  Alternative Hybrid
                </h3>
                <Link
                  href={`/database/hybrids/${alternativeHybrid.id}`}
                  className="block p-4 bg-background-tertiary rounded-lg border border-border-primary hover:border-brand-primary transition-colors"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">{alternativeHybrid.emoji}</span>
                    <span className="font-bold text-text-primary">
                      {alternativeHybrid.name}
                    </span>
                  </div>
                  <p className="text-xs text-text-secondary line-clamp-2">
                    {alternativeHybrid.description}
                  </p>
                  <div className="flex items-center gap-3 mt-3 text-xs">
                    <span className={getRatingColor(alternativeHybrid.rating.pvp)}>
                      PvP: {alternativeHybrid.rating.pvp}
                    </span>
                    <span className={getRatingColor(alternativeHybrid.rating.pve)}>
                      PvE: {alternativeHybrid.rating.pve}
                    </span>
                  </div>
                </Link>
              </div>
            )}

            {/* All Warnings */}
            {hybrid.warnings && hybrid.warnings.length > 0 && (
              <div className="bg-background-secondary rounded-lg p-6 border border-semantic-warning/30">
                <div className="flex items-center gap-2 mb-4">
                  <AlertTriangle className="text-semantic-warning" size={20} />
                  <h3 className="text-lg font-bold text-text-primary">All Warnings</h3>
                </div>
                <div className="space-y-3">
                  {hybrid.warnings.map((warning: any, index: number) => (
                    <div key={index}>
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className={`text-xs font-bold px-2 py-0.5 rounded ${
                            warning.severity === 'Critical'
                              ? 'bg-semantic-error/20 text-semantic-error'
                              : 'bg-semantic-warning/20 text-semantic-warning'
                          }`}
                        >
                          {warning.severity}
                        </span>
                        <span className="text-xs text-text-tertiary">{warning.type}</span>
                      </div>
                      <p className="text-sm text-text-secondary">{warning.message}</p>
                    </div>
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
