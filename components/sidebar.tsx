'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

interface NavItem {
  href: string
  label: string
  icon: string
}

const navItems: NavItem[] = [
  { href: '/dashboard', label: 'Dashboard', icon: '📊' },
  { href: '/scans', label: 'Scans', icon: '🔍' },
  { href: '/vulnerabilities', label: 'Vulnerabilities', icon: '⚠️' },
  { href: '/phishing', label: 'Phishing Check', icon: '🎣' },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-card border-r border-border flex flex-col">
      <div className="p-6 border-b border-border">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold">CS</span>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-foreground text-sm">CivicShield</span>
            <span className="text-xs text-muted-foreground">AI Security</span>
          </div>
        </Link>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-sm font-medium',
              pathname === item.href
                ? 'bg-primary/20 text-primary border border-primary/30'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
            )}
          >
            <span className="text-lg">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-border text-xs text-muted-foreground text-center">
        <p>CivicShield AI v1.0</p>
      </div>
    </aside>
  )
}
