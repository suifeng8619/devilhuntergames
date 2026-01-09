import Link from 'next/link'
import { MessageCircle, Mail } from 'lucide-react'
import { Github } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-background-secondary border-t border-border-primary">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <span className="text-xl font-bold text-brand-primary">
                Devil Hunter Games
              </span>
            </Link>
            <p className="text-text-secondary text-sm mb-4">
              Your ultimate decision support system for Roblox Devil Hunter. Make informed choices, avoid regrets, and dominate the game.
            </p>
            <div className="flex items-center space-x-4">
              <a
                href="https://discord.gg/devilhunter"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-tertiary hover:text-brand-primary transition-colors"
                aria-label="Join Discord"
              >
                <MessageCircle size={20} />
              </a>
              <a
                href="https://github.com/devilhunter"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-tertiary hover:text-brand-primary transition-colors"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a
                href="mailto:contact@devilhuntergames.com"
                className="text-text-tertiary hover:text-brand-primary transition-colors"
                aria-label="Contact Email"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-text-primary font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/quick-start"
                  className="text-text-secondary hover:text-brand-primary transition-colors text-sm"
                >
                  Quick Start Guide
                </Link>
              </li>
              <li>
                <Link
                  href="/builds/planner"
                  className="text-text-secondary hover:text-brand-primary transition-colors text-sm"
                >
                  Build Planner
                </Link>
              </li>
              <li>
                <Link
                  href="/database/contracts"
                  className="text-text-secondary hover:text-brand-primary transition-colors text-sm"
                >
                  Contracts Database
                </Link>
              </li>
              <li>
                <Link
                  href="/guides"
                  className="text-text-secondary hover:text-brand-primary transition-colors text-sm"
                >
                  All Guides
                </Link>
              </li>
            </ul>
          </div>

          {/* Database Links */}
          <div>
            <h3 className="text-text-primary font-semibold mb-4">Database</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/database/contracts"
                  className="text-text-secondary hover:text-brand-primary transition-colors text-sm"
                >
                  Contracts
                </Link>
              </li>
              <li>
                <Link
                  href="/database/talents"
                  className="text-text-secondary hover:text-brand-primary transition-colors text-sm"
                >
                  Fiend Talents
                </Link>
              </li>
              <li>
                <Link
                  href="/database/hybrids"
                  className="text-text-secondary hover:text-brand-primary transition-colors text-sm"
                >
                  Hybrids
                </Link>
              </li>
              <li>
                <Link
                  href="/database/raids"
                  className="text-text-secondary hover:text-brand-primary transition-colors text-sm"
                >
                  Raids & Devils
                </Link>
              </li>
              <li>
                <Link
                  href="/database/weapons"
                  className="text-text-secondary hover:text-brand-primary transition-colors text-sm"
                >
                  Weapons
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-border-primary">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-text-tertiary text-sm">
              © {new Date().getFullYear()} Devil Hunter Games. Not affiliated with Roblox or the game developers.
            </p>
            <div className="flex items-center space-x-6">
              <Link
                href="/privacy"
                className="text-text-tertiary hover:text-brand-primary transition-colors text-sm"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-text-tertiary hover:text-brand-primary transition-colors text-sm"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
