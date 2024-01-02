"use client"

import { Exercise } from "@/lib/types/app.types";
import { ColumnDef } from "@tanstack/react-table";
import { format, formatDistance, formatDistanceToNow, isToday, isYesterday } from "date-fns"

export const exerciseColumns: ColumnDef<Exercise>[] = [
    {
        accessorKey: "name",
        header: "Exercise",
    },
    {
        accessorKey: "last_set",
        header: () => <div className="text-right">Last Set</div>,
        cell: ({ row }) => {
            const lastDate = row.getValue("last_set") as string
            let formattedDate = 'N/A'
            if (lastDate) {
                const date = new Date(lastDate)
                if (isToday(date)) {
                    formattedDate = format(date, "p")
                } else if (isYesterday(date)) {
                    formattedDate = 'Yesterday'
                } else {
                    formattedDate = formatDistanceToNow(new Date(lastDate), { addSuffix: true })
                }
            }

            return <div className="text-right">{formattedDate}</div>
        }
    },
]