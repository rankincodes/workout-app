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

export default function MainLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="top-0 flex flex-row justify-between border-b w-screen">
            <h1 className="p-2 px-4">Go to the fucking gym</h1>
            <NavBarDropdown />
            {children}
        </div>
    )
}
