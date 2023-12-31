import { Exercise, Set } from "@/lib/types/app.types";
import { Card, CardHeader, CardTitle } from "../ui/card";
import { AddSet } from "../form/add-set";
import { fetchSetStats, fetchSets } from "@/lib/actions";
import { SetHistoryPreviewGraph } from "./set-graph-preview";

export const ExerciseCard = async ({ exercise }: { exercise: Exercise }) => {
    const sets = await fetchSets(exercise.id)
    const setStats = await fetchSetStats(exercise.id)

    return (
        <Card>
            <CardHeader>
                <div className="flex justify-between">
                    <CardTitle>{exercise.name}</CardTitle>
                    <div className="w-1/3">
                        <SetHistoryPreviewGraph sets={sets} />
                    </div>
                    <AddSet exercise={exercise} lastSet={sets.length > 0 ? sets[0] : null} />
                </div>
            </CardHeader>
            {/* <CardContent>
                <p>Card Content</p>
            </CardContent>
            <CardFooter>
                <p>Card Footer</p>
            </CardFooter> */}
        </Card>
    )
}

