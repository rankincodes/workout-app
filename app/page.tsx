import { AddExerciseDrawer } from "@/components/form/add-exercise";

export default function Home() {
  return (
    <main className="flex min-h-screen bg-white dark:bg-slate-900">
      <div className="fixed right-5 bottom-5">
        <AddExerciseDrawer />
      </div>
    </main>
  )
}
