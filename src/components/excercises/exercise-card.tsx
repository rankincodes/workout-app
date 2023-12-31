import { Exercise, Set } from "@/lib/types/app.types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { AddSet } from "../form/add-set";
import { fetchSetStats, fetchSets } from "@/lib/actions";
import { ExerciseSummaryChart } from "./exercise-graph";

export const ExerciseCard = async ({ exercise }: { exercise: Exercise }) => {
    const sets = await fetchSets(exercise.id)
    const daily_summaries = await fetchSetStats(exercise.id)


    return (
        <Card>
            <CardHeader>
                <div className="flex justify-between">
                    <CardTitle>{exercise.name}</CardTitle>
                    <AddSet exercise={exercise} lastSet={sets.length > 0 ? sets[0] : null} />
                </div>
            </CardHeader>
            <CardContent className="p-0">
                <ExerciseSummaryChart exercise={exercise} stats={daily_summaries} />
            </CardContent>
            {/* <CardFooter>
                <p>Card Footer</p>
            </CardFooter> */}
        </Card>
    )
}

