'use client'

import { useState } from 'react'
import { Metadata } from 'next'
import { Wrench, Lightbulb, AlertTriangle, CheckCircle, Sparkles } from 'lucide-react'

// This will be a client component for interactivity
export default function BuildPlannerPage() {
  const [selectedPath, setSelectedPath] = useState<'human' | 'fiend' | 'hybrid' | null>(null)
  const [selectedPlaystyle, setSelectedPlaystyle] = useState<'pvp' | 'pve' | 'balanced' | null>(
    null
  )
  const [selectedContracts, setSelectedContracts] = useState<string[]>([])
  const [generatedBuild, setGeneratedBuild] = useState<any>(null)

  const handlePathSelect = (path: 'human' | 'fiend' | 'hybrid') => {
    setSelectedPath(path)
    setSelectedContracts([])
    setGeneratedBuild(null)
  }

  const handlePlaystyleSelect = (playstyle: 'pvp' | 'pve' | 'balanced') => {
    setSelectedPlaystyle(playstyle)
  }

  const handleGenerateBuild = () => {
    // TODO: Implement build generation logic
    // For now, just create a placeholder build
    if (!selectedPath || !selectedPlaystyle) return

    const placeholderBuild = {
      name: `${selectedPath.charAt(0).toUpperCase() + selectedPath.slice(1)} ${
        selectedPlaystyle.toUpperCase()
      } Build`,
      path: selectedPath,
      playstyle: selectedPlaystyle,
      rating: {
        pvp: selectedPlaystyle === 'pvp' ? 95 : selectedPlaystyle === 'balanced' ? 85 : 70,
        pve: selectedPlaystyle === 'pve' ? 95 : selectedPlaystyle === 'balanced' ? 85 : 70,
      },
      description: `Optimized ${selectedPath} build for ${selectedPlaystyle} gameplay`,
      strengths: ['High damage output', 'Good survivability', 'Versatile playstyle'],
      weaknesses: ['Requires good timing', 'Resource intensive'],
    }

    setGeneratedBuild(placeholderBuild)
  }

  return (
    <div className="min-h-screen bg-background-primary">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-background-secondary to-background-primary border-b border-border-primary">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16">
          <div className="flex items-center gap-3 mb-4">
            <Wrench className="text-brand-primary" size={32} />
            <h1 className="text-3xl md:text-4xl font-bold text-text-primary">Build Planner</h1>
          </div>
          <p className="text-text-secondary text-lg max-w-3xl">
            Generate optimized builds in 30 seconds. Choose your path, playstyle, and let our
            planner recommend the best contract/talent combinations.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Build Creator */}
          <div className="lg:col-span-2 space-y-8">
            {/* Step 1: Path Selection */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-primary text-text-primary font-bold text-sm">
                  1
                </div>
                <h2 className="text-xl font-bold text-text-primary">Choose Your Path</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Human Path */}
                <button
                  onClick={() => handlePathSelect('human')}
                  className={`group relative bg-background-secondary rounded-lg p-6 border-2 transition-all ${
                    selectedPath === 'human'
                      ? 'border-brand-primary bg-brand-primary/5'
                      : 'border-border-primary hover:border-brand-primary/50'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-3xl mb-3">👤</div>
                    <h3 className="text-lg font-bold text-text-primary mb-2">Human</h3>
                    <p className="text-sm text-text-secondary mb-3">
                      Flexible contract system (max 3)
                    </p>
                    <div className="space-y-1 text-xs text-text-tertiary">
                      <div>✓ Swap contracts anytime</div>
                      <div>✓ Mix and match abilities</div>
                      <div>✓ Versatile playstyle</div>
                    </div>
                  </div>
                  {selectedPath === 'human' && (
                    <div className="absolute top-2 right-2">
                      <CheckCircle className="text-brand-primary" size={20} />
                    </div>
                  )}
                </button>

                {/* Fiend Path */}
                <button
                  onClick={() => handlePathSelect('fiend')}
                  className={`group relative bg-background-secondary rounded-lg p-6 border-2 transition-all ${
                    selectedPath === 'fiend'
                      ? 'border-brand-primary bg-brand-primary/5'
                      : 'border-border-primary hover:border-brand-primary/50'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-3xl mb-3">👹</div>
                    <h3 className="text-lg font-bold text-text-primary mb-2">Fiend</h3>
                    <p className="text-sm text-text-secondary mb-3">
                      Permanent talents (4-5 slots)
                    </p>
                    <div className="space-y-1 text-xs text-text-tertiary">
                      <div>✓ Powerful passive abilities</div>
                      <div>✓ Stat bonuses</div>
                      <div>⚠ Can't remove talents</div>
                    </div>
                  </div>
                  {selectedPath === 'fiend' && (
                    <div className="absolute top-2 right-2">
                      <CheckCircle className="text-brand-primary" size={20} />
                    </div>
                  )}
                </button>

                {/* Hybrid Path */}
                <button
                  onClick={() => handlePathSelect('hybrid')}
                  className={`group relative bg-background-secondary rounded-lg p-6 border-2 transition-all ${
                    selectedPath === 'hybrid'
                      ? 'border-brand-primary bg-brand-primary/5'
                      : 'border-border-primary hover:border-brand-primary/50'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-3xl mb-3">⚡</div>
                    <h3 className="text-lg font-bold text-text-primary mb-2">Hybrid</h3>
                    <p className="text-sm text-text-secondary mb-3">
                      Transform into devil form
                    </p>
                    <div className="space-y-1 text-xs text-text-tertiary">
                      <div>✓ Powerful transformation</div>
                      <div>✓ Unique abilities</div>
                      <div>⚠ One-time choice</div>
                    </div>
                  </div>
                  {selectedPath === 'hybrid' && (
                    <div className="absolute top-2 right-2">
                      <CheckCircle className="text-brand-primary" size={20} />
                    </div>
                  )}
                </button>
              </div>

              {/* Path Warning */}
              {selectedPath === 'fiend' && (
                <div className="mt-4 bg-semantic-warningBg rounded-lg p-4 border border-semantic-warning">
                  <div className="flex items-start gap-3">
                    <AlertTriangle
                      className="text-semantic-warning flex-shrink-0 mt-0.5"
                      size={16}
                    />
                    <p className="text-sm text-text-secondary">
                      Fiend talents are PERMANENT. Plan carefully before equipping!
                    </p>
                  </div>
                </div>
              )}
              {selectedPath === 'hybrid' && (
                <div className="mt-4 bg-semantic-warningBg rounded-lg p-4 border border-semantic-warning">
                  <div className="flex items-start gap-3">
                    <AlertTriangle
                      className="text-semantic-warning flex-shrink-0 mt-0.5"
                      size={16}
                    />
                    <p className="text-sm text-text-secondary">
                      Hybrid form is a ONE-TIME choice. Cannot be changed or removed!
                    </p>
                  </div>
                </div>
              )}
            </section>

            {/* Step 2: Playstyle Selection */}
            {selectedPath && (
              <section className="animate-fade-in">
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-primary text-text-primary font-bold text-sm">
                    2
                  </div>
                  <h2 className="text-xl font-bold text-text-primary">Choose Your Playstyle</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* PvP */}
                  <button
                    onClick={() => handlePlaystyleSelect('pvp')}
                    className={`bg-background-secondary rounded-lg p-6 border-2 transition-all ${
                      selectedPlaystyle === 'pvp'
                        ? 'border-brand-primary bg-brand-primary/5'
                        : 'border-border-primary hover:border-brand-primary/50'
                    }`}
                  >
                    <div className="text-center">
                      <h3 className="text-lg font-bold text-text-primary mb-2">PvP Competitive</h3>
                      <p className="text-sm text-text-secondary">
                        Optimized for player vs player combat
                      </p>
                    </div>
                  </button>

                  {/* PvE */}
                  <button
                    onClick={() => handlePlaystyleSelect('pve')}
                    className={`bg-background-secondary rounded-lg p-6 border-2 transition-all ${
                      selectedPlaystyle === 'pve'
                        ? 'border-brand-primary bg-brand-primary/5'
                        : 'border-border-primary hover:border-brand-primary/50'
                    }`}
                  >
                    <div className="text-center">
                      <h3 className="text-lg font-bold text-text-primary mb-2">PvE Farming</h3>
                      <p className="text-sm text-text-secondary">
                        Optimized for boss fights and grinding
                      </p>
                    </div>
                  </button>

                  {/* Balanced */}
                  <button
                    onClick={() => handlePlaystyleSelect('balanced')}
                    className={`bg-background-secondary rounded-lg p-6 border-2 transition-all ${
                      selectedPlaystyle === 'balanced'
                        ? 'border-brand-primary bg-brand-primary/5'
                        : 'border-border-primary hover:border-brand-primary/50'
                    }`}
                  >
                    <div className="text-center">
                      <h3 className="text-lg font-bold text-text-primary mb-2">Balanced</h3>
                      <p className="text-sm text-text-secondary">Good at both PvP and PvE</p>
                    </div>
                  </button>
                </div>
              </section>
            )}

            {/* Step 3: Generate Build */}
            {selectedPath && selectedPlaystyle && (
              <section className="animate-fade-in">
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-primary text-text-primary font-bold text-sm">
                    3
                  </div>
                  <h2 className="text-xl font-bold text-text-primary">Generate Your Build</h2>
                </div>
                <button
                  onClick={handleGenerateBuild}
                  className="w-full bg-brand-primary hover:bg-brand-secondary text-text-primary font-bold py-4 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <Sparkles size={20} />
                  Generate Optimal Build
                </button>
              </section>
            )}

            {/* Generated Build Result */}
            {generatedBuild && (
              <section className="animate-fade-in">
                <div className="bg-background-secondary rounded-lg border-2 border-brand-primary p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Lightbulb className="text-brand-primary" size={24} />
                    <h2 className="text-2xl font-bold text-text-primary">
                      {generatedBuild.name}
                    </h2>
                  </div>
                  <p className="text-text-secondary mb-6">{generatedBuild.description}</p>

                  {/* Ratings */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-background-tertiary rounded-lg p-4 border border-border-primary">
                      <div className="text-sm text-text-tertiary mb-1">PvP Rating</div>
                      <div className="text-3xl font-bold text-tier-s">
                        {generatedBuild.rating.pvp}/100
                      </div>
                    </div>
                    <div className="bg-background-tertiary rounded-lg p-4 border border-border-primary">
                      <div className="text-sm text-text-tertiary mb-1">PvE Rating</div>
                      <div className="text-3xl font-bold text-tier-s">
                        {generatedBuild.rating.pve}/100
                      </div>
                    </div>
                  </div>

                  {/* Strengths & Weaknesses */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-text-primary mb-3">Strengths</h3>
                      <ul className="space-y-2">
                        {generatedBuild.strengths.map((strength: string, index: number) => (
                          <li key={index} className="flex items-start gap-2 text-sm text-text-secondary">
                            <CheckCircle className="text-semantic-success flex-shrink-0 mt-0.5" size={16} />
                            {strength}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-text-primary mb-3">Weaknesses</h3>
                      <ul className="space-y-2">
                        {generatedBuild.weaknesses.map((weakness: string, index: number) => (
                          <li key={index} className="flex items-start gap-2 text-sm text-text-secondary">
                            <AlertTriangle className="text-semantic-warning flex-shrink-0 mt-0.5" size={16} />
                            {weakness}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </section>
            )}
          </div>

          {/* Right Column - Tips & Info */}
          <div className="space-y-6">
            <div className="bg-background-secondary rounded-lg p-6 border border-border-primary sticky top-24">
              <div className="flex items-center gap-2 mb-4">
                <Lightbulb className="text-brand-primary" size={20} />
                <h3 className="text-lg font-bold text-text-primary">Quick Tips</h3>
              </div>
              <div className="space-y-4 text-sm text-text-secondary">
                <div>
                  <h4 className="text-text-primary font-semibold mb-1">Path Choice</h4>
                  <p>
                    Human is most flexible, Fiend is strongest late-game, Hybrid has unique
                    mechanics
                  </p>
                </div>
                <div>
                  <h4 className="text-text-primary font-semibold mb-1">PvP vs PvE</h4>
                  <p>
                    PvP builds focus on prediction and burst damage. PvE builds prioritize
                    sustained DPS and survivability
                  </p>
                </div>
                <div>
                  <h4 className="text-text-primary font-semibold mb-1">Experimentation</h4>
                  <p>
                    Don't be afraid to try different combinations! Human contracts can be swapped
                    freely
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
