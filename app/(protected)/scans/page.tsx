'use client'

import { useState } from 'react'
import { Button } from '@/components/button'
import { scanAPI } from '@/lib/api'

interface ScanState {
  id: number
  status: 'queued' | 'running' | 'completed' | 'failed'
  result?: any
  error?: string
}

export default function ScansPage() {
  const [targetUrl, setTargetUrl] = useState('')
  const [scans, setScans] = useState<ScanState[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleStartScan = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    if (!targetUrl.startsWith('http')) {
      setError('URL must start with http:// or https://')
      setLoading(false)
      return
    }

    try {
      const response = await scanAPI.startScan(targetUrl)
      const newScan: ScanState = {
        id: response.data.scan_id,
        status: 'queued',
      }
      setScans([newScan, ...scans])
      setTargetUrl('')

      // Poll for status updates
      const pollInterval = setInterval(async () => {
        try {
          const statusResponse = await scanAPI.getScanStatus(response.data.scan_id)
          setScans((prev) =>
            prev.map((scan) =>
              scan.id === response.data.scan_id
                ? {
                    ...scan,
                    status: statusResponse.data.status,
                    result: statusResponse.data.result,
                    error: statusResponse.data.error,
                  }
                : scan
            )
          )

          if (statusResponse.data.status === 'completed' || statusResponse.data.status === 'failed') {
            clearInterval(pollInterval)
          }
        } catch (err) {
          clearInterval(pollInterval)
        }
      }, 2000)
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to start scan')
    } finally {
      setLoading(false)
    }
  }

  const handleDownloadReport = async (scanId: number) => {
    try {
      const response = await scanAPI.generateReport(scanId)
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `report_${scanId}.pdf`)
      document.body.appendChild(link)
      link.click()
      link.parentNode?.removeChild(link)
    } catch (err: any) {
      alert(err.response?.data?.detail || 'Failed to download report')
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'queued':
        return 'bg-yellow-500/20 border-yellow-500/30 text-yellow-500'
      case 'running':
        return 'bg-blue-500/20 border-blue-500/30 text-blue-500'
      case 'completed':
        return 'bg-green-500/20 border-green-500/30 text-green-500'
      case 'failed':
        return 'bg-red-500/20 border-red-500/30 text-red-500'
      default:
        return 'bg-gray-500/20 border-gray-500/30 text-gray-500'
    }
  }

  return (
    <div className="p-8 space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Vulnerability Scans</h2>
        <p className="text-muted-foreground mt-1">Launch new scans and monitor existing ones</p>
      </div>

      {/* Start Scan Form */}
      <div className="bg-card border border-border rounded-lg p-6 shadow-lg">
        <h3 className="text-lg font-bold text-foreground mb-6">Start New Scan</h3>
        <form onSubmit={handleStartScan} className="space-y-4">
          <div className="flex gap-4">
            <input
              type="url"
              value={targetUrl}
              onChange={(e) => setTargetUrl(e.target.value)}
              placeholder="https://example.com"
              required
              className="flex-1 px-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <Button type="submit" disabled={loading || !targetUrl}>
              {loading ? 'Scanning...' : 'Start Scan'}
            </Button>
          </div>
          {error && (
            <div className="p-3 bg-destructive/10 border border-destructive/30 rounded-lg text-destructive text-sm">
              {error}
            </div>
          )}
        </form>
      </div>

      {/* Scans List */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-foreground">Recent Scans</h3>
        {scans.length === 0 ? (
          <div className="bg-card border border-border rounded-lg p-8 text-center text-muted-foreground">
            <p>No scans yet. Start one above to get began!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {scans.map((scan) => (
              <div key={scan.id} className="bg-card border border-border rounded-lg p-4 hover:border-border-bright transition">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(scan.status)}`}>
                        {scan.status.toUpperCase()}
                      </span>
                      <span className="text-foreground font-medium">Scan #{scan.id}</span>
                    </div>
                    {scan.result && (
                      <p className="text-sm text-muted-foreground">
                        Target: {scan.result.target}
                        {scan.result.findings && ` • ${scan.result.findings.length} findings`}
                      </p>
                    )}
                    {scan.error && (
                      <p className="text-sm text-destructive">Error: {scan.error}</p>
                    )}
                  </div>
                  {scan.status === 'completed' && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDownloadReport(scan.id)}
                    >
                      Download Report
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
