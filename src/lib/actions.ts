'use server'

import { cookies } from "next/headers"
import { createClient } from "./utils/supabase/server"
import { Database } from "./types/database.types"
import { Exercise, Set, SetStat } from "./types/app.types"

export async function createExercise(exercise: any) {
    const cookieStore = cookies()

    const supabase = createClient(cookieStore)

    const { data } = await supabase.auth.getSession()

    const { error } = await supabase
        .from('exercises')
        .insert({
            ...exercise,
            user_id: data.session?.user.id
        })
}

export async function fetchExercises(): Promise<Exercise[]> {
    const cookieStore = cookies()

    const supabase = createClient(cookieStore)

    const { data } = await supabase.auth.getSession()

    const { data: exercises, error } = await supabase
        .from('exercises')
        .select('*')
        .eq('user_id', data.session?.user.id)
        .order('last_set', { ascending: false })

    return exercises ?? []
}

export async function fetchLastSet(exercise_id: number): Promise<Set | null> {
    const cookieStore = cookies()

    const supabase = createClient(cookieStore)

    const { data } = await supabase.auth.getSession()

    const { data: sets, error } = await supabase
        .from('sets')
        .select('*')
        .eq('exercise_id', exercise_id)
        .eq('user_id', data.session?.user.id)
        .order('created_at', { ascending: false })
        .limit(1)

    return sets?.[0] ?? null
}

export async function fetchSets(exercise_id: number): Promise<Set[]> {
    const cookieStore = cookies()

    const supabase = createClient(cookieStore)

    const { data } = await supabase.auth.getSession()

    const { data: sets, error } = await supabase
        .from('sets')
        .select('*')
        .eq('exercise_id', exercise_id)
        .eq('user_id', data.session?.user.id)
        .order('created_at', { ascending: false })

    return sets ?? []
}

export async function fetchSetStats(exercise_id: number): Promise<SetStat[]> {
    const cookieStore = cookies()

    const supabase = createClient(cookieStore)

    const { data } = await supabase.auth.getSession()

    const { data: setStats, error } = await supabase.rpc('get_max_weights_and_sets', {
        exercise_id_param: exercise_id,
        user_id_param: data.session?.user.id,
    })

    return setStats ?? []
}

export async function createSet(exercise: Exercise, set: any) {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)
    const { data } = await supabase.auth.getSession()

    await supabase.from('exercises').update({
        last_set: set,
    }).eq('id', exercise.id)

    const { error } = await supabase
        .from('sets')
        .insert({
            ...set,
            user_id: data.session?.user.id,
            exercise_id: exercise.id,
            weight_unit: exercise.weight_unit,
        })

    console.log(error)
}