import { getExercise, getSet } from "@/lib/actions/exercises";
import { redirect } from "next/navigation";
import { SetForm } from "../../form";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Page({
    params: { setId, exerciseId },
}: {
    params: { setId: number, exerciseId: number }
}) {
    const [
        set,
        exercise
    ] = await Promise.all([
        getSet(setId),
        getExercise(exerciseId),
    ])

    if (!exercise) {
        return redirect("/")
    }

    if (!set) {
        return redirect(`/exercises/${exerciseId}`)
    }
    console.log(set)

    return (<>
        <div className="flex justify-start space-x-2 items-center">
            <Button asChild variant="ghost"><Link href="/">Exercises</Link></Button>
            &gt;
            <Button variant="ghost">{exercise.name}</Button>
            &gt;
            <Button variant="ghost" disabled>Edit Set</Button>
        </div>
        <SetForm exercise={exercise} set={set} />
    </>
    )
}

