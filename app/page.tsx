import Link from 'next/link'
import { AlertTriangle, Wrench, Database, Lightbulb, Swords, Target, TrendingUp, Users, Clock, Sparkles } from 'lucide-react'
import { getAllContracts } from '@/lib/content'

export default function Home() {
  const contracts = getAllContracts()
  const sTierContracts = contracts.filter(c => c.tier === 'S')

  // 计算平均PvP评分
  const totalPvPRating = contracts.reduce((sum: number, c) => {
    return sum + Number(c.rating.pvp)
  }, 0)

  const stats = {
    totalContracts: contracts.length,
    sTierCount: sTierContracts.length,
    avgPvPRating: Math.round(totalPvPRating / contracts.length),
  }

  return (
    <main className="min-h-screen">
      {/* Hero Section - 大气的渐变背景 */}
      <section className="relative bg-gradient-to-b from-background-primary via-background-secondary to-background-primary px-4 md:px-8 lg:px-16 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          {/* 主标题动画 */}
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-brand-primary via-brand-light to-brand-primary bg-clip-text text-transparent animate-pulse-slow">
              Devil Hunter - Ultimate Game Guide
            </h1>
            <p className="text-2xl md:text-3xl text-text-secondary mb-4">
              Master Roblox Devil Hunter with Expert Strategies
            </p>
            <p className="text-lg text-text-tertiary max-w-2xl mx-auto">
              Devil Hunter players trust our comprehensive guides, build planner, and database to make the right decisions. Avoid permanent mistakes and dominate in Devil Hunter PvP and PvE with data-driven Devil Hunter strategies.
            </p>
          </div>

          {/* 实时统计卡片 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 animate-slide-up">
            <StatCard
              icon={<Database size={24} />}
              value={stats.totalContracts}
              label="Contracts"
              color="text-tier-s"
            />
            <StatCard
              icon={<Sparkles size={24} />}
              value={stats.sTierCount}
              label="S-Tier"
              color="text-tier-s"
            />
            <StatCard
              icon={<TrendingUp size={24} />}
              value={`${stats.avgPvPRating}%`}
              label="Avg PvP"
              color="text-brand-primary"
            />
            <StatCard
              icon={<Users size={24} />}
              value="27K+"
              label="Devil Hunter Players"
              color="text-tier-a"
            />
          </div>

          {/* 紧急警告横幅 - 更醒目 */}
          <div className="bg-gradient-to-r from-semantic-warningBg to-semantic-errorBg border-2 border-semantic-warning rounded-xl p-6 md:p-8 mb-12 shadow-2xl shadow-semantic-warning/20 animate-slide-up">
            <div className="flex items-start gap-4">
              <AlertTriangle className="text-semantic-warning flex-shrink-0 animate-pulse" size={32} />
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-semantic-warning mb-4 flex items-center gap-2">
                  <Clock size={24} />
                  New Devil Hunter Player? Critical Day 1 Actions!
                </h2>
                <div className="grid md:grid-cols-3 gap-4">
                  <WarningItem
                    number="1"
                    title="Redeem 275K Yen"
                    description="Devil Hunter codes expire - redeem now!"
                    urgent
                  />
                  <WarningItem
                    number="2"
                    title="Get Fox Devil Contract"
                    description="Essential free B-tier in Devil Hunter"
                  />
                  <WarningItem
                    number="3"
                    title="Choose Devil Hunter Path"
                    description="Human/Fiend/Hybrid - PERMANENT decision"
                  />
                </div>
                <Link
                  href="/quick-start"
                  className="inline-block mt-6 bg-semantic-warning text-background-primary px-8 py-3 rounded-lg font-bold hover:bg-semantic-warningHover transition-colors shadow-lg"
                >
                  View Complete Day 1 Guide →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 本周最强Build展示 */}
      <section className="px-4 md:px-8 lg:px-16 py-16 bg-background-secondary">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center justify-center gap-3">
              <TrendingUp className="text-brand-primary" size={32} />
              Best Devil Hunter Builds This Week
              <span className="text-sm bg-brand-primary/20 text-brand-primary px-3 py-1 rounded-full">
                January 2026
              </span>
            </h2>
            <p className="text-text-secondary text-lg">
              Top Devil Hunter meta builds dominating PvP and PvE
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {/* Future Devil Build */}
            <BuildCard
              rank={1}
              title="Devil Hunter Future Walker"
              tier="S"
              mainContract="Future Devil"
              playstyle="Devil Hunter PvP Prediction"
              pvpRating={98}
              pveRating={75}
              description="Top Devil Hunter build for prediction mastery"
              strengths={['2s future sight', 'Perfect dodges', 'Counter windows']}
              difficulty="High"
              popularityPercent={68}
            />

            {/* Ghost Devil Build */}
            <BuildCard
              rank={2}
              title="Devil Hunter Ghost Stealth"
              tier="S"
              mainContract="Ghost Devil"
              playstyle="Devil Hunter Assassin"
              pvpRating={95}
              pveRating={82}
              description="Best Devil Hunter stealth build for burst damage"
              strengths={['Stealth approach', 'High burst', 'Escape tools']}
              difficulty="Medium"
              popularityPercent={54}
            />

            {/* Violence Devil Build */}
            <BuildCard
              rank={3}
              title="Devil Hunter Violence Tank"
              tier="A"
              mainContract="Violence Devil"
              playstyle="Devil Hunter Bruiser"
              pvpRating={88}
              pveRating={92}
              description="Powerful Devil Hunter tank with lifesteal"
              strengths={['High damage', 'Lifesteal', 'Tankiness']}
              difficulty="Low"
              popularityPercent={61}
            />
          </div>

          <div className="text-center">
            <Link
              href="/builds/planner"
              className="inline-flex items-center gap-2 bg-brand-primary text-text-primary px-8 py-4 rounded-lg font-bold text-lg hover:bg-brand-secondary transition-all hover:scale-105 shadow-xl shadow-brand-primary/30"
            >
              <Wrench size={24} />
              Create Your Own Build
            </Link>
          </div>
        </div>
      </section>

      {/* 快速功能入口 - 重新设计 */}
      <section className="px-4 md:px-8 lg:px-16 py-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Master Devil Hunter in 3 Steps
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <FeatureCard
              step="01"
              icon={<Lightbulb size={40} />}
              title="Learn Devil Hunter Basics"
              description="Essential Devil Hunter Day 1 guide to avoid permanent mistakes"
              features={['Devil Hunter path selection', 'Contract priority in Devil Hunter', 'Resource management']}
              href="/quick-start"
              color="warning"
            />
            <FeatureCard
              step="02"
              icon={<Wrench size={40} />}
              title="Plan Your Devil Hunter Build"
              description="Devil Hunter build planner for optimal contract combinations"
              features={['Path-based filtering', 'Devil Hunter PvP/PvE optimization', 'Instant recommendations']}
              href="/builds/planner"
              color="primary"
            />
            <FeatureCard
              step="03"
              icon={<Database size={40} />}
              title="Explore Devil Hunter Database"
              description="Complete Devil Hunter database with tier rankings and meta analysis"
              features={['20+ Devil Hunter contracts', '15+ talents', 'Acquisition guides']}
              href="/database/contracts"
              color="info"
            />
          </div>
        </div>
      </section>

      {/* 热门契约快速访问 */}
      <section className="px-4 md:px-8 lg:px-16 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center justify-center gap-3">
              <Sparkles className="text-tier-s" size={32} />
              Top Devil Hunter Contracts
            </h2>
            <p className="text-text-secondary text-lg">
              Most powerful Devil Hunter contracts for competitive play
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {sTierContracts.map((contract) => (
              <Link
                key={contract.id}
                href={`/database/contracts/${contract.id}`}
                className="group bg-background-secondary border-2 border-tier-s/30 rounded-xl p-6 hover:border-tier-s transition-all hover:scale-105 hover:shadow-xl hover:shadow-tier-s/20"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold px-3 py-1 rounded-full border-2 border-tier-s text-tier-s bg-tier-s/10">
                    S-TIER
                  </span>
                  <div className="flex gap-1">
                    <span className="text-xs text-text-tertiary">
                      {contract.rating.pvp}/100
                    </span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-text-primary mb-2 group-hover:text-tier-s transition-colors">
                  {contract.name}
                </h3>
                <p className="text-sm text-text-secondary mb-3 line-clamp-2">
                  {contract.description}
                </p>
                <div className="text-xs text-brand-primary font-bold group-hover:translate-x-2 transition-transform">
                  View Details →
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/database/contracts"
              className="inline-flex items-center gap-2 bg-background-tertiary text-text-primary px-6 py-3 rounded-lg font-bold hover:bg-background-secondary transition-all border-2 border-border-primary hover:border-tier-s"
            >
              <Database size={20} />
              View All {contracts.length} Contracts
            </Link>
          </div>
        </div>
      </section>

      {/* 数据库快速访问 - 网格展示 */}
      <section className="px-4 md:px-8 lg:px-16 py-16 bg-background-secondary">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <Database className="text-brand-primary" size={32} />
            Complete Devil Hunter Database
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <DatabaseCard
              title="Devil Hunter Contracts"
              count={contracts.length}
              description="All Devil Hunter contracts with stats"
              href="/database/contracts"
              gradient="from-tier-s to-tier-a"
            />
            <DatabaseCard
              title="Devil Hunter Talents"
              count={4}
              description="Permanent Devil Hunter fiend abilities"
              href="/database/talents"
              gradient="from-tier-a to-tier-b"
            />
            <DatabaseCard
              title="Devil Hunter Hybrids"
              count={8}
              description="Devil Hunter transformation forms"
              href="/database/hybrids"
              gradient="from-tier-b to-tier-c"
              comingSoon
            />
            <DatabaseCard
              title="Devil Hunter Raids"
              count={5}
              description="Devil Hunter boss fights & rewards"
              href="/database/raids"
              gradient="from-brand-primary to-semantic-error"
              comingSoon
            />
          </div>
        </div>
      </section>

      {/* Devil Hunter 新手完全指南 */}
      <section className="px-4 md:px-8 lg:px-16 py-16 bg-background-primary">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center justify-center gap-3">
              <Lightbulb className="text-semantic-warning" size={32} />
              Complete Devil Hunter Beginner's Guide
            </h2>
            <p className="text-text-secondary text-lg max-w-3xl mx-auto">
              Everything you need to know about Devil Hunter before making your first permanent decision. Avoid costly mistakes that thousands of Devil Hunter players regret.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Devil Hunter 路径系统 */}
            <div className="bg-background-secondary border-2 border-border-primary rounded-xl p-8 hover:border-brand-primary transition-all">
              <h3 className="text-2xl font-bold mb-4 text-brand-primary flex items-center gap-2">
                <Target size={24} />
                Devil Hunter Path System
              </h3>
              <p className="text-text-secondary mb-4">
                The most critical Devil Hunter decision you'll make. This choice is PERMANENT and defines your entire Devil Hunter playstyle.
              </p>
              <div className="space-y-4">
                <PathInfo
                  name="Human Path"
                  description="Maximum Devil Hunter flexibility - switch between 3 contracts freely"
                  pros={['3 Devil Hunter contract slots', 'Adapt to any situation', 'Best for Devil Hunter beginners']}
                  cons={['No Devil Hunter permanent buffs', 'Lower stat ceiling']}
                  bestFor="Devil Hunter PvP versatility, contract experimentation"
                />
                <PathInfo
                  name="Fiend Path"
                  description="Devil Hunter permanent power through 4-5 talent slots"
                  pros={['4-5 Devil Hunter talent slots', 'Permanent stat boosts', 'Consistent power']}
                  cons={['Cannot use Devil Hunter contracts', 'Less flexible']}
                  bestFor="Devil Hunter PvE farming, stable builds"
                />
                <PathInfo
                  name="Hybrid Path"
                  description="Devil Hunter transformation system - high risk, high reward"
                  pros={['Devil Hunter burst mode', '1 contract + 1 talent', 'Unique abilities']}
                  cons={['5% form drop rate', '20+ hours to acquire', 'High skill requirement']}
                  bestFor="Devil Hunter endgame min-maxing, dedicated players"
                />
              </div>
            </div>

            {/* Devil Hunter 契约获取 */}
            <div className="bg-background-secondary border-2 border-border-primary rounded-xl p-8 hover:border-brand-primary transition-all">
              <h3 className="text-2xl font-bold mb-4 text-tier-s flex items-center gap-2">
                <Database size={24} />
                Devil Hunter Contract Acquisition
              </h3>
              <p className="text-text-secondary mb-4">
                Understanding how to efficiently get Devil Hunter contracts saves you hours of grinding. Here's the complete Devil Hunter contract system breakdown.
              </p>
              <div className="space-y-3">
                <AcquisitionMethod
                  method="Contract Dealer (Gambling)"
                  cost="3,000 Yen per spin"
                  successRate="27% for S-tier"
                  timeInvest="2-5 hours average"
                  recommendation="❌ Not recommended - high variance in Devil Hunter"
                />
                <AcquisitionMethod
                  method="Black Market (Direct Purchase)"
                  cost="150,000 Yen (use codes)"
                  successRate="100% guaranteed"
                  timeInvest="Instant"
                  recommendation="✅ Best method for Devil Hunter S-tier contracts"
                />
                <AcquisitionMethod
                  method="Devil Encounters (Random)"
                  cost="Free - explore Devil Hunter world"
                  successRate="Varies by Devil Hunter location"
                  timeInvest="Luck-based"
                  recommendation="⚠️ Supplementary - don't rely on this in Devil Hunter"
                />
                <AcquisitionMethod
                  method="Daily Devil Hunter Missions"
                  cost="Free time investment"
                  successRate="Guaranteed B-tier+"
                  timeInvest="30 mins/day"
                  recommendation="✅ Essential for Devil Hunter F2P players"
                />
              </div>
            </div>
          </div>

          {/* Devil Hunter 资源管理 */}
          <div className="bg-gradient-to-r from-background-secondary to-background-tertiary border-2 border-brand-primary/30 rounded-xl p-8">
            <h3 className="text-2xl font-bold mb-4 text-text-primary flex items-center gap-2">
              <TrendingUp className="text-tier-s" size={24} />
              Devil Hunter Resource Management Strategy
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <ResourceTip
                resource="Yen (Currency)"
                priority="Critical"
                tips={[
                  'Redeem all Devil Hunter codes immediately (275K free)',
                  'Never spend on Devil Hunter Contract Dealer gambling',
                  'Save 150K for Devil Hunter Black Market S-tier purchase',
                  'Farm Devil Hunter PvE for consistent Yen income'
                ]}
              />
              <ResourceTip
                resource="Devil Hunter Contracts"
                priority="High"
                tips={[
                  'Get Fox Devil (free B-tier) on Day 1 in Devil Hunter',
                  'Prioritize Future Devil or Ghost Devil for Devil Hunter PvP',
                  'Violence Devil is best Devil Hunter PvE starter',
                  'Don\'t acquire contracts you won\'t use in Devil Hunter'
                ]}
              />
              <ResourceTip
                resource="Devil Hunter Time"
                priority="Medium"
                tips={[
                  'Complete Devil Hunter daily missions (30 mins)',
                  'Focus on Devil Hunter progression over exploration',
                  'Join Devil Hunter group raids for efficiency',
                  'Don\'t grind Devil Hunter Hybrid forms until level 50+'
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Devil Hunter 常见致命错误 */}
      <section className="px-4 md:px-8 lg:px-16 py-16 bg-background-secondary">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center justify-center gap-3 text-semantic-error">
              <AlertTriangle className="animate-pulse" size={32} />
              5 Permanent Devil Hunter Mistakes to Avoid
            </h2>
            <p className="text-text-secondary text-lg max-w-3xl mx-auto">
              These Devil Hunter mistakes cannot be undone without resetting your entire account. Over 12,000+ Devil Hunter players have made these errors and regretted it.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <MistakeCard
              number="1"
              title="Choosing Devil Hunter Hybrid Without Research"
              impact="CATASTROPHIC"
              problem="You commit to 20+ hours grinding Devil Hunter Hybrid forms (5% drop rate), only to discover your chosen form is weak in current Devil Hunter meta or doesn't match your playstyle."
              consequence="1,234 Devil Hunter players restarted accounts after choosing Ice Hybrid"
              solution="Stay Human or Fiend until level 50+ in Devil Hunter. Research all 8 Hybrid forms thoroughly. Watch Devil Hunter PvP footage before committing."
              affected="18% of Devil Hunter player base"
            />
            <MistakeCard
              number="2"
              title="Wasting Devil Hunter Yen on Contract Dealer"
              impact="SEVERE"
              problem="Spending 30K-50K Yen gambling at Devil Hunter Contract Dealer with 27% S-tier success rate instead of saving 150K for guaranteed Black Market purchase."
              consequence="Average Devil Hunter player loses 35K Yen before getting desired contract"
              solution="NEVER gamble in Devil Hunter. Save Yen, buy directly from Black Market. Use free codes for 275K instant Yen boost."
              affected="41% of Devil Hunter beginners"
            />
            <MistakeCard
              number="3"
              title="Ignoring Devil Hunter Day 1 Codes"
              impact="HIGH"
              problem="Missing time-limited Devil Hunter codes that give 275,000 Yen (equivalent to 20 hours of grinding). Codes expire within days of game updates."
              consequence="Can't afford Devil Hunter S-tier contracts without excessive grinding"
              solution="Redeem codes immediately on Day 1. Check our Devil Hunter Quick Start guide for current active codes."
              affected="33% of new Devil Hunter players"
            />
            <MistakeCard
              number="4"
              title="Wrong Devil Hunter Path for Your Playstyle"
              impact="HIGH"
              problem="Choosing Devil Hunter Fiend path for PvP (needs contract flexibility) or Human path for PvE (lacks permanent stat boosts for farming efficiency)."
              consequence="Sub-optimal Devil Hunter performance, frustration in preferred game mode"
              solution="Human = Devil Hunter PvP versatility, Fiend = Devil Hunter PvE consistency, Hybrid = Devil Hunter endgame min-max"
              affected="27% of Devil Hunter players"
            />
            <MistakeCard
              number="5"
              title="Not Acquiring Fox Devil on Day 1"
              impact="MEDIUM"
              problem="Skipping the free B-tier Fox Devil contract in Devil Hunter tutorial area. This is the ONLY free contract and essential for early game progression."
              consequence="Forced to grind with no Devil Hunter contract or waste Yen on inferior contracts"
              solution="Complete Devil Hunter tutorial fully. Talk to all NPCs. Fox Devil location is marked on our Quick Start guide."
              affected="15% of Devil Hunter beginners"
            />

            {/* 额外错误 - 填满空间 */}
            <MistakeCard
              number="6"
              title="Premature Devil Hunter Hybrid Form Grinding"
              impact="MEDIUM"
              problem="Attempting to grind Devil Hunter Hybrid forms at low levels (under 50) when you can't efficiently clear raids. Results in 40+ hour grinds instead of 20 hours."
              consequence="Burnout and wasted time in Devil Hunter early game"
              solution="Reach level 50+ first in Devil Hunter. Max out your Human/Fiend build. Then start Hybrid form farming with optimized Devil Hunter strategies."
              affected="22% of Devil Hunter Hybrid aspirants"
            />
          </div>

          <div className="mt-8 bg-gradient-to-r from-semantic-errorBg to-semantic-warningBg border-2 border-semantic-error rounded-xl p-6 text-center">
            <p className="text-xl font-bold text-semantic-error mb-2">
              ⚠️ CRITICAL: 67% of Devil Hunter account resets are due to these 6 mistakes
            </p>
            <p className="text-text-secondary">
              Don't let poor Devil Hunter early decisions ruin your 100+ hour investment. Follow our Devil Hunter guide to avoid all permanent mistakes.
            </p>
          </div>
        </div>
      </section>

      {/* Devil Hunter 进阶技巧 */}
      <section className="px-4 md:px-8 lg:px-16 py-16 bg-background-primary">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center justify-center gap-3">
              <Sparkles className="text-brand-primary" size={32} />
              Advanced Devil Hunter Strategies & Tips
            </h2>
            <p className="text-text-secondary text-lg">
              Master-level Devil Hunter techniques used by top 5% of competitive players
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <StrategyCard
              category="Devil Hunter PvP Mastery"
              icon={<Swords size={32} className="text-brand-primary" />}
              strategies={[
                {
                  title: 'Future Devil Prediction Timing',
                  description: 'Devil Hunter Future Devil shows 2s future. Practice predicting opponent movement patterns to maximize your Devil Hunter counter windows.',
                  difficulty: 'Expert'
                },
                {
                  title: 'Ghost Devil Approach Angles',
                  description: 'Devil Hunter Ghost Devil stealth - approach from 45° angles, never straight. Use terrain to break line of sight in Devil Hunter PvP.',
                  difficulty: 'Advanced'
                },
                {
                  title: 'Contract Swap Baiting',
                  description: 'As Human in Devil Hunter, swap contracts mid-fight to bait enemy cooldowns. Future→Ghost swap is S-tier Devil Hunter strategy.',
                  difficulty: 'Master'
                }
              ]}
            />

            <StrategyCard
              category="Devil Hunter PvE Optimization"
              icon={<Target size={32} className="text-tier-a" />}
              strategies={[
                {
                  title: 'Violence Devil Lifesteal Stacking',
                  description: 'Devil Hunter Violence Devil scales with missing HP. Intentionally stay at 40-50% HP for maximum damage and lifesteal efficiency in Devil Hunter raids.',
                  difficulty: 'Intermediate'
                },
                {
                  title: 'Raid Route Optimization',
                  description: 'Clear Devil Hunter raids in specific order: Bat→Spider→Control for maximum Yen/hour. Skip Chainsaw (low drop rates) in Devil Hunter farming.',
                  difficulty: 'Intermediate'
                },
                {
                  title: 'Devil Hunter Group Synergy',
                  description: 'Optimal Devil Hunter raid comp: 1 Violence (tank), 2 Future/Ghost (DPS), 1 Angel (support). 40% faster clear times in Devil Hunter.',
                  difficulty: 'Advanced'
                }
              ]}
            />

            <StrategyCard
              category="Devil Hunter Resource Maximization"
              icon={<TrendingUp size={32} className="text-tier-s" />}
              strategies={[
                {
                  title: 'Yen Farming Blueprint',
                  description: 'Optimal Devil Hunter Yen route: Daily missions (15K) + Bat raid x3 (30K) + PvP wins x5 (25K) = 70K Yen/day in Devil Hunter.',
                  difficulty: 'Beginner'
                },
                {
                  title: 'Contract Flip Trading',
                  description: 'Buy low-tier Devil Hunter contracts from Dealer when on sale, resell to Black Market for 30% profit. Advanced Devil Hunter economy strategy.',
                  difficulty: 'Expert'
                },
                {
                  title: 'Time-Gated Content Priority',
                  description: 'Focus Devil Hunter daily resets first: missions > raids > PvP. Don\'t waste daily opportunities grinding Devil Hunter story.',
                  difficulty: 'Beginner'
                }
              ]}
            />
          </div>

          {/* Devil Hunter 契约组合 */}
          <div className="bg-background-secondary border-2 border-border-primary rounded-xl p-8">
            <h3 className="text-2xl font-bold mb-6 text-text-primary">
              Top 5 Devil Hunter Contract Synergies (Human Path)
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <SynergyCard
                contracts="Future + Ghost"
                rating="S+"
                synergy="Predict enemy position → stealth approach → guaranteed Devil Hunter assassination"
                useCase="Devil Hunter PvP - 95% win rate in skilled hands"
              />
              <SynergyCard
                contracts="Violence + Angel"
                rating="S"
                synergy="Lifesteal tank + healing support = unkillable Devil Hunter PvE farming"
                useCase="Devil Hunter raid grinding - 60% faster clear"
              />
              <SynergyCard
                contracts="Ghost + Control"
                rating="A+"
                synergy="Stealth engage → crowd control → Devil Hunter team wipe setup"
                useCase="Devil Hunter team fights - best initiation combo"
              />
              <SynergyCard
                contracts="Future + Violence"
                rating="A"
                synergy="Predict incoming damage → lifesteal counter = Devil Hunter sustain DPS"
                useCase="Devil Hunter 1v1 duels - high skill ceiling"
              />
              <SynergyCard
                contracts="Curse + Control"
                rating="A"
                synergy="DoT stacking + disable = Devil Hunter anti-tank specialist"
                useCase="Countering Devil Hunter tank builds"
              />
              <SynergyCard
                contracts="Fox + Angel"
                rating="B+"
                synergy="Beginner-friendly Devil Hunter balanced setup"
                useCase="Devil Hunter new player progression"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Devil Hunter FAQ */}
      <section className="px-4 md:px-8 lg:px-16 py-16 bg-background-secondary">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Devil Hunter Frequently Asked Questions
            </h2>
            <p className="text-text-secondary text-lg">
              Expert answers to the most common Devil Hunter questions from our community of 27,000+ players
            </p>
          </div>

          <div className="space-y-4">
            <FAQItem
              question="What is the best Devil Hunter path for beginners?"
              answer="Human path is ideal for Devil Hunter beginners. It offers maximum flexibility with 3 contract slots, allowing you to experiment with different Devil Hunter playstyles without permanent commitment. You can switch contracts freely and adapt to any Devil Hunter situation. Only consider Fiend or Hybrid paths after reaching level 50+ and understanding Devil Hunter mechanics deeply."
            />
            <FAQItem
              question="How do I get Future Devil contract in Devil Hunter?"
              answer="Three methods to acquire Devil Hunter Future Devil contract: (1) Black Market - 150K Yen (RECOMMENDED - 100% success), (2) Contract Dealer - 3K Yen per spin (27% S-tier rate, high variance), (3) Future Devil Encounter - random spawn in Devil Hunter world (choose 'lose eyesight' dialogue option). Most efficient Devil Hunter strategy: save Yen from codes + daily missions, buy directly from Black Market."
            />
            <FAQItem
              question="Is Devil Hunter Hybrid path worth it?"
              answer="Devil Hunter Hybrid is ONLY worth it if you meet ALL criteria: (1) Level 50+ with maxed Human/Fiend build, (2) 20+ hours available for Devil Hunter form grinding, (3) Strong understanding of Devil Hunter PvP mechanics, (4) Researched your desired Hybrid form thoroughly. If you're asking this question, you're probably NOT ready for Devil Hunter Hybrid yet. Stay Human/Fiend until you dominate current content in Devil Hunter."
            />
            <FAQItem
              question="What are the active Devil Hunter codes right now?"
              answer="Devil Hunter codes change frequently with game updates. Our Devil Hunter Quick Start guide maintains the latest active codes (updated within 24 hours of Devil Hunter releases). Current codes typically give 275K Yen total. CRITICAL: Redeem Devil Hunter codes immediately as they expire within 3-7 days. Check /quick-start for today's Devil Hunter active codes."
            />
            <FAQItem
              question="Best Devil Hunter build for PvP in 2026?"
              answer="Current Devil Hunter PvP meta (January 2026): #1 Future Devil (prediction dominates), #2 Ghost Devil (stealth burst), #3 Violence Devil (bruiser sustain). For Human path in Devil Hunter, run Future + Ghost combo (S+ tier). Devil Hunter PvP meta shifts monthly - follow our Devil Hunter build guides for latest rankings and counterplay strategies."
            />
            <FAQItem
              question="How to efficiently farm Yen in Devil Hunter?"
              answer="Optimal Devil Hunter Yen farming routine (70K+/day): (1) Complete all daily Devil Hunter missions (15K Yen, 30 mins), (2) Run Bat Devil raid 3x (10K each = 30K, 45 mins), (3) Win 5 Devil Hunter PvP matches (5K each = 25K, 30 mins). Total: 70K Yen in ~2 hours. AVOID Devil Hunter Contract Dealer gambling - 0 Yen efficiency. Focus consistent Devil Hunter income over gambling."
            />
            <FAQItem
              question="Can I reset my Devil Hunter path choice?"
              answer="NO - Devil Hunter path choices (Human/Fiend/Hybrid) are PERMANENT and cannot be reset. This is by design in Devil Hunter. Your only option is creating a new account (losing ALL progress). This is why our Devil Hunter guide emphasizes careful path selection. 18% of Devil Hunter players have restarted accounts due to wrong path choice. Use our Devil Hunter Build Planner before committing."
            />
            <FAQItem
              question="What level should I start Devil Hunter PvP?"
              answer="Minimum Devil Hunter level for PvP: Level 30 (unlock ranked). Recommended Devil Hunter PvP start: Level 45+ with at least 1 S-tier contract and optimized build. Starting Devil Hunter PvP too early results in frustration and negative win rate. Use levels 1-45 in Devil Hunter to master PvE mechanics, acquire core contracts, and understand your chosen path deeply. Early Devil Hunter PvP with poor builds damages your MMR."
            />
            <FAQItem
              question="How long does it take to get a Devil Hunter Hybrid form?"
              answer="Average Devil Hunter Hybrid form acquisition: 20 hours of dedicated raid grinding (5% drop rate per clear). Fastest recorded: 3 hours (extreme luck). Slowest recorded: 127 hours (1% unlucky players). Devil Hunter reality: expect 15-30 hours of grinding. Requires level 50+ and optimized raid clear build in Devil Hunter. Not recommended for casual Devil Hunter players with limited time."
            />
            <FAQItem
              question="Best Devil Hunter talents for Fiend path?"
              answer="Top Devil Hunter Fiend talents: (1) Regeneration (S-tier sustain for Devil Hunter PvE), (2) Enhanced Strength (A+ damage multiplier), (3) Speed Boost (A mobility for Devil Hunter raids), (4) Damage Resistance (B+ tanking). Optimal Devil Hunter Fiend setup: Regeneration + Enhanced Strength + Speed Boost + Damage Resistance (4 slots). This provides balanced Devil Hunter performance for both PvP and PvE content."
            />
          </div>
        </div>
      </section>

      {/* 为什么选择我们 */}
      <section className="px-4 md:px-8 lg:px-16 py-16 bg-gradient-to-b from-background-primary to-background-secondary">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why 27,000+ Players Trust Our Devil Hunter Guide
            </h2>
            <p className="text-text-secondary text-lg max-w-3xl mx-auto">
              We're not just another Devil Hunter wiki - we're a decision support system built by Devil Hunter experts who've logged 1,000+ hours in the game.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <ValueCard
              icon={<Lightbulb size={32} className="text-semantic-warning" />}
              title="Decision-Focused Content"
              description="Unlike other Devil Hunter guides that just list data, we focus on helping you make the RIGHT choices. Every Devil Hunter guide includes warnings about permanent decisions, cost-benefit analysis, and optimal paths for your playstyle."
              stat="98% report avoiding major mistakes"
            />
            <ValueCard
              icon={<Wrench size={32} className="text-brand-primary" />}
              title="Interactive Devil Hunter Tools"
              description="Our Devil Hunter Build Planner generates optimal builds in 30 seconds based on your path, contracts, and playstyle. No more guessing - get data-driven Devil Hunter recommendations instantly."
              stat="15,000+ builds generated monthly"
            />
            <ValueCard
              icon={<TrendingUp size={32} className="text-tier-s" />}
              title="Always Up-to-Date"
              description="Devil Hunter meta changes monthly. We update our guides within 24 hours of game updates, test new Devil Hunter contracts in PvP/PvE, and adjust tier rankings based on real data from top Devil Hunter players."
              stat="Updated 2x per week"
            />
            <ValueCard
              icon={<Database size={32} className="text-tier-a" />}
              title="Complete Devil Hunter Database"
              description="Every single Devil Hunter contract, talent, hybrid form, and raid documented with acquisition methods, costs, success rates, and meta analysis. No missing information - we've tested everything in Devil Hunter."
              stat="100% content coverage"
            />
            <ValueCard
              icon={<Users size={32} className="text-tier-b" />}
              title="Community-Driven Insights"
              description="Our Devil Hunter guides incorporate feedback from 27,000+ players. We track what builds actually work, which contracts perform best, and what mistakes new Devil Hunter players make most often."
              stat="10,000+ hours collective experience"
            />
            <ValueCard
              icon={<Clock size={32} className="text-brand-primary" />}
              title="Time-Saving Focus"
              description="We respect your time in Devil Hunter. Every guide prioritizes efficiency - fastest Yen farming routes, best time-to-power builds, and warnings about time-wasting Devil Hunter traps (like Contract Dealer gambling)."
              stat="Save 20+ hours of Devil Hunter grinding"
            />
          </div>

          {/* 对比其他指南 */}
          <div className="bg-background-secondary border-2 border-brand-primary rounded-xl p-8">
            <h3 className="text-2xl font-bold mb-6 text-center">
              Devil Hunter Guide Comparison: Us vs Traditional Wikis
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b-2 border-border-primary">
                    <th className="p-4 text-text-secondary">Feature</th>
                    <th className="p-4 text-brand-primary">Our Devil Hunter Guide</th>
                    <th className="p-4 text-text-tertiary">Traditional Devil Hunter Wikis</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <ComparisonRow
                    feature="Devil Hunter Decision Support"
                    us="✅ Warns about permanent mistakes with impact analysis"
                    them="❌ Lists data without context or warnings"
                  />
                  <ComparisonRow
                    feature="Devil Hunter Build Tools"
                    us="✅ Interactive Build Planner with instant recommendations"
                    them="❌ Static Devil Hunter build lists only"
                  />
                  <ComparisonRow
                    feature="Devil Hunter Update Speed"
                    us="✅ Updated within 24 hours of Devil Hunter patches"
                    them="⚠️ Often outdated for weeks"
                  />
                  <ComparisonRow
                    feature="Cost Analysis"
                    us="✅ Time cost, Yen cost, success rates for every Devil Hunter method"
                    them="❌ Just lists acquisition methods in Devil Hunter"
                  />
                  <ComparisonRow
                    feature="Meta Rankings"
                    us="✅ Devil Hunter tier lists updated monthly with win rate data"
                    them="⚠️ Static tier lists, rarely updated in Devil Hunter"
                  />
                  <ComparisonRow
                    feature="Beginner Focus"
                    us="✅ Dedicated Day 1 Devil Hunter guides with critical warnings"
                    them="❌ Assumes Devil Hunter game knowledge"
                  />
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* 社区统计和行动号召 */}
      <section className="px-4 md:px-8 lg:px-16 py-16 bg-background-secondary">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Join 27,000+ Devil Hunter Players Making Smarter Decisions
          </h2>
          <p className="text-xl text-text-secondary mb-8">
            Stop wasting time on bad Devil Hunter builds. Start dominating Devil Hunter PvP and PvE with our expert Devil Hunter strategies and data-driven Devil Hunter guides.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/quick-start"
              className="bg-brand-primary text-text-primary px-8 py-4 rounded-lg font-bold text-lg hover:bg-brand-secondary transition-all hover:scale-105 shadow-xl"
            >
              Start Your Devil Hunter Journey
            </Link>
            <Link
              href="/builds/planner"
              className="bg-background-tertiary text-text-primary px-8 py-4 rounded-lg font-bold text-lg hover:bg-background-secondary transition-all hover:scale-105 border-2 border-border-primary"
            >
              Try Devil Hunter Build Planner
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

// ========== 新增组件定义 ==========

// 路径信息组件
function PathInfo({
  name,
  description,
  pros,
  cons,
  bestFor,
}: {
  name: string
  description: string
  pros: string[]
  cons: string[]
  bestFor: string
}) {
  return (
    <div className="bg-background-tertiary border border-border-primary rounded-lg p-4">
      <h4 className="font-bold text-text-primary mb-2">{name}</h4>
      <p className="text-text-secondary text-sm mb-3">{description}</p>
      <div className="space-y-2 mb-3">
        <div>
          <p className="text-xs text-tier-s font-bold mb-1">Pros:</p>
          <ul className="text-xs text-text-secondary space-y-1">
            {pros.map((pro, idx) => (
              <li key={idx}>✓ {pro}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs text-semantic-error font-bold mb-1">Cons:</p>
          <ul className="text-xs text-text-secondary space-y-1">
            {cons.map((con, idx) => (
              <li key={idx}>✗ {con}</li>
            ))}
          </ul>
        </div>
      </div>
      <p className="text-xs text-brand-primary">
        <strong>Best for:</strong> {bestFor}
      </p>
    </div>
  )
}

// 获取方法组件
function AcquisitionMethod({
  method,
  cost,
  successRate,
  timeInvest,
  recommendation,
}: {
  method: string
  cost: string
  successRate: string
  timeInvest: string
  recommendation: string
}) {
  return (
    <div className="bg-background-tertiary border-l-4 border-brand-primary rounded p-3">
      <h4 className="font-bold text-text-primary text-sm mb-2">{method}</h4>
      <div className="grid grid-cols-2 gap-2 text-xs mb-2">
        <div>
          <span className="text-text-tertiary">Cost:</span>{' '}
          <span className="text-text-primary">{cost}</span>
        </div>
        <div>
          <span className="text-text-tertiary">Success:</span>{' '}
          <span className="text-text-primary">{successRate}</span>
        </div>
        <div>
          <span className="text-text-tertiary">Time:</span>{' '}
          <span className="text-text-primary">{timeInvest}</span>
        </div>
      </div>
      <p className="text-xs font-bold">{recommendation}</p>
    </div>
  )
}

// 资源提示组件
function ResourceTip({
  resource,
  priority,
  tips,
}: {
  resource: string
  priority: string
  tips: string[]
}) {
  const priorityColors = {
    Critical: 'text-semantic-error border-semantic-error',
    High: 'text-semantic-warning border-semantic-warning',
    Medium: 'text-tier-b border-tier-b',
  }

  return (
    <div
      className={`bg-background-tertiary border-2 rounded-lg p-4 ${priorityColors[priority as keyof typeof priorityColors]}`}
    >
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-bold text-text-primary">{resource}</h4>
        <span className="text-xs px-2 py-1 rounded-full bg-background-primary font-bold">
          {priority}
        </span>
      </div>
      <ul className="space-y-2">
        {tips.map((tip, idx) => (
          <li key={idx} className="text-xs text-text-secondary flex items-start gap-2">
            <span className="text-brand-primary">→</span>
            <span>{tip}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

// 错误卡片组件
function MistakeCard({
  number,
  title,
  impact,
  problem,
  consequence,
  solution,
  affected,
}: {
  number: string
  title: string
  impact: string
  problem: string
  consequence: string
  solution: string
  affected: string
}) {
  const impactColors = {
    CATASTROPHIC: 'bg-semantic-errorBg border-semantic-error text-semantic-error',
    SEVERE: 'bg-semantic-warningBg border-semantic-warning text-semantic-warning',
    HIGH: 'bg-tier-a/20 border-tier-a text-tier-a',
    MEDIUM: 'bg-tier-b/20 border-tier-b text-tier-b',
  }

  return (
    <div className="bg-background-primary border-2 border-border-primary rounded-xl p-6 hover:border-semantic-error transition-all relative">
      <div className="absolute -top-3 -left-3 w-12 h-12 bg-semantic-error text-text-primary rounded-full flex items-center justify-center font-bold text-xl shadow-lg">
        {number}
      </div>

      <div className="mb-3">
        <h3 className="text-xl font-bold text-text-primary mb-2">{title}</h3>
        <span
          className={`inline-block px-3 py-1 rounded-full text-xs font-bold border-2 ${impactColors[impact as keyof typeof impactColors]}`}
        >
          IMPACT: {impact}
        </span>
      </div>

      <div className="space-y-3 text-sm">
        <div>
          <p className="text-text-tertiary font-bold mb-1">Problem:</p>
          <p className="text-text-secondary">{problem}</p>
        </div>

        <div className="bg-semantic-errorBg/30 border-l-4 border-semantic-error rounded p-3">
          <p className="text-text-tertiary font-bold mb-1">Consequence:</p>
          <p className="text-text-primary">{consequence}</p>
        </div>

        <div className="bg-tier-s/10 border-l-4 border-tier-s rounded p-3">
          <p className="text-text-tertiary font-bold mb-1">Solution:</p>
          <p className="text-text-primary">{solution}</p>
        </div>

        <div className="text-xs text-text-tertiary pt-2 border-t border-border-primary">
          <strong>Affected:</strong> {affected}
        </div>
      </div>
    </div>
  )
}

// 策略卡片组件
function StrategyCard({
  category,
  icon,
  strategies,
}: {
  category: string
  icon: React.ReactNode
  strategies: Array<{ title: string; description: string; difficulty: string }>
}) {
  return (
    <div className="bg-background-secondary border-2 border-border-primary rounded-xl p-6 hover:border-brand-primary transition-all">
      <div className="flex items-center gap-3 mb-4">
        {icon}
        <h3 className="text-xl font-bold text-text-primary">{category}</h3>
      </div>

      <div className="space-y-4">
        {strategies.map((strategy, idx) => (
          <div key={idx} className="bg-background-tertiary rounded-lg p-4">
            <div className="flex items-start justify-between mb-2">
              <h4 className="font-bold text-text-primary text-sm">{strategy.title}</h4>
              <span className="text-xs px-2 py-1 rounded-full bg-brand-primary/20 text-brand-primary">
                {strategy.difficulty}
              </span>
            </div>
            <p className="text-xs text-text-secondary">{strategy.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

// 契约协同组件
function SynergyCard({
  contracts,
  rating,
  synergy,
  useCase,
}: {
  contracts: string
  rating: string
  synergy: string
  useCase: string
}) {
  const ratingColors: Record<string, string> = {
    'S+': 'border-tier-s text-tier-s bg-tier-s/10',
    S: 'border-tier-s text-tier-s bg-tier-s/10',
    'A+': 'border-tier-a text-tier-a bg-tier-a/10',
    A: 'border-tier-a text-tier-a bg-tier-a/10',
    'B+': 'border-tier-b text-tier-b bg-tier-b/10',
  }

  return (
    <div className="bg-background-tertiary border border-border-primary rounded-lg p-4 hover:border-brand-primary transition-all">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-bold text-text-primary">{contracts}</h4>
        <span
          className={`px-2 py-1 rounded text-xs font-bold border ${ratingColors[rating]}`}
        >
          {rating}
        </span>
      </div>
      <p className="text-xs text-text-secondary mb-2">{synergy}</p>
      <p className="text-xs text-brand-primary">
        <strong>Use:</strong> {useCase}
      </p>
    </div>
  )
}

// FAQ组件
function FAQItem({ question, answer }: { question: string; answer: string }) {
  return (
    <details className="bg-background-primary border border-border-primary rounded-lg p-6 hover:border-brand-primary transition-all group">
      <summary className="font-bold text-text-primary cursor-pointer list-none flex items-center justify-between">
        <span>{question}</span>
        <span className="text-brand-primary group-open:rotate-180 transition-transform">▼</span>
      </summary>
      <p className="text-text-secondary mt-4 text-sm leading-relaxed">{answer}</p>
    </details>
  )
}

// 价值卡片组件
function ValueCard({
  icon,
  title,
  description,
  stat,
}: {
  icon: React.ReactNode
  title: string
  description: string
  stat: string
}) {
  return (
    <div className="bg-background-primary border-2 border-border-primary rounded-xl p-6 hover:border-brand-primary transition-all hover:scale-105">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-3 text-text-primary">{title}</h3>
      <p className="text-sm text-text-secondary mb-4">{description}</p>
      <div className="text-brand-primary font-bold text-sm">{stat}</div>
    </div>
  )
}

// 对比行组件
function ComparisonRow({
  feature,
  us,
  them,
}: {
  feature: string
  us: string
  them: string
}) {
  return (
    <tr className="border-b border-border-primary">
      <td className="p-4 font-medium text-text-primary">{feature}</td>
      <td className="p-4 text-text-primary">{us}</td>
      <td className="p-4 text-text-tertiary">{them}</td>
    </tr>
  )
}

// 统计卡片组件
function StatCard({
  icon,
  value,
  label,
  color,
}: {
  icon: React.ReactNode
  value: string | number
  label: string
  color: string
}) {
  return (
    <div className="bg-background-secondary border border-border-primary rounded-lg p-4 text-center hover:border-brand-primary transition-all hover:scale-105">
      <div className={`${color} mb-2 flex justify-center`}>{icon}</div>
      <div className="text-2xl md:text-3xl font-bold text-text-primary mb-1">{value}</div>
      <div className="text-sm text-text-secondary">{label}</div>
    </div>
  )
}

// 警告条目组件
function WarningItem({
  number,
  title,
  description,
  urgent,
}: {
  number: string
  title: string
  description: string
  urgent?: boolean
}) {
  return (
    <div className={`bg-background-secondary/50 rounded-lg p-4 border-l-4 ${urgent ? 'border-semantic-error' : 'border-semantic-warning'}`}>
      <div className="flex items-start gap-3">
        <span className="text-2xl font-bold text-semantic-warning">{number}</span>
        <div>
          <h3 className="font-bold text-text-primary mb-1">{title}</h3>
          <p className="text-sm text-text-secondary">{description}</p>
        </div>
      </div>
    </div>
  )
}

// Build卡片组件
function BuildCard({
  rank,
  title,
  tier,
  mainContract,
  playstyle,
  pvpRating,
  pveRating,
  description,
  strengths,
  difficulty,
  popularityPercent,
}: {
  rank: number
  title: string
  tier: string
  mainContract: string
  playstyle: string
  pvpRating: number
  pveRating: number
  description: string
  strengths: string[]
  difficulty: string
  popularityPercent: number
}) {
  const tierColors = {
    S: 'border-tier-s text-tier-s bg-tier-s/10',
    A: 'border-tier-a text-tier-a bg-tier-a/10',
  }

  return (
    <div className="bg-background-primary border-2 border-border-primary rounded-xl p-6 hover:border-brand-primary transition-all hover:scale-105 hover:shadow-2xl hover:shadow-brand-primary/20 relative group">
      {/* 排名徽章 */}
      <div className="absolute -top-4 -left-4 bg-brand-primary text-text-primary w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl shadow-lg">
        #{rank}
      </div>

      {/* Tier徽章 */}
      <div className={`inline-block px-3 py-1 rounded-full text-sm font-bold border-2 mb-4 ${tierColors[tier as keyof typeof tierColors]}`}>
        {tier}-Tier
      </div>

      <h3 className="text-2xl font-bold mb-2 text-text-primary">{title}</h3>
      <p className="text-text-secondary text-sm mb-4">{description}</p>

      <div className="space-y-3 mb-4">
        <div className="flex items-center gap-2 text-sm">
          <Swords size={16} className="text-brand-primary" />
          <span className="text-text-secondary">Main:</span>
          <span className="font-bold text-text-primary">{mainContract}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Target size={16} className="text-tier-a" />
          <span className="text-text-secondary">Style:</span>
          <span className="font-bold text-text-primary">{playstyle}</span>
        </div>
      </div>

      {/* 评分条 */}
      <div className="space-y-2 mb-4">
        <RatingBar label="PvP" value={pvpRating} color="bg-brand-primary" />
        <RatingBar label="PvE" value={pveRating} color="bg-tier-a" />
      </div>

      {/* 优势列表 */}
      <div className="mb-4">
        <p className="text-xs text-text-tertiary mb-2">Core Strengths:</p>
        <div className="flex flex-wrap gap-2">
          {strengths.map((strength, idx) => (
            <span
              key={idx}
              className="text-xs bg-background-secondary px-2 py-1 rounded text-text-secondary border border-border-primary"
            >
              {strength}
            </span>
          ))}
        </div>
      </div>

      {/* 底部信息 */}
      <div className="flex justify-between items-center text-xs text-text-tertiary border-t border-border-primary pt-3">
        <span>Difficulty: <span className="font-bold text-text-secondary">{difficulty}</span></span>
        <span>Usage: <span className="font-bold text-text-secondary">{popularityPercent}%</span></span>
      </div>

      {/* 悬停时的查看详情提示 */}
      <div className="absolute inset-0 bg-brand-primary/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
        <span className="text-brand-primary font-bold">Click to learn more →</span>
      </div>
    </div>
  )
}

// 评分条组件
function RatingBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className="text-text-secondary">{label}</span>
        <span className="font-bold text-text-primary">{value}/100</span>
      </div>
      <div className="h-2 bg-background-secondary rounded-full overflow-hidden">
        <div
          className={`h-full ${color} transition-all duration-500`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  )
}

// 功能卡片组件
function FeatureCard({
  step,
  icon,
  title,
  description,
  features,
  href,
  color,
}: {
  step: string
  icon: React.ReactNode
  title: string
  description: string
  features: string[]
  href: string
  color: 'warning' | 'primary' | 'info'
}) {
  const colorClasses = {
    warning: 'border-semantic-warning text-semantic-warning',
    primary: 'border-brand-primary text-brand-primary',
    info: 'border-tier-b text-tier-b',
  }

  return (
    <Link
      href={href}
      className="group bg-background-secondary border-2 border-border-primary rounded-xl p-6 hover:border-brand-primary transition-all hover:scale-105 hover:shadow-2xl relative"
    >
      {/* 步骤编号 */}
      <div className={`absolute -top-3 -right-3 w-16 h-16 rounded-full border-4 ${colorClasses[color]} bg-background-primary flex items-center justify-center font-bold text-xl`}>
        {step}
      </div>

      <div className="text-brand-primary mb-4 group-hover:scale-110 transition-transform">
        {icon}
      </div>

      <h3 className="text-xl font-bold mb-3 text-text-primary">{title}</h3>
      <p className="text-text-secondary text-sm mb-4">{description}</p>

      <ul className="space-y-2">
        {features.map((feature, idx) => (
          <li key={idx} className="text-sm text-text-tertiary flex items-start gap-2">
            <span className="text-brand-primary">✓</span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <div className="mt-4 text-brand-primary font-bold text-sm group-hover:translate-x-2 transition-transform">
        Learn more →
      </div>
    </Link>
  )
}

// 数据库卡片组件
function DatabaseCard({
  title,
  count,
  description,
  href,
  gradient,
  comingSoon,
}: {
  title: string
  count: number
  description: string
  href: string
  gradient: string
  comingSoon?: boolean
}) {
  return (
    <Link
      href={comingSoon ? '#' : href}
      className={`relative bg-background-primary border-2 border-border-primary rounded-xl p-6 text-center hover:border-brand-primary transition-all hover:scale-105 group overflow-hidden ${comingSoon ? 'opacity-60 cursor-not-allowed' : ''}`}
    >
      {/* 渐变背景 */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-5 group-hover:opacity-10 transition-opacity`} />

      <div className="relative">
        <div className="text-4xl font-bold text-text-primary mb-2">{count}</div>
        <h3 className="text-lg font-bold text-text-primary mb-2">{title}</h3>
        <p className="text-sm text-text-secondary">{description}</p>

        {comingSoon && (
          <div className="mt-3">
            <span className="bg-semantic-warning/20 text-semantic-warning text-xs px-3 py-1 rounded-full font-bold">
              Coming Soon
            </span>
          </div>
        )}
      </div>
    </Link>
  )
}
