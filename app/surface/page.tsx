"use client"

import DashboardHeader from "@/components/DashboardHeader"
import SidebarNav from "@/components/SidebarNav"
import { Globe, Server, Lock, Zap } from "lucide-react"

export default function AttackSurface() {
  // Mock network graph data
  const assets = {
    domains: 8,
    subdomains: 24,
    apis: 12,
    servers: 16,
    ports: 48,
    risky: 5,
  }

  const mockNodes = [
    { id: 1, label: "example.com", type: "domain", risky: false },
    { id: 2, label: "api.example.com", type: "subdomain", risky: false },
    { id: 3, label: "admin.example.com", type: "subdomain", risky: true },
    { id: 4, label: "cdn.example.com", type: "server", risky: false },
    { id: 5, label: "db.example.com", type: "server", risky: true },
    { id: 6, label: "POST /api/auth", type: "api", risky: false },
    { id: 7, label: "GET /admin/panel", type: "api", risky: true },
    { id: 8, label: "Port 3306 (MySQL)", type: "port", risky: true },
  ]

  return (
    <div className="flex h-screen bg-background text-foreground">
      <SidebarNav />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />
        <main className="flex-1 overflow-auto p-6 md:p-8">
          <div className="max-w-6xl">
            <h1 className="text-3xl font-bold mb-8">Attack Surface Analysis</h1>

            {/* Asset Summary */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="glassmorphism rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Globe className="w-6 h-6 text-primary" />
                  <span className="text-foreground/60 font-semibold">Domains Discovered</span>
                </div>
                <div className="text-3xl font-bold">{assets.domains}</div>
                <p className="text-sm text-foreground/60 mt-2">Primary + {assets.subdomains} subdomains</p>
              </div>

              <div className="glassmorphism rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Server className="w-6 h-6 text-primary" />
                  <span className="text-foreground/60 font-semibold">APIs Exposed</span>
                </div>
                <div className="text-3xl font-bold">{assets.apis}</div>
                <p className="text-sm text-foreground/60 mt-2">Active endpoints detected</p>
              </div>

              <div className="glassmorphism rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Zap className="w-6 h-6 text-critical" />
                  <span className="text-foreground/60 font-semibold">High-Risk Assets</span>
                </div>
                <div className="text-3xl font-bold text-critical">{assets.risky}</div>
                <p className="text-sm text-foreground/60 mt-2">Require immediate attention</p>
              </div>
            </div>

            {/* Attack Surface Map */}
            <div className="glassmorphism rounded-lg p-6 mb-8">
              <h2 className="text-xl font-bold mb-4">Attack Surface Map</h2>
              <div className="w-full h-96 bg-background/50 rounded-lg flex items-center justify-center border border-primary/10">
                <div className="text-center text-foreground/40">
                  <div className="mb-4">Interactive network visualization</div>
                  <div className="text-sm">
                    Showing {mockNodes.length} assets and {mockNodes.length * 1.5} connections
                  </div>
                </div>
              </div>
              <p className="text-xs text-foreground/50 mt-3">
                Red nodes indicate high-risk assets. Click and drag to explore connections.
              </p>
            </div>

            {/* Discovered Assets */}
            <div className="glassmorphism rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">Discovered Assets</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-primary/10">
                      <th className="px-4 py-3 text-left font-semibold text-foreground/60">Asset Name</th>
                      <th className="px-4 py-3 text-left font-semibold text-foreground/60">Type</th>
                      <th className="px-4 py-3 text-left font-semibold text-foreground/60">Risk Level</th>
                      <th className="px-4 py-3 text-left font-semibold text-foreground/60">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockNodes.map((node) => (
                      <tr key={node.id} className="border-b border-primary/5 hover:bg-primary/5 transition">
                        <td className="px-4 py-3 font-mono text-xs">{node.label}</td>
                        <td className="px-4 py-3">
                          <span className="inline-block px-2 py-1 bg-primary/10 text-primary rounded text-xs">
                            {node.type}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                              node.risky
                                ? "bg-critical/10 text-critical"
                                : "bg-primary/10 text-primary"
                            }`}
                          >
                            {node.risky ? "HIGH" : "LOW"}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div
                              className={`w-2 h-2 rounded-full ${
                                node.risky ? "bg-critical" : "bg-primary"
                              }`}
                            />
                            <span className="text-foreground/60">
                              {node.risky ? "At Risk" : "Monitored"}
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
