"use client"

import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Exercise } from "@/lib/types/app.types";
import { ColumnDef, getCoreRowModel, useReactTable, flexRender } from "@tanstack/react-table";
import { format, formatDistanceToNow, isToday, isYesterday } from "date-fns"
import Link from "next/link";

const columns: ColumnDef<Exercise>[] = [
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
    }
]


interface ExerciseTableProps {
    data: Exercise[],
}

export function ExerciseTable({
    data,
}: ExerciseTableProps) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getRowId(originalRow, index, parent) {
            return originalRow.id.toString()
        },
    })

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead key={header.id}>
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
                            <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && "selected"}
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                        <Link href={`/exercises/${row.id}`}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </Link>
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
