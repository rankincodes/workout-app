import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/toaster'
import { cookies } from 'next/dist/client/components/headers'
import { redirect } from 'next/navigation'
import { IconSettings } from '@tabler/icons-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { createClient } from '@/lib/utils/supabase/client'
import { NavBarDropdown } from '@/components/ui/nav-dropdown'

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
      </body>
    </html>
  )
}
