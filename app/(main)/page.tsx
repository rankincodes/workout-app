import { ColumnDef } from "@tanstack/react-table";
import { ExerciseTable } from "./exercises/exercise-table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getExercises } from "@/lib/actions/exercises";

export default async function Home() {
  const exercises = await getExercises()

  return (
    <>
      <div className="flex justify-start space-x-2 items-center">
        <Button disabled variant="ghost">Exercises</Button>
      </div>
      {exercises.length > 0 && <ExerciseTable data={exercises} />}
      <Button variant="outline"><Link href='/exercises/new'>Add Exercise</Link></Button>
    </>
  )
}

