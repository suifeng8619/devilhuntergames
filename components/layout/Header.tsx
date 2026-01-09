'use client'

import Link from 'next/link'
import { useState } from 'react'
import {
  Lightbulb,
  Wrench,
  Database,
  BookOpen,
  Menu,
  X,
  Search,
} from 'lucide-react'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-background-secondary/95 backdrop-blur border-b border-border-primary">
      <nav className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <span className="text-2xl font-bold text-brand-primary group-hover:text-brand-secondary transition-colors">
              Devil Hunter Games
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <NavLink href="/quick-start" icon={<Lightbulb size={18} />}>
              Quick Start
            </NavLink>
            <NavLink href="/builds/planner" icon={<Wrench size={18} />}>
              Build Planner
            </NavLink>
            <NavLink href="/database/contracts" icon={<Database size={18} />}>
              Database
            </NavLink>
            <NavLink href="/guides" icon={<BookOpen size={18} />}>
              Guides
            </NavLink>
          </div>

          {/* Search Button (Desktop) */}
          <button
            className="hidden md:flex items-center space-x-2 px-4 py-2 rounded-md bg-background-tertiary hover:bg-background-elevated border border-border-primary transition-colors"
            aria-label="Search"
          >
            <Search size={18} />
            <span className="text-sm text-text-secondary">Search</span>
            <kbd className="px-2 py-1 text-xs bg-background-primary rounded border border-border-secondary">
              Ctrl K
            </kbd>
          </button>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md hover:bg-background-tertiary transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2 border-t border-border-primary animate-slide-up">
            <MobileNavLink
              href="/quick-start"
              icon={<Lightbulb size={20} />}
              onClick={() => setMobileMenuOpen(false)}
            >
              Quick Start
            </MobileNavLink>
            <MobileNavLink
              href="/builds/planner"
              icon={<Wrench size={20} />}
              onClick={() => setMobileMenuOpen(false)}
            >
              Build Planner
            </MobileNavLink>
            <MobileNavLink
              href="/database/contracts"
              icon={<Database size={20} />}
              onClick={() => setMobileMenuOpen(false)}
            >
              Database
            </MobileNavLink>
            <MobileNavLink
              href="/guides"
              icon={<BookOpen size={20} />}
              onClick={() => setMobileMenuOpen(false)}
            >
              Guides
            </MobileNavLink>
          </div>
        )}
      </nav>
    </header>
  )
}

function NavLink({
  href,
  icon,
  children,
}: {
  href: string
  icon: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      className="flex items-center space-x-2 px-4 py-2 rounded-md hover:bg-background-tertiary transition-colors group"
    >
      <span className="text-brand-primary group-hover:text-brand-secondary transition-colors">
        {icon}
      </span>
      <span className="text-sm font-medium">{children}</span>
    </Link>
  )
}

function MobileNavLink({
  href,
  icon,
  children,
  onClick,
}: {
  href: string
  icon: React.ReactNode
  children: React.ReactNode
  onClick: () => void
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex items-center space-x-3 px-4 py-3 rounded-md hover:bg-background-tertiary transition-colors"
    >
      <span className="text-brand-primary">{icon}</span>
      <span className="font-medium">{children}</span>
    </Link>
  )
}
