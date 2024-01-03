import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ExerciseForm } from "../../new/form";
import { getExercise } from "@/lib/actions/exercises";
import { redirect } from "next/navigation";

export default async function Page({
    exerciseId,
}: {
    exerciseId: number
}) {
    const exercise = await getExercise(exerciseId)

    if (!exercise) {
        return redirect("/")
    }


    return (
        <>
            <div className="flex justify-start space-x-2 items-center">
                <Button asChild variant="ghost"><Link href="/">Exercises</Link></Button>
                &gt;
                <Button variant="ghost" disabled>Edit {exercise.name}</Button>
            </div>
            <ExerciseForm />
        </>
    )
}

