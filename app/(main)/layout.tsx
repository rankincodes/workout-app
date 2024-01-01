import { Inter } from 'next/font/google'
import { NavBarDropdown } from '@/components/ui/nav-dropdown'

const inter = Inter({ subsets: ['latin'] })

export default function MainLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <div className="top-0 flex flex-row justify-between border-b w-screen">
                <h1 className="p-2 px-4">Go to the fucking gym</h1>
                <NavBarDropdown />
            </div>
            {children}
        </>

    )
}
