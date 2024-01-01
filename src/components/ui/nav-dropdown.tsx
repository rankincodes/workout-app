"use client"

import { IconSettings } from "@tabler/icons-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./dropdown-menu"
import { createClient } from "@/lib/utils/supabase/client"
import { useRouter } from "next/navigation"
import Link from "next/link"

export const NavBarDropdown: React.FC = () => {
    const router = useRouter()

    const signOut = async () => {
        const supabase = createClient()
        const { error } = await supabase.auth.signOut()
        router.refresh()
    }

    return (
        <DropdownMenu >
            <DropdownMenuTrigger className="p-2 px-4">
                <IconSettings color='gray' />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem asChild>
                    <Link onClick={() => signOut()} href="/login">Log out</Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}