"use client"

import DashboardHeader from "@/components/DashboardHeader"
import SidebarNav from "@/components/SidebarNav"
import { AlertTriangle } from "lucide-react"

export default function PhishingDetection() {
  const mockPhishingAttempts = [
    {
      id: 1,
      sender: "noreply@paypal-update.com",
      subject: "Urgent: Verify Your Account",
      threat: 92,
      confidence: "Very High",
      action: "Blocked",
    },
    {
      id: 2,
      sender: "support@amazon-verify.xyz",
      subject: "Action Required: Update Payment",
      threat: 87,
      confidence: "Very High",
      action: "Blocked",
    },
    {
      id: 3,
      sender: "admin@company-internal.fake",
      subject: "Password Reset Required",
      threat: 78,
      confidence: "High",
      action: "Quarantined",
    },
    {
      id: 4,
      sender: "noreply@microsoft-security.net",
      subject: "Security Alert: Unusual Activity",
      threat: 65,
      confidence: "Medium",
      action: "Flagged",
    },
    {
      id: 5,
      sender: "support@apple-service.io",
      subject: "Confirm Your Apple ID",
      threat: 71,
      confidence: "High",
      action: "Blocked",
    },
  ]

  const getThreatColor = (threat: number) => {
    if (threat >= 80) return "text-critical"
    if (threat >= 60) return "text-warning"
    return "text-primary"
  }

  const getConfidenceColor = (confidence: string) => {
    if (confidence === "Very High") return "bg-critical/10 text-critical"
    if (confidence === "High") return "bg-warning/10 text-warning"
    return "bg-primary/10 text-primary"
  }

  return (
    <div className="flex h-screen bg-background text-foreground">
      <SidebarNav />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />
        <main className="flex-1 overflow-auto p-6 md:p-8">
          <div className="max-w-6xl">
            <h1 className="text-3xl font-bold mb-8">Phishing Detection</h1>

            {/* Stats */}
            <div className="grid md:grid-cols-4 gap-4 mb-8">
              <div className="glassmorphism rounded-lg p-6">
                <div className="text-sm text-foreground/60 font-semibold mb-2">Total Detected</div>
                <div className="text-3xl font-bold">{mockPhishingAttempts.length}</div>
              </div>
              <div className="glassmorphism rounded-lg p-6">
                <div className="text-sm text-foreground/60 font-semibold mb-2">Blocked</div>
                <div className="text-3xl font-bold text-critical">3</div>
              </div>
              <div className="glassmorphism rounded-lg p-6">
                <div className="text-sm text-foreground/60 font-semibold mb-2">Quarantined</div>
                <div className="text-3xl font-bold text-warning">1</div>
              </div>
              <div className="glassmorphism rounded-lg p-6">
                <div className="text-sm text-foreground/60 font-semibold mb-2">Flagged</div>
                <div className="text-3xl font-bold text-primary">1</div>
              </div>
            </div>

            {/* Suspicious Emails Table */}
            <div className="glassmorphism rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">Suspicious Emails</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-primary/10">
                      <th className="px-4 py-3 text-left font-semibold text-foreground/60">Sender Email</th>
                      <th className="px-4 py-3 text-left font-semibold text-foreground/60">Subject</th>
                      <th className="px-4 py-3 text-left font-semibold text-foreground/60">Threat Score</th>
                      <th className="px-4 py-3 text-left font-semibold text-foreground/60">Confidence</th>
                      <th className="px-4 py-3 text-left font-semibold text-foreground/60">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockPhishingAttempts.map((email) => (
                      <tr key={email.id} className="border-b border-primary/5 hover:bg-primary/5 transition">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4 text-warning flex-shrink-0" />
                            <code className="text-xs text-foreground/70">{email.sender}</code>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-foreground/80">{email.subject}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <span className={`font-bold ${getThreatColor(email.threat)}`}>
                              {email.threat}%
                            </span>
                            <div className="w-16 h-1 bg-background/50 rounded overflow-hidden">
                              <div
                                className={`h-full ${
                                  email.threat >= 80
                                    ? "bg-critical"
                                    : email.threat >= 60
                                    ? "bg-warning"
                                    : "bg-primary"
                                }`}
                                style={{ width: `${email.threat}%` }}
                              />
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-block px-2 py-1 rounded text-xs font-semibold ${getConfidenceColor(
                              email.confidence
                            )}`}
                          >
                            {email.confidence}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                              email.action === "Blocked"
                                ? "bg-critical/10 text-critical"
                                : email.action === "Quarantined"
                                ? "bg-warning/10 text-warning"
                                : "bg-primary/10 text-primary"
                            }`}
                          >
                            {email.action}
                          </span>
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
