import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ExerciseForm } from "./form";

export default function NewExercise() {

    return (
        <>
            <div className="flex justify-start space-x-2 items-center">
                <Button asChild variant="ghost"><Link href="/">Exercises</Link></Button>
                &gt;
                <Button variant="ghost" disabled>New Exercise</Button>
            </div>
            <ExerciseForm />
        </>
    )
}

