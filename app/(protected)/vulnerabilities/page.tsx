'use client'

import { useEffect, useState } from 'react'

interface Vulnerability {
  id: number
  scan_id: number
  risk: string
  vuln_type: string
  url: string
  param: string
  payload: string
  evidence: string
}

const getRiskBgColor = (risk: string) => {
  switch (risk.toLowerCase()) {
    case 'critical':
      return 'bg-red-500/20 border-red-500/30'
    case 'high':
      return 'bg-orange-500/20 border-orange-500/30'
    case 'medium':
      return 'bg-yellow-500/20 border-yellow-500/30'
    default:
      return 'bg-green-500/20 border-green-500/30'
  }
}

const getRiskTextColor = (risk: string) => {
  switch (risk.toLowerCase()) {
    case 'critical':
      return 'text-red-500'
    case 'high':
      return 'text-orange-500'
    case 'medium':
      return 'text-yellow-500'
    default:
      return 'text-green-500'
  }
}

export default function VulnerabilitiesPage() {
  const [vulnerabilities, setVulnerabilities] = useState<Vulnerability[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedVuln, setSelectedVuln] = useState<Vulnerability | null>(null)
  const [filterRisk, setFilterRisk] = useState<string>('all')

  useEffect(() => {
    const fetchVulnerabilities = async () => {
      try {
        // This would call the backend API in a real implementation
        // For now, we'll show the structure
        setVulnerabilities([])
      } catch (err) {
        console.error('Failed to fetch vulnerabilities', err)
      } finally {
        setLoading(false)
      }
    }

    fetchVulnerabilities()
  }, [])

  const filteredVulns =
    filterRisk === 'all'
      ? vulnerabilities
      : vulnerabilities.filter((v) => v.risk.toLowerCase() === filterRisk.toLowerCase())

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
          <p className="text-muted-foreground">Loading vulnerabilities...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8 space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Vulnerabilities</h2>
        <p className="text-muted-foreground mt-1">All detected vulnerabilities across scans</p>
      </div>

      {/* Filter */}
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-foreground">Filter by Risk:</span>
          <div className="flex gap-2">
            {['all', 'critical', 'high', 'medium', 'low'].map((level) => (
              <button
                key={level}
                onClick={() => setFilterRisk(level)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filterRisk === level
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Vulnerabilities List or Details */}
      {selectedVuln ? (
        <div className="bg-card border border-border rounded-lg p-6 shadow-lg">
          <button
            onClick={() => setSelectedVuln(null)}
            className="text-primary hover:underline text-sm mb-4"
          >
            ← Back to list
          </button>
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-2xl font-bold text-foreground">{selectedVuln.vuln_type}</h3>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${getRiskBgColor(selectedVuln.risk)} ${getRiskTextColor(selectedVuln.risk)}`}>
                  {selectedVuln.risk.toUpperCase()}
                </span>
              </div>
              <p className="text-muted-foreground">Scan #{selectedVuln.scan_id}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-muted-foreground text-sm mb-2">URL</p>
                <p className="text-foreground font-mono text-sm break-all">{selectedVuln.url}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm mb-2">Parameter</p>
                <p className="text-foreground font-mono text-sm">{selectedVuln.param || '-'}</p>
              </div>
            </div>

            {selectedVuln.payload && (
              <div>
                <p className="text-muted-foreground text-sm mb-2">Payload</p>
                <pre className="bg-input border border-border rounded-lg p-3 overflow-x-auto text-xs text-foreground">
                  {selectedVuln.payload}
                </pre>
              </div>
            )}

            {selectedVuln.evidence && (
              <div>
                <p className="text-muted-foreground text-sm mb-2">Evidence</p>
                <pre className="bg-input border border-border rounded-lg p-3 overflow-x-auto text-xs text-foreground">
                  {selectedVuln.evidence}
                </pre>
              </div>
            )}
          </div>
        </div>
      ) : filteredVulns.length === 0 ? (
        <div className="bg-card border border-border rounded-lg p-8 text-center text-muted-foreground">
          <p>No vulnerabilities found</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredVulns.map((vuln) => (
            <div
              key={vuln.id}
              onClick={() => setSelectedVuln(vuln)}
              className="bg-card border border-border rounded-lg p-4 hover:border-primary transition cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${getRiskBgColor(vuln.risk)} ${getRiskTextColor(vuln.risk)}`}>
                      {vuln.risk.toUpperCase()}
                    </span>
                    <span className="text-foreground font-medium">{vuln.vuln_type}</span>
                  </div>
                  <p className="text-sm text-muted-foreground font-mono">{vuln.url}</p>
                </div>
                <span className="text-muted-foreground text-sm">→</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
