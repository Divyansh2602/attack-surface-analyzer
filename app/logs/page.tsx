"use client"

import DashboardHeader from "@/components/DashboardHeader"
import SidebarNav from "@/components/SidebarNav"
import { Search, Filter } from "lucide-react"

export default function ActivityLogs() {
  const mockLogs = [
    {
      id: 1,
      timestamp: "2024-01-15 14:23:45",
      type: "SQL Injection",
      severity: "Critical",
      ip: "192.168.1.1",
      description: "Attempted SQL injection detected on login endpoint",
    },
    {
      id: 2,
      timestamp: "2024-01-15 14:15:22",
      type: "XSS Attack",
      severity: "High",
      ip: "10.0.0.5",
      description: "Cross-site scripting attempt blocked",
    },
    {
      id: 3,
      timestamp: "2024-01-15 14:05:33",
      type: "Unauthorized Access",
      severity: "High",
      ip: "172.16.0.10",
      description: "Unauthorized API access attempt",
    },
    {
      id: 4,
      timestamp: "2024-01-15 13:58:12",
      type: "Phishing Email",
      severity: "Medium",
      ip: "203.0.113.45",
      description: "Phishing email detected and quarantined",
    },
    {
      id: 5,
      timestamp: "2024-01-15 13:42:08",
      type: "Configuration Issue",
      severity: "Medium",
      ip: "192.0.2.1",
      description: "Security misconfiguration detected on API server",
    },
  ]

  const getSeverityColor = (severity: string) => {
    if (severity === "Critical") return "bg-critical/10 text-critical"
    if (severity === "High") return "bg-warning/10 text-warning"
    return "bg-primary/10 text-primary"
  }

  return (
    <div className="flex h-screen bg-background text-foreground">
      <SidebarNav />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />
        <main className="flex-1 overflow-auto p-6 md:p-8">
          <div className="max-w-6xl">
            <h1 className="text-3xl font-bold mb-8">Activity Logs</h1>

            {/* Filters */}
            <div className="glassmorphism rounded-lg p-6 mb-8">
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="search" className="block text-sm font-semibold mb-2">
                    Search Logs
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
                    <input
                      id="search"
                      type="text"
                      placeholder="Search by IP, type, or description..."
                      className="w-full pl-10 pr-4 py-2 bg-card border border-primary/20 rounded-lg text-foreground placeholder-foreground/40 focus:outline-none focus:border-primary/50"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="threat-type" className="block text-sm font-semibold mb-2">
                    Threat Type
                  </label>
                  <select
                    id="threat-type"
                    className="w-full px-4 py-2 bg-card border border-primary/20 rounded-lg text-foreground focus:outline-none focus:border-primary/50"
                  >
                    <option>All Types</option>
                    <option>SQL Injection</option>
                    <option>XSS Attack</option>
                    <option>Unauthorized Access</option>
                    <option>Phishing</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="severity-filter" className="block text-sm font-semibold mb-2">
                    Severity Filter
                  </label>
                  <select
                    id="severity-filter"
                    className="w-full px-4 py-2 bg-card border border-primary/20 rounded-lg text-foreground focus:outline-none focus:border-primary/50"
                  >
                    <option>All Severity</option>
                    <option>Critical</option>
                    <option>High</option>
                    <option>Medium</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Logs Table */}
            <div className="glassmorphism rounded-lg p-6">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-primary/10">
                      <th className="px-4 py-3 text-left font-semibold text-foreground/60">Timestamp</th>
                      <th className="px-4 py-3 text-left font-semibold text-foreground/60">Threat Type</th>
                      <th className="px-4 py-3 text-left font-semibold text-foreground/60">Severity</th>
                      <th className="px-4 py-3 text-left font-semibold text-foreground/60">Source IP</th>
                      <th className="px-4 py-3 text-left font-semibold text-foreground/60">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockLogs.map((log) => (
                      <tr key={log.id} className="border-b border-primary/5 hover:bg-primary/5 transition">
                        <td className="px-4 py-3 text-sm text-foreground/70">
                          {log.timestamp}
                        </td>
                        <td className="px-4 py-3 font-semibold">{log.type}</td>
                        <td className="px-4 py-3">
                          <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${getSeverityColor(log.severity)}`}>
                            {log.severity}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <code className="text-xs bg-background/50 px-2 py-1 rounded">
                            {log.ip}
                          </code>
                        </td>
                        <td className="px-4 py-3 text-foreground/70">
                          {log.description}
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
