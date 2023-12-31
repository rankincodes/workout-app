'use client'
import { ResponsiveContainer, LineChart, Line, XAxis } from "recharts"
import { Set } from "@/lib/types/app.types"

export const SetHistoryPreviewGraph: React.FC<{ sets: Set[] }> = ({ sets }) => {
    if (sets.length < 2) return <p>No sets</p>

    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart width={50} height={50} data={sets}>
                <Line type="monotone" dataKey="weight" stroke="#0891b2" strokeWidth={2} dot={false}/>
                <XAxis dataKey="date" hide />
            </LineChart>
       </ResponsiveContainer>
    )
}