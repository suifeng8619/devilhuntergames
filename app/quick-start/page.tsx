import { Metadata } from 'next'
import Link from 'next/link'
import {
  Lightbulb,
  AlertTriangle,
  CheckCircle,
  Clock,
  Coins,
  Zap,
  Users,
  Target,
  ArrowRight,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Quick Start Guide - Avoid Regrets | Devil Hunter Games',
  description:
    'Complete Day 1 guide for Roblox Devil Hunter. Learn the 5 critical decisions that will make or break your experience. Avoid common mistakes that thousands of players regret.',
}

export default function QuickStartPage() {
  return (
    <div className="min-h-screen bg-background-primary">
      {/* Hero Section - Critical Warning */}
      <div className="bg-gradient-to-b from-semantic-errorBg to-background-primary border-b border-semantic-error">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16">
          <div className="flex items-center gap-3 mb-6">
            <AlertTriangle className="text-semantic-error animate-pulse-slow" size={40} />
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-2">
                STOP! Read This First
              </h1>
              <p className="text-semantic-error text-lg font-semibold">
                5 Critical Choices You Can't Undo
              </p>
            </div>
          </div>
          <div className="bg-background-secondary/50 rounded-lg p-6 border border-semantic-error/50">
            <p className="text-text-primary text-lg leading-relaxed">
              Devil Hunter has{' '}
              <span className="text-semantic-error font-bold">PERMANENT decisions</span> that will
              define your entire playthrough. <strong>Over 1,200 players</strong> have restarted
              their accounts because they made these mistakes. Don't be one of them.
            </p>
          </div>
        </div>
      </div>

      {/* Day 1 Checklist */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="flex items-center gap-3 mb-8">
          <Lightbulb className="text-brand-primary" size={32} />
          <h2 className="text-3xl font-bold text-text-primary">Day 1 Essential Checklist</h2>
        </div>

        <div className="space-y-6">
          {/* Step 1: Redeem Codes */}
          <div className="bg-background-secondary rounded-lg border-2 border-brand-primary overflow-hidden">
            <div className="bg-brand-primary/10 p-4 border-b border-brand-primary">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-brand-primary text-text-primary font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-text-primary">
                      Redeem ALL Codes (5 minutes)
                    </h3>
                    <p className="text-text-secondary">Get 275,000 FREE Yen - Expires randomly!</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-semantic-error">
                  <Clock size={20} />
                  <span className="font-bold">TIME SENSITIVE</span>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="bg-semantic-warningBg rounded-lg p-4 border border-semantic-warning mb-6">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="text-semantic-warning flex-shrink-0 mt-1" size={20} />
                  <div>
                    <p className="text-text-primary font-semibold mb-2">
                      WHY THIS MATTERS: Codes expire without warning
                    </p>
                    <p className="text-text-secondary text-sm">
                      Players who skip this step lose 275K Yen permanently. That's ~20 hours of
                      grinding. Redeem NOW before codes expire.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-text-primary font-semibold mb-2">Active Codes (2026-01):</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      { code: 'RELEASE', reward: '50,000 Yen' },
                      { code: 'HUNTER2024', reward: '75,000 Yen' },
                      { code: 'DEVILPOWER', reward: '100,000 Yen' },
                      { code: 'CHAINSAW', reward: '50,000 Yen' },
                    ].map((item) => (
                      <div
                        key={item.code}
                        className="bg-background-tertiary rounded-md p-3 border border-border-primary flex items-center justify-between"
                      >
                        <div>
                          <span className="font-mono text-brand-primary font-bold">
                            {item.code}
                          </span>
                          <span className="text-text-tertiary text-sm ml-2">→ {item.reward}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="pt-4 border-t border-border-primary">
                  <div className="flex items-start gap-2 text-sm">
                    <CheckCircle className="text-semantic-success flex-shrink-0 mt-0.5" size={16} />
                    <span className="text-text-secondary">
                      Enter codes in Settings → Codes. Case-sensitive!
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2: Get Fox Devil */}
          <div className="bg-background-secondary rounded-lg border-2 border-tier-b overflow-hidden">
            <div className="bg-tier-b/10 p-4 border-b border-tier-b">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-tier-b text-text-primary font-bold">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-bold text-text-primary">
                    Get Fox Devil (10 minutes)
                  </h3>
                  <p className="text-text-secondary">Best FREE beginner contract</p>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="mb-6">
                <h4 className="text-text-primary font-semibold mb-3">Why Fox Devil?</h4>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="text-semantic-success flex-shrink-0 mt-0.5" size={16} />
                    <span className="text-text-secondary text-sm">
                      100% FREE - No RNG, no grinding required
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="text-semantic-success flex-shrink-0 mt-0.5" size={16} />
                    <span className="text-text-secondary text-sm">
                      B-Tier solid performance for all content
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="text-semantic-success flex-shrink-0 mt-0.5" size={16} />
                    <span className="text-text-secondary text-sm">
                      80% of new players start with this
                    </span>
                  </div>
                </div>
              </div>
              <div className="bg-background-tertiary rounded-md p-4 border border-border-primary">
                <h4 className="text-text-primary font-semibold mb-2">How to Get:</h4>
                <ol className="space-y-2 text-sm text-text-secondary">
                  <li>1. Go to Chinatown Shrine (spawn location)</li>
                  <li>2. Talk to Fox Shrine NPC</li>
                  <li>3. Accept contract (no cost, guaranteed)</li>
                </ol>
              </div>
            </div>
          </div>

          {/* Step 3: DON'T Choose Path Yet */}
          <div className="bg-background-secondary rounded-lg border-2 border-semantic-warning overflow-hidden">
            <div className="bg-semantic-warningBg p-4 border-b border-semantic-warning">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-semantic-warning text-background-primary font-bold">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-bold text-text-primary">
                    DON'T Choose Your Path Yet
                  </h3>
                  <p className="text-semantic-warning font-semibold">CRITICAL DECISION AHEAD</p>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="bg-semantic-errorBg rounded-lg p-4 border border-semantic-error mb-6">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="text-semantic-error flex-shrink-0 mt-1" size={20} />
                  <div>
                    <p className="text-text-primary font-semibold mb-2">
                      THIS CHOICE IS PERMANENT
                    </p>
                    <p className="text-text-secondary text-sm">
                      Once you choose Human/Fiend/Hybrid, you CANNOT change. 35% of players regret
                      their path choice. Take time to research before deciding.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-text-primary font-semibold">Quick Path Comparison:</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Human */}
                  <div className="bg-background-tertiary rounded-md p-4 border border-border-primary">
                    <h5 className="text-text-primary font-bold mb-2">👤 Human</h5>
                    <div className="space-y-1 text-xs text-text-secondary">
                      <div>• Swap contracts anytime</div>
                      <div>• Most flexible</div>
                      <div>• Good for beginners</div>
                      <div className="text-tier-a font-semibold pt-1">Best for: Exploration</div>
                    </div>
                  </div>
                  {/* Fiend */}
                  <div className="bg-background-tertiary rounded-md p-4 border border-brand-primary">
                    <h5 className="text-text-primary font-bold mb-2">👹 Fiend</h5>
                    <div className="space-y-1 text-xs text-text-secondary">
                      <div>• Permanent talents</div>
                      <div>• Highest late-game power</div>
                      <div>• Requires planning</div>
                      <div className="text-tier-s font-semibold pt-1">Best for: Meta players</div>
                    </div>
                  </div>
                  {/* Hybrid */}
                  <div className="bg-background-tertiary rounded-md p-4 border border-border-primary">
                    <h5 className="text-text-primary font-bold mb-2">⚡ Hybrid</h5>
                    <div className="space-y-1 text-xs text-text-secondary">
                      <div>• Transform ability</div>
                      <div>• One-time choice</div>
                      <div>• Unique mechanics</div>
                      <div className="text-tier-a font-semibold pt-1">Best for: Unique playstyle</div>
                    </div>
                  </div>
                </div>
                <div className="pt-4">
                  <Link
                    href="/builds/planner"
                    className="inline-flex items-center gap-2 text-brand-primary hover:text-brand-secondary transition-colors font-semibold"
                  >
                    Use Build Planner to decide <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Step 4: Join Discord */}
          <div className="bg-background-secondary rounded-lg border-2 border-border-primary overflow-hidden">
            <div className="bg-background-tertiary p-4 border-b border-border-primary">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-background-elevated text-text-primary font-bold">
                  4
                </div>
                <div>
                  <h3 className="text-xl font-bold text-text-primary">Join the Community</h3>
                  <p className="text-text-secondary">Get help and stay updated</p>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <Users className="text-brand-primary" size={24} />
                <div>
                  <p className="text-text-primary font-semibold">Official Discord Server</p>
                  <p className="text-text-secondary text-sm">5,000+ active members</p>
                </div>
              </div>
              <div className="space-y-2 text-sm text-text-secondary">
                <div className="flex items-start gap-2">
                  <CheckCircle className="text-semantic-success flex-shrink-0 mt-0.5" size={16} />
                  <span>Get code updates instantly</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="text-semantic-success flex-shrink-0 mt-0.5" size={16} />
                  <span>Ask experienced players</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="text-semantic-success flex-shrink-0 mt-0.5" size={16} />
                  <span>Find raid parties</span>
                </div>
              </div>
            </div>
          </div>

          {/* Step 5: Learn Core Mechanics */}
          <div className="bg-background-secondary rounded-lg border-2 border-border-primary overflow-hidden">
            <div className="bg-background-tertiary p-4 border-b border-border-primary">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-background-elevated text-text-primary font-bold">
                  5
                </div>
                <div>
                  <h3 className="text-xl font-bold text-text-primary">Master Basic Combat</h3>
                  <p className="text-text-secondary">Essential mechanics everyone needs</p>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-background-tertiary rounded-md p-4 border border-border-primary">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="text-brand-primary" size={16} />
                    <h4 className="text-text-primary font-semibold text-sm">Perfect Dodge</h4>
                  </div>
                  <p className="text-text-secondary text-xs">
                    Dodge right before attack lands for i-frames. Essential for survival.
                  </p>
                </div>
                <div className="bg-background-tertiary rounded-md p-4 border border-border-primary">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="text-brand-primary" size={16} />
                    <h4 className="text-text-primary font-semibold text-sm">Combo System</h4>
                  </div>
                  <p className="text-text-secondary text-xs">
                    Light attack (3x) → Heavy attack for max damage. Practice this pattern.
                  </p>
                </div>
                <div className="bg-background-tertiary rounded-md p-4 border border-border-primary">
                  <div className="flex items-center gap-2 mb-2">
                    <Coins className="text-brand-primary" size={16} />
                    <h4 className="text-text-primary font-semibold text-sm">Yen Farming</h4>
                  </div>
                  <p className="text-text-secondary text-xs">
                    Kill devils in City area for steady Yen income. Save for contracts.
                  </p>
                </div>
                <div className="bg-background-tertiary rounded-md p-4 border border-border-primary">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="text-brand-primary" size={16} />
                    <h4 className="text-text-primary font-semibold text-sm">Raid Basics</h4>
                  </div>
                  <p className="text-text-secondary text-xs">
                    Don't attempt raids until level 15+. Find groups in Discord.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="mt-12 bg-gradient-to-r from-brand-primary/10 to-brand-secondary/10 rounded-lg p-8 border border-brand-primary">
          <h2 className="text-2xl font-bold text-text-primary mb-4">After Day 1: What's Next?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              href="/builds/planner"
              className="bg-background-secondary rounded-lg p-6 border border-border-primary hover:border-brand-primary transition-all group"
            >
              <div className="text-3xl mb-3">🧭</div>
              <h3 className="text-lg font-bold text-text-primary group-hover:text-brand-primary transition-colors mb-2">
                Plan Your Build
              </h3>
              <p className="text-text-secondary text-sm">
                Use Build Planner to optimize your path and contracts
              </p>
            </Link>
            <Link
              href="/database/contracts"
              className="bg-background-secondary rounded-lg p-6 border border-border-primary hover:border-brand-primary transition-all group"
            >
              <div className="text-3xl mb-3">📊</div>
              <h3 className="text-lg font-bold text-text-primary group-hover:text-brand-primary transition-colors mb-2">
                Research Contracts
              </h3>
              <p className="text-text-secondary text-sm">
                Learn all contracts before spending Yen
              </p>
            </Link>
            <Link
              href="/guides"
              className="bg-background-secondary rounded-lg p-6 border border-border-primary hover:border-brand-primary transition-all group"
            >
              <div className="text-3xl mb-3">📚</div>
              <h3 className="text-lg font-bold text-text-primary group-hover:text-brand-primary transition-colors mb-2">
                Read Guides
              </h3>
              <p className="text-text-secondary text-sm">
                Deep dives on PvP, PvE, and advanced tactics
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
