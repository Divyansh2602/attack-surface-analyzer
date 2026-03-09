'use client'

import { useEffect, useState } from 'react'
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Button } from '@/components/button'
import Link from 'next/link'

interface DashboardData {
  total_scans: number
  total_vulns: number
  critical_risk: number
  high_risk: number
  medium_risk: number
  risk_score: number
  risk_label: string
  trend_labels: string[]
  trend_counts: number[]
  vuln_list: Array<{
    risk: string
    type: string
    url: string
    param: string
  }>
}

const getRiskColor = (risk: string) => {
  switch (risk.toLowerCase()) {
    case 'critical':
      return '#ef4444'
    case 'high':
      return '#f97316'
    case 'medium':
      return '#eab308'
    default:
      return '#22c55e'
  }
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

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await fetch('/api/dashboard')
        if (!response.ok) throw new Error('Failed to fetch dashboard')
        const result = await response.json()
        setData(result)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchDashboard()
    const interval = setInterval(fetchDashboard, 30000)
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="p-8">
        <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-4 text-destructive">
          <p className="font-medium">Dashboard Error</p>
          <p className="text-sm">{error || 'No data available'}</p>
        </div>
      </div>
    )
  }

  const trendData = data.trend_labels.map((label, idx) => ({
    date: label,
    scans: data.trend_counts[idx],
  }))

  const riskData = [
    { name: 'Critical', value: data.critical_risk, fill: '#ef4444' },
    { name: 'High', value: data.high_risk, fill: '#f97316' },
    { name: 'Medium', value: data.medium_risk, fill: '#eab308' },
  ]

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Dashboard</h2>
          <p className="text-muted-foreground mt-1">Real-time security metrics and insights</p>
        </div>
        <Link href="/scans">
          <Button>Start New Scan</Button>
        </Link>
      </div>

      {/* Risk Score Card */}
      <div className="bg-card border border-border rounded-lg p-8 shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-center justify-center">
            <div className="text-center">
              <div className={`inline-block w-32 h-32 rounded-full border-8 border-primary flex items-center justify-center relative`}>
                <div className="text-center">
                  <p className="text-5xl font-bold text-primary">{data.risk_score}</p>
                  <p className="text-xs text-muted-foreground">/ 100</p>
                </div>
              </div>
              <p className={`mt-4 text-lg font-bold ${getRiskTextColor(data.risk_label)}`}>
                {data.risk_label}
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-center space-y-4">
            <div>
              <p className="text-muted-foreground text-sm mb-2">Total Scans</p>
              <p className="text-4xl font-bold text-primary">{data.total_scans}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm mb-2">Total Vulnerabilities</p>
              <p className="text-4xl font-bold text-secondary">{data.total_vulns}</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
              <span className="text-muted-foreground">Critical</span>
              <span className="font-bold text-red-500">{data.critical_risk}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-orange-500/10 border border-orange-500/20 rounded-lg">
              <span className="text-muted-foreground">High</span>
              <span className="font-bold text-orange-500">{data.high_risk}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
              <span className="text-muted-foreground">Medium</span>
              <span className="font-bold text-yellow-500">{data.medium_risk}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Risk Distribution */}
        <div className="bg-card border border-border rounded-lg p-6 shadow-lg">
          <h3 className="text-lg font-bold text-foreground mb-6">Risk Distribution</h3>
          {data.total_vulns > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={riskData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {riskData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1a1a1a',
                    border: '1px solid #333',
                    borderRadius: '8px',
                    color: '#fff',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-64 flex items-center justify-center text-muted-foreground">
              No vulnerabilities found
            </div>
          )}
        </div>

        {/* 7-Day Trend */}
        <div className="bg-card border border-border rounded-lg p-6 shadow-lg">
          <h3 className="text-lg font-bold text-foreground mb-6">7-Day Scan Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="date" stroke="#666" style={{ fontSize: '12px' }} />
              <YAxis stroke="#666" style={{ fontSize: '12px' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1a1a1a',
                  border: '1px solid #333',
                  borderRadius: '8px',
                  color: '#fff',
                }}
              />
              <Line
                type="monotone"
                dataKey="scans"
                stroke="#00bfff"
                dot={false}
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Latest Vulnerabilities */}
      <div className="bg-card border border-border rounded-lg p-6 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-foreground">Latest Vulnerabilities</h3>
          <Link href="/vulnerabilities">
            <Button variant="outline" size="sm">View All</Button>
          </Link>
        </div>

        {data.vuln_list.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Risk</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Type</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">URL</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Parameter</th>
                </tr>
              </thead>
              <tbody>
                {data.vuln_list.slice(0, 10).map((vuln, idx) => (
                  <tr key={idx} className="border-b border-border hover:bg-muted/50 transition">
                    <td className="py-3 px-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${getRiskBgColor(vuln.risk)} ${getRiskTextColor(vuln.risk)}`}>
                        {vuln.risk.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono text-xs">{vuln.type}</td>
                    <td className="py-3 px-4 font-mono text-xs text-blue-400 break-all">{vuln.url}</td>
                    <td className="py-3 px-4 font-mono text-xs text-muted-foreground">{vuln.param || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <p>No vulnerabilities found</p>
          </div>
        )}
      </div>
    </div>
  )
}
