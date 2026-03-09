'use client'

import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/lib/store'
import { Button } from './button'

export function Header() {
  const router = useRouter()
  const { username, clearAuth } = useAuthStore()

  const handleLogout = () => {
    clearAuth()
    router.push('/login')
  }

  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-8">
      <div>
        <h1 className="text-xl font-bold text-foreground">Security Center</h1>
        <p className="text-xs text-muted-foreground">
          Monitor and analyze your security posture
        </p>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-sm font-medium text-foreground">{username}</p>
          <p className="text-xs text-muted-foreground">User</p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLogout}
          className="ml-4"
        >
          Logout
        </Button>
      </div>
    </header>
  )
}
