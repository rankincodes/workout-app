import { NewExerciseForm } from "../new/form"
import { ExerciseSummaryChart } from "./exercise-graph"
import { getExercise, getSetStats, getSets } from "@/lib/actions/exercises"
import { redirect } from "next/navigation"
import { SetTable } from "./set-table"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default async function Page(
    { params: { exerciseId } }: { params: { exerciseId: number } }
) {
    const [
        exercise,
        sets,
        daily_summaries
    ] = await Promise.all([
        getExercise(exerciseId),
        getSets(exerciseId),
        getSetStats(exerciseId),
    ])

    if (!exercise) {
        return redirect("/")
    }

    return (
        <>
            <div className="flex justify-start space-x-2 items-center">
                <Button asChild variant="ghost"><Link href="/">Exercises</Link></Button>
                &gt;
                <Button variant="ghost" disabled>{exercise.name}</Button>
            </div>
            {sets.length > 0 &&
                <>
                    <ExerciseSummaryChart exercise={exercise} stats={daily_summaries} />
                    <SetTable exercise={exercise} sets={sets} />
                </>
            }
            <Button asChild variant="outline"><Link href={`/exercises/${exerciseId}/sets/new`}>New Set</Link></Button>
        </>
    )
}

