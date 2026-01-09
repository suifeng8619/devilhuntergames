import { AlertTriangle, Wrench, Database, Lightbulb } from 'lucide-react'

export default function Home() {
  return (
    <main className="min-h-screen px-4 md:px-8 lg:px-16 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-brand-primary">
            Devil Hunter Games
          </h1>
          <p className="text-xl md:text-2xl text-text-secondary">
            Your ultimate decision support system
          </p>
        </header>

        {/* Warning Banner */}
        <div className="bg-semantic-warningBg border-2 border-semantic-warning rounded-lg p-6 mb-12 animate-slide-up">
          <div className="flex items-start gap-4">
            <AlertTriangle className="text-semantic-warning flex-shrink-0 animate-pulse-slow" size={24} />
            <div>
              <h2 className="text-xl font-bold text-semantic-warning mb-2">
                New Player Warning: Don't make these mistakes on Day 1!
              </h2>
              <ul className="text-text-primary space-y-2">
                <li>✓ Redeem 275K Yen codes</li>
                <li>✓ Get Fox Devil contract (free B-tier)</li>
                <li>✓ Join Discord for updates</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quick Access */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Lightbulb size={24} className="text-brand-primary" />
            Quick Start
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <QuickAccessCard
              icon={<Lightbulb size={32} />}
              title="New Player Guide"
              description="Avoid regrets with our essential Day 1 checklist"
              href="/quick-start"
            />
            <QuickAccessCard
              icon={<Wrench size={32} />}
              title="Build Planner"
              description="Generate optimal builds in 30 seconds"
              href="/builds/planner"
            />
            <QuickAccessCard
              icon={<Database size={32} />}
              title="Contract Database"
              description="Complete contract data with tier rankings"
              href="/database/contracts"
            />
          </div>
        </section>

        {/* Database Links */}
        <section>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Database size={24} className="text-brand-primary" />
            Game Database
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <DatabaseLink title="Contracts" href="/database/contracts" />
            <DatabaseLink title="Talents" href="/database/talents" />
            <DatabaseLink title="Hybrids" href="/database/hybrids" />
            <DatabaseLink title="Raids" href="/database/raids" />
          </div>
        </section>
      </div>
    </main>
  )
}

function QuickAccessCard({
  icon,
  title,
  description,
  href,
}: {
  icon: React.ReactNode
  title: string
  description: string
  href: string
}) {
  return (
    <a
      href={href}
      className="group bg-background-secondary border border-border-primary rounded-lg p-6 hover:border-brand-primary hover:shadow-xl hover:shadow-brand-primary/10 transition-all duration-300"
    >
      <div className="text-brand-primary mb-4 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-text-secondary text-sm">{description}</p>
    </a>
  )
}

function DatabaseLink({ title, href }: { title: string; href: string }) {
  return (
    <a
      href={href}
      className="bg-background-secondary border border-border-primary rounded-lg p-4 text-center hover:border-border-secondary hover:bg-background-tertiary transition-colors"
    >
      <span className="text-text-primary font-medium">{title}</span>
    </a>
  )
}
