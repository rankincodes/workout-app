"use client"

import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Exercise, Set } from "@/lib/types/app.types";
import { formatSeconds } from "@/lib/utils";
import { IconEdit } from "@tabler/icons-react";
import { ColumnDef, getCoreRowModel, useReactTable, flexRender } from "@tanstack/react-table";
import { format, formatDistanceToNow, isToday, isYesterday } from "date-fns"
import Link from "next/link";

const columns: ColumnDef<Set>[] = [
    {
        accessorKey: "completed_at",
        header: "Completed",
        cell: ({ row }) => {
            const lastDate = row.getValue("completed_at") as string
            let formattedDate = 'N/A'
            if (lastDate) {
                const date = new Date(lastDate)
                if (isToday(date)) {
                    // local time, no date
                    formattedDate = format(date, "p")
                } else {
                    // short month, day, time
                    formattedDate = format(date, "MMM d, p")
                }
            }

            return formattedDate
        }
    },
    {
        accessorKey: "weight",
        header: () => <div className="text-right">Weight</div>,
        cell: ({ row }) => {
            const weight = row.getValue("weight") as number
            const unit = row.original.weight_unit
            return <div className="text-right">{weight} {unit}s</div>
        }
    },
    {
        accessorKey: "reps",
        header: () => <div className="text-right">Reps</div>,
        cell: ({ row }) => <div className="text-right">{row.getValue("reps")}</div>
    },
    {
        accessorKey: "duration_secs",
        header: () => <div className="text-right">Time</div>,
        cell: ({ row }) => <div className="text-right">{formatSeconds(row.getValue("duration_secs") as number)}</div>,
    },
    {
        id: 'actions',
        cell: ({ row }) => <Link className="flex justify-center items-center w-[20px]" href={`/exercises/${row.original.exercise_id}/sets/${row.original.id}/edit`}><IconEdit size={18} stroke={1.5} color="gray" /></Link>,
        size: 20,
        enableResizing: false
    }
]


interface SetTableProps {
    sets: Set[],
    exercise: Exercise
}

export function SetTable({
    sets,
    exercise
}: SetTableProps) {
    const table = useReactTable({
        data: sets,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getRowId(originalRow, index, parent) {
            return originalRow.id.toString()
        },
        initialState: {
            columnVisibility: {
                weight: exercise.has_weight,
                reps: exercise.has_reps,
                duration_secs: exercise.has_duration,
            },
        },
    })

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id} >
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead key={header.id} className={`w-[${header.column.getSize()}px]`}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                )
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow key={row.id}>
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id} className={`max-w-[${cell.column.getSize()}px]`}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center">
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div >
    )
}
