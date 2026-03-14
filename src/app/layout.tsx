import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Shaxsiy AI',
  description: 'Sizning shaxsiy AI assistantingiz',
  icons: { icon: '/favicon.svg' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uz" className="dark">
      <body>{children}</body>
    </html>
  )
}
