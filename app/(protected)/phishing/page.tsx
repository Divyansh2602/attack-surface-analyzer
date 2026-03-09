'use client'

import { useState } from 'react'
import { Button } from '@/components/button'
import { phishingAPI } from '@/lib/api'

interface PhishingResult {
  url: string
  is_phishing: boolean
  confidence: number
  reasons: string[]
  timestamp?: string
}

export default function PhishingPage() {
  const [urlInput, setUrlInput] = useState('')
  const [results, setResults] = useState<PhishingResult[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleCheckPhishing = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    if (!urlInput.startsWith('http')) {
      setError('URL must start with http:// or https://')
      setLoading(false)
      return
    }

    try {
      const response = await phishingAPI.checkPhishing(urlInput)
      const newResult: PhishingResult = {
        ...response.data,
        url: urlInput,
        timestamp: new Date().toLocaleString(),
      }
      setResults([newResult, ...results])
      setUrlInput('')
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to check URL')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-8 space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Phishing Detection</h2>
        <p className="text-muted-foreground mt-1">Check URLs for phishing threats</p>
      </div>

      {/* Check Form */}
      <div className="bg-card border border-border rounded-lg p-6 shadow-lg">
        <h3 className="text-lg font-bold text-foreground mb-6">Check URL</h3>
        <form onSubmit={handleCheckPhishing} className="space-y-4">
          <div className="flex gap-4">
            <input
              type="url"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="https://example.com"
              required
              className="flex-1 px-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <Button type="submit" disabled={loading || !urlInput}>
              {loading ? 'Checking...' : 'Check URL'}
            </Button>
          </div>
          {error && (
            <div className="p-3 bg-destructive/10 border border-destructive/30 rounded-lg text-destructive text-sm">
              {error}
            </div>
          )}
        </form>
      </div>

      {/* Results */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-foreground">Check History</h3>
        {results.length === 0 ? (
          <div className="bg-card border border-border rounded-lg p-8 text-center text-muted-foreground">
            <p>No checks yet. Start checking URLs above!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {results.map((result, idx) => (
              <div
                key={idx}
                className={`bg-card border rounded-lg p-4 ${
                  result.is_phishing
                    ? 'border-destructive/30 bg-destructive/5'
                    : 'border-green-500/30 bg-green-500/5'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${
                          result.is_phishing
                            ? 'bg-destructive/20 border-destructive/30 text-destructive'
                            : 'bg-green-500/20 border-green-500/30 text-green-500'
                        }`}
                      >
                        {result.is_phishing ? '⚠️ PHISHING' : '✓ SAFE'}
                      </span>
                      <span className="text-foreground font-medium">Confidence: {(result.confidence * 100).toFixed(1)}%</span>
                    </div>
                    <p className="text-sm text-muted-foreground font-mono break-all mb-2">
                      {result.url}
                    </p>
                    {result.timestamp && (
                      <p className="text-xs text-muted-foreground">
                        Checked: {result.timestamp}
                      </p>
                    )}
                  </div>
                </div>

                {result.reasons && result.reasons.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-border">
                    <p className="text-xs font-medium text-muted-foreground mb-2">Reasons:</p>
                    <ul className="space-y-1">
                      {result.reasons.map((reason, ridx) => (
                        <li key={ridx} className="text-xs text-muted-foreground flex items-start gap-2">
                          <span className="text-primary mt-0.5">→</span>
                          {reason}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Info Card */}
      <div className="bg-secondary/10 border border-secondary/30 rounded-lg p-6">
        <h3 className="text-lg font-bold text-foreground mb-3">About Phishing Detection</h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="text-secondary mt-1">•</span>
            <span>Analyzes URL patterns and domain structure</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-secondary mt-1">•</span>
            <span>Detects suspicious indicators like typosquatting</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-secondary mt-1">•</span>
            <span>Checks against known phishing patterns</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-secondary mt-1">•</span>
            <span>Confidence scores indicate detection reliability</span>
          </li>
        </ul>
      </div>
    </div>
  )
}
