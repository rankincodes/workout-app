'use server'
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!)

export async function createExercise() {
    const { error } = await supabase
        .from('exercises')
        .insert({
            name: 'Bench Press',
        })
}