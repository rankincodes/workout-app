'use client'
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, ComposedChart, Bar, Legend, Scatter, Tooltip, CartesianGrid, Label } from "recharts"
import { Exercise, ExerciseSummary } from "@/lib/types/app.types"


export const ExerciseSummaryChart: React.FC<{ exercise: Exercise, stats: ExerciseSummary[] }> = ({ exercise, stats }) => {
    if (stats.length < 1) return (
        <div className="flex justify-center items-center w-full">
            <p>Complete a set to see data</p>
        </div>
    )

    const onlyReps =exercise.has_reps && (!exercise.has_duration && !exercise.has_weight) 

    return (
        <div className="h-[150px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <ComposedChart width={500} height={500} data={stats}>
                    {/* Axes */}
                    <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
                    {exercise.has_weight && <YAxis dataKey="max_weight" domain={['dataMin', 'dataMax']} yAxisId="weight" orientation="left">
                        <Label value={`${exercise.weight_unit}s`} position="insideLeft" angle={-90} />
                    </YAxis>}
                    {exercise.has_duration && <YAxis dataKey="total_duration_secs" tickFormatter={formatSeconds} domain={[0, 'dataMax']} yAxisId="duration" orientation="left" />}
                    {onlyReps && <YAxis yAxisId="reps" dataKey={"total_reps"} domain={[0, 'dataMax']} orientation="left" />}
                    <YAxis yAxisId="sets" domain={[0, 'auto']} orientation="right" />
                    <XAxis dataKey="date" tickFormatter={formatDate} />
                    {/* Data */}
                    {exercise.has_duration && <Line type="monotone" dataKey="total_duration_secs" stroke="#ff7300" strokeWidth={2} yAxisId="duration" name="Time" />}
                    {exercise.has_weight && <Line type="monotone" dataKey="max_weight" stroke="#0891b2" strokeWidth={2} yAxisId="weight" name="Max Weight" />}
                    {exercise.has_reps && <Bar dataKey="total_reps" barSize={20} fill="#413ea0" yAxisId={onlyReps ? "reps" : "sets"} name="Reps" z={1} />}
                    <Scatter dataKey="num_sets" fill="#8884d8" yAxisId="sets" name="sets" z={2} />
                    {/* Components */}
                    <Tooltip />
                    <Legend />
                </ComposedChart>
            </ResponsiveContainer>
        </div>
    )
}

const formatSeconds = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60

    return `${minutes}:${remainingSeconds}`
}

const formatDate = (date: string) => {
    const dateObj = new Date(date)
    return `${dateObj.getUTCMonth() + 1}/${dateObj.getUTCDate()}`
}
