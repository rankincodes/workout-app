import { createClient } from "@/lib/utils/supabase/server"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"


export default async function Logout() {
    console.log('logging out')
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)
    await supabase.auth.signOut({ scope: 'local' })

    redirect('/login')
}
