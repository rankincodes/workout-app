import { getExercise, getLastSet } from "@/lib/actions/exercises";
import { NewSetForm } from "./form";
import { redirect } from "next/navigation";

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
        <NewSetForm exercise={exercise} lastSet={lastSet} />
    )
}

