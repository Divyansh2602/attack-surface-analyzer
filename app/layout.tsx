import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'CivicShield AI - Cyber Security Platform',
  description: 'AI-powered vulnerability scanning and risk assessment platform',
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  )
}
