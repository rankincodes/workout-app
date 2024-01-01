import { ExerciseCard } from "@/components/excercises/exercise-card";
import { AddExerciseDrawer } from "@/components/form/add-exercise";
import { fetchExercises } from "@/lib/actions";

export default async function Home() {
  const exercises = await fetchExercises()

  return (
    <main className="flex flex-col bg-white dark:bg-slate-900 p-4 gap-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
        {exercises.map((exercise) => <ExerciseCard key={exercise.id} exercise={exercise} />)}
      </div>
      <AddExerciseDrawer />
    </main>
  )
}
