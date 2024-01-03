'use server'

import { cookies } from "next/headers"
import { createClient } from "../utils/supabase/server"
import { Database } from "../types/database.types"
import { Exercise, ExerciseSummary, Set } from "../types/app.types"

type ExerciseInsert = Partial<Database["public"]["Tables"]["exercises"]["Insert"]>
export async function createExercise(exercise: ExerciseInsert) {
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

type ExerciseUpdate = Partial<Database["public"]["Tables"]["exercises"]["Update"]>
export async function updateExercise(exercise: ExerciseUpdate) {
    const cookieStore = cookies()

    const supabase = createClient(cookieStore)

    const { error } = await supabase
        .from('exercises')
        .update(exercise)
        .eq('id', exercise.id)
}

export async function getExercises(): Promise<Exercise[]> {
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

export async function getExercise(id: number): Promise<Exercise | null> {
    const cookieStore = cookies()

    const supabase = createClient(cookieStore)

    const { data } = await supabase.auth.getSession()

    const { data: exercises, error } = await supabase
        .from('exercises')
        .select('*')
        .eq('id', id)
        .eq('user_id', data.session?.user.id)
        .limit(1)

    return exercises?.[0] ?? null
}

export async function getLastSet(exercise_id: number): Promise<Set | null> {
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

export async function getSet(id: number): Promise<Set | null> {
    const cookieStore = cookies()

    const supabase = createClient(cookieStore)

    const { data } = await supabase.auth.getSession()

    const { data: sets, error } = await supabase
        .from('sets')
        .select('*')
        .eq('id', id)
        .eq('user_id', data.session?.user.id)
        .limit(1)

    return sets?.[0] ?? null
}

export async function getSets(exercise_id: number): Promise<Set[]> {
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

export async function getSetStats(exercise_id: number): Promise<ExerciseSummary[]> {
    const cookieStore = cookies()

    const supabase = createClient(cookieStore)

    const { data } = await supabase.auth.getSession()

    const { data: summary, error } = await supabase.rpc('get_exercise_summary_per_day', {
        p_exercise_id: exercise_id,
        p_user_id: data.session?.user.id,
    })

    return summary ?? []
}

type SetInsert = Partial<Database["public"]["Tables"]["sets"]["Insert"]>
export async function createSet(exercise: Exercise, set: SetInsert) {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)
    const { data } = await supabase.auth.getSession()

    await supabase.from('exercises').update({
        last_set: new Date(),
    }).eq('id', exercise.id)

    const { error } = await supabase
        .from('sets')
        .insert({
            ...set,
            user_id: data.session?.user.id,
            exercise_id: exercise.id,
            weight_unit: exercise.weight_unit,
        })

}

type SetUpdate = Partial<Database["public"]["Tables"]["sets"]["Update"]>
export async function updateSet(set: SetUpdate) {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    const { error } = await supabase
        .from('sets')
        .update(set)
        .eq('id', set.id)
}