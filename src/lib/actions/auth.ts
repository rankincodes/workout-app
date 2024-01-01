"use server"

import { cookies, headers } from "next/headers"
import { createClient } from "../utils/supabase/server"
import { redirect } from "next/navigation"
import * as z from "zod"

export const signUp = async (data: any) => {
    const origin = headers().get('origin')
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    const { error } = await supabase.auth.signUp({
        ...data,
        options: {
            emailRedirectTo: `${origin}/auth/callback`,
        },
    })

    if (error) {
        return redirect('/login?message=Could not authenticate user')
    }

    return redirect('/login?message=Check email to continue sign in process')
}

export const signIn = async (data: any) => {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    const { error } = await supabase.auth.signInWithPassword({
        ...data,
    })

    if (error) {
        return redirect('/login?message=Could not authenticate user')
    }



    return redirect('/')
}