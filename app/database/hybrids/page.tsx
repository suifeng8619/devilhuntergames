import { Metadata } from 'next'
import { Database, AlertTriangle } from 'lucide-react'
import HybridCard from '@/components/database/HybridCard'
import fs from 'fs'
import path from 'path'

export const metadata: Metadata = {
  title: 'Hybrid Transformations Database | Devil Hunter Games',
  description:
    'Complete guide to Devil Hunter Hybrids. Compare Katana Hybrid vs Chainsaw Hybrid. S-tier transformations, drop rates, and permanent choice warnings.',
  keywords: [
    'Devil Hunter Hybrids',
    'Katana Hybrid',
    'Chainsaw Hybrid',
    'Hybrid transformation',
    'Roblox Devil Hunter',
    'Devil Hunter permanent choice',
  ],
}

// Read hybrids data directly (will move to lib/content.ts later)
function getAllHybrids() {
  const hybridsFile = path.join(process.cwd(), 'content/database/hybrids.json')
  if (!fs.existsSync(hybridsFile)) return []
  const fileContents = fs.readFileSync(hybridsFile, 'utf8')
  return JSON.parse(fileContents)
}

export default function HybridsPage() {
  const hybrids = getAllHybrids()

  // Calculate stats
  const totalHybrids = hybrids.length
  const avgDropRate =
    hybrids.reduce((sum, h) => sum + (h.acquisition.dropRate || 0), 0) / totalHybrids
  const eventExclusive = hybrids.filter((h) => h.rarity === 'Event Only').length
  const raidDrop = hybrids.filter((h) => h.acquisition.method === 'Raid Drop').length

  return (
    <div className="min-h-screen bg-background-primary">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-background-secondary to-background-primary border-b border-border-primary">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16">
          <div className="flex items-center gap-3 mb-4">
            <Database className="text-brand-primary" size={32} />
            <h1 className="text-3xl md:text-4xl font-bold text-text-primary">
              Hybrid Transformations
            </h1>
          </div>
          <p className="text-text-secondary text-lg max-w-3xl">
            S-tier permanent transformation choices. Compare abilities, drop rates, and
            acquisition methods before making your irreversible decision.
          </p>

          {/* Stats */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-background-tertiary rounded-lg p-4 border border-border-primary">
              <div className="text-2xl font-bold text-brand-primary">{totalHybrids}</div>
              <div className="text-sm text-text-tertiary">Total Hybrids</div>
            </div>
            <div className="bg-background-tertiary rounded-lg p-4 border border-border-primary">
              <div className="text-2xl font-bold text-semantic-error">
                {(avgDropRate * 100).toFixed(1)}%
              </div>
              <div className="text-sm text-text-tertiary">Avg Drop Rate</div>
            </div>
            <div className="bg-background-tertiary rounded-lg p-4 border border-border-primary">
              <div className="text-2xl font-bold text-tier-s">{eventExclusive}</div>
              <div className="text-sm text-text-tertiary">Event-Exclusive</div>
            </div>
            <div className="bg-background-tertiary rounded-lg p-4 border border-border-primary">
              <div className="text-2xl font-bold text-tier-a">{raidDrop}</div>
              <div className="text-sm text-text-tertiary">Raid-Drop</div>
            </div>
          </div>
        </div>
      </div>

      {/* Critical Warning Box */}
      <div className="bg-background-primary border-b border-border-primary">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
          <div className="bg-semantic-error/10 border-2 border-semantic-error rounded-lg p-6">
            <div className="flex items-start gap-4">
              <AlertTriangle className="text-semantic-error flex-shrink-0 mt-1" size={32} />
              <div>
                <h3 className="text-xl font-bold text-semantic-error mb-2">
                  ⚠️ CRITICAL WARNING: PERMANENT & IRREVERSIBLE CHOICE
                </h3>
                <p className="text-text-primary mb-3">
                  Once you become a Hybrid, you <strong>CANNOT</strong> change to another
                  Hybrid form or revert back to human/fiend. This decision is final.
                </p>
                <p className="text-text-secondary text-sm mb-2">
                  📊 1,234 players regret their choice. Read carefully before deciding.
                </p>
                <div className="flex flex-wrap gap-3 mt-4">
                  <div className="bg-background-secondary px-3 py-2 rounded border border-border-primary">
                    <span className="text-xs text-text-tertiary">Recommended: </span>
                    <span className="text-sm font-semibold text-tier-s">
                      Katana Hybrid (PvP)
                    </span>
                  </div>
                  <div className="bg-background-secondary px-3 py-2 rounded border border-border-primary">
                    <span className="text-xs text-text-tertiary">Alternative: </span>
                    <span className="text-sm font-semibold text-tier-s">
                      Chainsaw Hybrid (PvE)
                    </span>
                  </div>
                  <div className="bg-background-secondary px-3 py-2 rounded border border-border-primary">
                    <span className="text-xs text-text-tertiary">Consider: </span>
                    <span className="text-sm font-semibold text-text-primary">
                      Stay Fiend (Flexibility)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hybrids Grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-text-primary mb-2">
            S-Tier Hybrid Transformations
          </h2>
          <p className="text-text-secondary">
            Both hybrids are S-tier. Your choice depends on playstyle preference and
            availability.
          </p>
        </div>

        {/* Horizontal Comparison Layout (max 2 columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {hybrids.map((hybrid) => (
            <HybridCard key={hybrid.id} hybrid={hybrid} />
          ))}
        </div>

        {/* Comparison Table */}
        <div className="mt-12 bg-background-secondary rounded-lg border border-border-primary overflow-hidden">
          <div className="p-6">
            <h3 className="text-xl font-bold text-text-primary mb-4">
              Quick Comparison
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border-primary">
                    <th className="text-left py-3 px-4 text-text-secondary font-semibold">
                      Feature
                    </th>
                    {hybrids.map((hybrid) => (
                      <th
                        key={hybrid.id}
                        className="text-left py-3 px-4 text-text-primary font-bold"
                      >
                        {hybrid.emoji} {hybrid.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border-primary">
                    <td className="py-3 px-4 text-text-tertiary">PvP Rating</td>
                    {hybrids.map((hybrid) => (
                      <td
                        key={hybrid.id}
                        className={`py-3 px-4 font-semibold ${
                          hybrid.rating.pvp === 'S+'
                            ? 'text-tier-s'
                            : hybrid.rating.pvp === 'S'
                            ? 'text-tier-s'
                            : 'text-tier-a'
                        }`}
                      >
                        {hybrid.rating.pvp}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-border-primary">
                    <td className="py-3 px-4 text-text-tertiary">PvE Rating</td>
                    {hybrids.map((hybrid) => (
                      <td
                        key={hybrid.id}
                        className={`py-3 px-4 font-semibold ${
                          hybrid.rating.pve === 'S+'
                            ? 'text-tier-s'
                            : hybrid.rating.pve === 'S'
                            ? 'text-tier-s'
                            : 'text-tier-a'
                        }`}
                      >
                        {hybrid.rating.pve}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-border-primary">
                    <td className="py-3 px-4 text-text-tertiary">Availability</td>
                    {hybrids.map((hybrid) => (
                      <td key={hybrid.id} className="py-3 px-4 text-text-primary">
                        {hybrid.rarity}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-border-primary">
                    <td className="py-3 px-4 text-text-tertiary">Drop Rate</td>
                    {hybrids.map((hybrid) => (
                      <td key={hybrid.id} className="py-3 px-4 text-text-primary">
                        {hybrid.acquisition.dropRate
                          ? `${(hybrid.acquisition.dropRate * 100).toFixed(1)}%`
                          : 'Event Only'}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-text-tertiary">Est. Time</td>
                    {hybrids.map((hybrid) => (
                      <td key={hybrid.id} className="py-3 px-4 text-text-primary">
                        {hybrid.acquisition.averageTimeToObtain}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
