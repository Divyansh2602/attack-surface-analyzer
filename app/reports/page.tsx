"use client"

import DashboardHeader from "@/components/DashboardHeader"
import SidebarNav from "@/components/SidebarNav"
import { Download, FileText, Calendar } from "lucide-react"

export default function Reports() {
  const mockReports = [
    {
      id: 1,
      name: "example.com Security Report",
      date: "2024-01-15",
      vulnerabilities: 8,
      critical: 1,
      high: 3,
      status: "Completed",
    },
    {
      id: 2,
      name: "api.example.com Pentest Report",
      date: "2024-01-12",
      vulnerabilities: 5,
      critical: 0,
      high: 2,
      status: "Completed",
    },
    {
      id: 3,
      name: "admin.example.com Security Audit",
      date: "2024-01-10",
      vulnerabilities: 12,
      critical: 2,
      high: 5,
      status: "Completed",
    },
  ]

  return (
    <div className="flex h-screen bg-background text-foreground">
      <SidebarNav />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />
        <main className="flex-1 overflow-auto p-6 md:p-8">
          <div className="max-w-6xl">
            <h1 className="text-3xl font-bold mb-8">Security Reports</h1>

            {/* Generate New Report */}
            <div className="glassmorphism rounded-lg p-6 mb-8">
              <h2 className="text-lg font-bold mb-4">Generate New Report</h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="scan-url" className="block text-sm font-semibold mb-2">
                    Target URL
                  </label>
                  <input
                    id="scan-url"
                    type="text"
                    placeholder="example.com"
                    className="w-full px-4 py-2 bg-card border border-primary/20 rounded-lg text-foreground placeholder-foreground/40 focus:outline-none focus:border-primary/50"
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="scan-type" className="block text-sm font-semibold mb-2">
                      Scan Type
                    </label>
                    <select
                      id="scan-type"
                      className="w-full px-4 py-2 bg-card border border-primary/20 rounded-lg text-foreground focus:outline-none focus:border-primary/50"
                    >
                      <option>Full Scan</option>
                      <option>Quick Scan</option>
                      <option>API Scan</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="severity" className="block text-sm font-semibold mb-2">
                      Severity Filter
                    </label>
                    <select
                      id="severity"
                      className="w-full px-4 py-2 bg-card border border-primary/20 rounded-lg text-foreground focus:outline-none focus:border-primary/50"
                    >
                      <option>All Severity</option>
                      <option>Critical Only</option>
                      <option>High & Above</option>
                    </select>
                  </div>
                </div>
                <button className="w-full px-6 py-3 bg-primary text-background font-bold rounded-lg hover:bg-primary/90 transition">
                  Generate Security Report
                </button>
              </div>
            </div>

            {/* Reports List */}
            <div className="glassmorphism rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">Recent Reports</h2>
              <div className="space-y-4">
                {mockReports.map((report) => (
                  <div
                    key={report.id}
                    className="border border-primary/10 rounded-lg p-4 hover:bg-primary/5 transition flex items-center justify-between"
                  >
                    <div className="flex items-start gap-4 flex-1">
                      <FileText className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-bold">{report.name}</h3>
                        <div className="flex items-center gap-4 mt-2 text-sm text-foreground/60">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {report.date}
                          </div>
                          <span>
                            {report.vulnerabilities} vulnerabilities found
                          </span>
                          <div className="flex gap-2">
                            {report.critical > 0 && (
                              <span className="px-2 py-0.5 bg-critical/10 text-critical rounded text-xs">
                                {report.critical} Critical
                              </span>
                            )}
                            {report.high > 0 && (
                              <span className="px-2 py-0.5 bg-warning/10 text-warning rounded text-xs">
                                {report.high} High
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <button className="px-4 py-2 bg-primary/10 text-primary rounded hover:bg-primary/20 transition flex items-center gap-2">
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
