"use client"

import DashboardHeader from "@/components/DashboardHeader"
import SidebarNav from "@/components/SidebarNav"
import { Lock, AlertCircle } from "lucide-react"

export default function APISecurity() {
  const mockAPIs = [
    {
      id: 1,
      endpoint: "POST /api/auth/login",
      method: "POST",
      requests: 2451,
      jwt: true,
      threat: 5,
    },
    {
      id: 2,
      endpoint: "GET /api/users/:id",
      method: "GET",
      requests: 5234,
      jwt: true,
      threat: 0,
    },
    {
      id: 3,
      endpoint: "DELETE /api/admin/users",
      method: "DELETE",
      requests: 145,
      jwt: false,
      threat: 23,
    },
    {
      id: 4,
      endpoint: "POST /api/payment/process",
      method: "POST",
      requests: 834,
      jwt: true,
      threat: 8,
    },
    {
      id: 5,
      endpoint: "GET /api/config",
      method: "GET",
      requests: 567,
      jwt: false,
      threat: 45,
    },
  ]

  return (
    <div className="flex h-screen bg-background text-foreground">
      <SidebarNav />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />
        <main className="flex-1 overflow-auto p-6 md:p-8">
          <div className="max-w-6xl">
            <h1 className="text-3xl font-bold mb-8">API Security Monitor</h1>

            {/* Metrics */}
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <div className="glassmorphism rounded-lg p-6">
                <div className="text-sm text-foreground/60 font-semibold mb-2">Total APIs</div>
                <div className="text-3xl font-bold">{mockAPIs.length}</div>
              </div>
              <div className="glassmorphism rounded-lg p-6">
                <div className="text-sm text-foreground/60 font-semibold mb-2">Protected (JWT)</div>
                <div className="text-3xl font-bold text-primary">3</div>
              </div>
              <div className="glassmorphism rounded-lg p-6">
                <div className="text-sm text-foreground/60 font-semibold mb-2">Unprotected</div>
                <div className="text-3xl font-bold text-critical">2</div>
              </div>
              <div className="glassmorphism rounded-lg p-6">
                <div className="text-sm text-foreground/60 font-semibold mb-2">Total Requests (24h)</div>
                <div className="text-3xl font-bold">9231</div>
              </div>
            </div>

            {/* APIs Table */}
            <div className="glassmorphism rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">API Endpoints</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-primary/10">
                      <th className="px-4 py-3 text-left font-semibold text-foreground/60">Endpoint</th>
                      <th className="px-4 py-3 text-left font-semibold text-foreground/60">Method</th>
                      <th className="px-4 py-3 text-left font-semibold text-foreground/60">Requests (24h)</th>
                      <th className="px-4 py-3 text-left font-semibold text-foreground/60">JWT Auth</th>
                      <th className="px-4 py-3 text-left font-semibold text-foreground/60">Threats</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockAPIs.map((api) => (
                      <tr key={api.id} className="border-b border-primary/5 hover:bg-primary/5 transition">
                        <td className="px-4 py-3">
                          <code className="text-xs bg-background/50 px-2 py-1 rounded">
                            {api.endpoint}
                          </code>
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-block px-2 py-1 rounded text-xs font-bold ${
                              api.method === "GET"
                                ? "bg-primary/10 text-primary"
                                : api.method === "POST"
                                ? "bg-warning/10 text-warning"
                                : "bg-critical/10 text-critical"
                            }`}
                          >
                            {api.method}
                          </span>
                        </td>
                        <td className="px-4 py-3 font-bold">{api.requests.toLocaleString()}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <Lock className={`w-4 h-4 ${api.jwt ? "text-primary" : "text-foreground/40"}`} />
                            <span className={api.jwt ? "text-primary" : "text-critical"}>
                              {api.jwt ? "Protected" : "Unprotected"}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            {api.threat > 0 && (
                              <AlertCircle className="w-4 h-4 text-critical" />
                            )}
                            <span className={api.threat > 0 ? "text-critical font-bold" : "text-foreground/60"}>
                              {api.threat}
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
