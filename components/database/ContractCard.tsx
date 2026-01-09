import Link from 'next/link'
import { Shield, Swords, Target } from 'lucide-react'
import type { Contract } from '@/types/contract'

interface ContractCardProps {
  contract: Contract
}

export default function ContractCard({ contract }: ContractCardProps) {
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

  return (
    <Link href={`/database/contracts/${contract.id}`}>
      <div className="group relative bg-background-secondary rounded-lg border border-border-primary hover:border-brand-primary transition-all duration-300 overflow-hidden h-full">
        {/* Tier Badge */}
        <div className="absolute top-4 right-4 z-10">
          <span
            className={`inline-flex items-center px-3 py-1 rounded-md text-xs font-bold border-2 ${getTierColor(
              contract.tier
            )}`}
          >
            {contract.tier}-Tier
          </span>
        </div>

        <div className="p-6">
          {/* Header */}
          <div className="mb-4">
            <h3 className="text-xl font-bold text-text-primary group-hover:text-brand-primary transition-colors mb-2">
              {contract.name}
            </h3>
            <p className="text-text-secondary text-sm line-clamp-2">
              {contract.description}
            </p>
          </div>

          {/* Ratings */}
          <div className="flex items-center gap-4 mb-4 pb-4 border-b border-border-primary">
            <div className="flex items-center gap-2">
              <Swords size={16} className="text-text-tertiary" />
              <span className="text-xs text-text-tertiary">PvP:</span>
              <span className={`text-sm font-semibold ${getRatingColor(contract.rating.pvp)}`}>
                {contract.rating.pvp}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Target size={16} className="text-text-tertiary" />
              <span className="text-xs text-text-tertiary">PvE:</span>
              <span className={`text-sm font-semibold ${getRatingColor(contract.rating.pve)}`}>
                {contract.rating.pve}
              </span>
            </div>
          </div>

          {/* Abilities Preview */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Shield size={14} className="text-brand-primary" />
              <span className="text-xs font-semibold text-text-secondary">
                Abilities ({contract.abilities.length})
              </span>
            </div>
            <div className="space-y-1">
              {contract.abilities.slice(0, 2).map((ability, index) => (
                <div key={index} className="text-xs text-text-tertiary">
                  • {ability.name}
                </div>
              ))}
              {contract.abilities.length > 2 && (
                <div className="text-xs text-brand-primary">
                  +{contract.abilities.length - 2} more...
                </div>
              )}
            </div>
          </div>

          {/* Meta Info */}
          {contract.meta && (
            <div className="pt-4 border-t border-border-primary">
              <div className="flex items-center justify-between text-xs">
                <span className="text-text-tertiary">Newbie Friendly</span>
                <div className="flex items-center gap-1">
                  {[...Array(10)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-full ${
                        i < contract.meta.newbieFriendly
                          ? 'bg-brand-primary'
                          : 'bg-background-tertiary'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Hover Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/0 to-brand-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      </div>
    </Link>
  )
}
