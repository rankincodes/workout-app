import { getExercise, getLastSet } from "@/lib/actions/exercises";
import { redirect } from "next/navigation";
import { SetForm } from "../form";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Page({
    params: { exerciseId },
}: {
    params: { exerciseId: number }
}) {
    const [
        lastSet,
        exercise
    ] = await Promise.all([
        getLastSet(exerciseId),
        getExercise(exerciseId),
    ])

    if (!exercise) {
        return redirect("/")
    }

    return (
        <>
            <div className="flex justify-start space-x-2 items-center">
                <Button asChild variant="ghost"><Link href="/">Exercises</Link></Button>
                &gt;
                <Button variant="ghost">{exercise.name}</Button>
                &gt;
                <Button variant="ghost" disabled>New Set</Button>
            </div>
            <SetForm exercise={exercise} lastSet={lastSet} />
        </>
    )
}

