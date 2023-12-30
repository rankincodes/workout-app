'use server'

import { cookies } from "next/headers"
import { createClient } from "./utils/supabase/server"

export async function createExercise(exercise: any) {
    const cookieStore = cookies()

    const supabase = createClient(cookieStore)

    const { data } = await supabase.auth.getSession()
    const { } = await supabase.auth.getUser(data.session?.user.id)

    const { error } = await supabase
        .from('exercises')
        .insert({
            ...exercise,
            user_id: data.session?.user.id
        })
}