import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "CivicShield AI - Enterprise Cybersecurity Platform",
  description: "AI-powered vulnerability detection and attack surface analysis for enterprise security",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground">
        {children}
      </body>
    </html>
  )
}
