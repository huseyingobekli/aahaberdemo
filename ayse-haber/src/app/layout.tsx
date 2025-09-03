import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../App.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AA Haber - Küresel Isınma ve Kuraklık',
  description: 'Bitlis\'teki göllerde su seviyesi düşüşü',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
