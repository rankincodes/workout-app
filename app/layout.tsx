import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/toaster'
import { Analytics } from '@vercel/analytics/react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Some Workout App',
  description: 'Go to the gym',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {


  return (
    <html lang="en">
      <body className={`${inter.className} h-dvh`}>
        {children}
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}
