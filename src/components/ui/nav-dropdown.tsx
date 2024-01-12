"use client"

import { IconSettings } from "@tabler/icons-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./dropdown-menu"
import Link from "next/link"

export const NavBarDropdown: React.FC = () => {
    return (
        <DropdownMenu >
            <DropdownMenuTrigger className="p-2 px-4">
                <IconSettings color='gray' />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem asChild>
                    <Link href="/logout">Log out</Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}