import { ColumnDef } from "@tanstack/react-table";
import { AddExerciseDrawer } from "@/components/form/add-exercise";
import { DataTable } from "@/components/ui/data-table";
import { fetchExercises } from "@/lib/actions/exercises";
import { Exercise } from "@/lib/types/app.types";
import { exerciseColumns } from "./excercises/columns";

export default async function Home() {
  const exercises = await fetchExercises()

  return (
    <main className="flex flex-col bg-white dark:bg-slate-900 p-4 gap-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
        <DataTable columns={exerciseColumns} data={exercises} />
      </div>
      <AddExerciseDrawer />
    </main>
  )
}

