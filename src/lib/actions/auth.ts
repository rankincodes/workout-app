"use server"

import { cookies, headers } from "next/headers"
import { createClient } from "../utils/supabase/server"
import { redirect } from "next/navigation"
import { LoginFormSchema } from "../../../app/(auth)/login/page"
import * as z from "zod"

export const signUp = async (data: z.infer<typeof LoginFormSchema>) => {
    console.log('signUp')

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

  export const signIn = async (data: z.infer<typeof LoginFormSchema>) => {
    'use server'

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