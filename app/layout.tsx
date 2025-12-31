import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import "animate.css"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Quantumult X Relay Convert',
  description: 'QX Relay Configurator',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased min-h-screen bg-background`}>{children}</body>
    </html>
  )
}
