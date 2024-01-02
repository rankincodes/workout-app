import { ColumnDef } from "@tanstack/react-table";
import { AddExerciseDrawer } from "@/components/form/add-exercise";
import { fetchExercises } from "@/lib/actions/exercises";
import { ExerciseTable } from "./excercises/exercise-table";

export default async function Home() {
  const exercises = await fetchExercises()

  return (
    <main className="flex flex-col bg-white dark:bg-slate-900 p-4 gap-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
        <ExerciseTable data={exercises} />
      </div>
      <AddExerciseDrawer />
    </main>
  )
}

