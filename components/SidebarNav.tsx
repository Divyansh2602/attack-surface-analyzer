"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Shield, BarChart3, Network, Mail, Lock, AlertTriangle, FileText, Activity, Settings } from "lucide-react"
import { useState } from "react"

const navItems = [
  { name: "Dashboard", path: "/dashboard", icon: BarChart3 },
  { name: "Vulnerability Scanner", path: "/scanner", icon: AlertTriangle },
  { name: "Attack Surface", path: "/surface", icon: Network },
  { name: "Phishing Detection", path: "/phishing", icon: Mail },
  { name: "API Security", path: "/api-security", icon: Lock },
  { name: "Reports", path: "/reports", icon: FileText },
  { name: "Activity Logs", path: "/logs", icon: Activity },
  { name: "Settings", path: "/settings", icon: Settings },
]

export default function SidebarNav() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside
      className={`${
        collapsed ? "w-20" : "w-64"
      } border-r border-primary/10 bg-card/50 backdrop-blur-sm transition-all duration-300 flex flex-col hidden md:flex`}
    >
      {/* Header */}
      <div className="p-4 border-b border-primary/10 flex items-center justify-between">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-primary" />
            <span className="font-bold text-primary text-sm">CivicShield</span>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 hover:bg-primary/10 rounded transition"
        >
          {collapsed ? "→" : "←"}
        </button>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 py-6 space-y-2 px-4">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.path || pathname.startsWith(item.path)
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                isActive
                  ? "bg-primary/20 text-primary"
                  : "text-foreground/60 hover:bg-primary/10"
              }`}
              title={collapsed ? item.name : ""}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && <span className="text-sm font-medium">{item.name}</span>}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-primary/10">
        <div className={`text-xs text-foreground/40 ${collapsed ? "text-center" : ""}`}>
          {!collapsed && <p>CivicShield AI v1.0</p>}
        </div>
      </div>
    </aside>
  )
}
