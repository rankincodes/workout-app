'use client'

import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { createExercise, createSet, updateSet } from "@/lib/actions/exercises"
import React from "react"
import { IconBarbell, IconClock, IconExposurePlus1 } from "@tabler/icons-react"
import { toast } from "@/components/ui/use-toast"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerFooter } from "@/components/ui/drawer"
import { Exercise, Set } from "@/lib/types/app.types"
import { PlusIcon, CalendarIcon, MinusIcon } from "@radix-ui/react-icons"
import { Popover, PopoverTrigger, PopoverContent } from "@radix-ui/react-popover"
import { isToday, format } from "date-fns"
import { Drawer } from "vaul"
import { useRouter } from "next/navigation"
import Link from "next/link"

const FormSchema = z.object({
    weight: z.coerce.number().min(0).max(3000),
    reps: z.coerce.number().min(0).max(200),
    duration_secs: z.coerce.number().min(0).max(3600),
    date: z.date(),
})


export const SetForm: React.FC<{
    exercise: Exercise,
    lastSet?: Set | null,
    set?: Set,
}> = ({ exercise, lastSet, set }) => {
    const router = useRouter()
    const weightInputRef = React.useRef<HTMLInputElement>(null)
    const repInputRef = React.useRef<HTMLInputElement>(null)


    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            weight: set?.weight ?? lastSet?.weight ?? 0,
            reps: set?.reps ?? lastSet?.reps ?? 0,
            duration_secs: set?.duration_secs ?? lastSet?.duration_secs ?? 0,
            date: set ? new Date(set.date) : new Date(),
        },
    })

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        if (set) {
            toast({
                title: 'Set updated',
            })
            await updateSet({ id: set.id, ...data, date: data.date.toLocaleDateString() })
        } else {
            toast({
                title: 'Set recorded',
            })

            await createSet(exercise, { ...data, date: data.date.toLocaleDateString() })
        }
        router.push(`/exercises/${exercise.id}`)
    }


    return (

        <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-y-2">
                <FormField
                    name="date"
                    control={form.control}
                    render={() => (
                        <FormItem>
                            <FormLabel>Date</FormLabel>
                            <FormControl>
                                <Popover>
                                    <PopoverTrigger asChild className="w-full">
                                        <Button
                                            variant={"outline"}
                                            className="flex justify-start"
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {formatDate(form.getValues('date') ?? new Date())}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar
                                            mode="single"
                                            selected={form.watch('date')}
                                            onSelect={(day) => form.setValue('date', day as Date)}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                            </FormControl>
                        </FormItem>
                    )}
                />
                {exercise.has_weight && <FormField
                    control={form.control}
                    name="weight"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Weight ({exercise.weight_unit}s)</FormLabel>
                            <FormControl>
                                <div className="inline-flex h-14 w-full rounded-md border text-sm font-medium border-input bg-transparent text-sm shadow-sm transition-colors ">
                                    <button
                                        className="px-2 inline-flex whitespace-nowrap transition-colors items-center justify-center rounded-l-md bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90"
                                        type="button" onClick={() => form.setValue('weight', Number(form.getValues('weight')) - 5)}
                                    >
                                        <div className="flex items-center space-x-1 px-2">
                                            <MinusIcon className="w-4 h-4" />
                                            <p>5</p>
                                        </div>
                                    </button>
                                    <input
                                        className="flex justify-center h-full w-full text-center px-2 placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-0"
                                        type="number"
                                        {...field}
                                        ref={weightInputRef}
                                        onClick={() => weightInputRef.current?.select()}
                                    />
                                    <button
                                        className="px-2 inline-flex whitespace-nowrap text-sm font-medium transition-colors items-center justify-center rounded-r-md bg-green-500 text-destructive-foreground shadow-sm hover:bg-green-500/90"
                                        type="button" onClick={() => form.setValue('weight', Number(form.getValues('weight')) + 5)}
                                    >
                                        <div className="flex items-center space-x-1 px-2">
                                            <PlusIcon className="w-4 h-4" />
                                            <p>5</p>
                                        </div>
                                    </button>
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />}
                {exercise.has_reps && <FormField
                    control={form.control}
                    name="reps"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Reps</FormLabel>
                            <FormControl>
                                <div className="inline-flex h-14 w-full rounded-md border text-sm font-medium border-input bg-transparent text-sm shadow-sm transition-colors ">
                                    <button
                                        className="px-2 inline-flex whitespace-nowrap transition-colors items-center justify-center rounded-l-md bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90"
                                        type="button" onClick={() => form.setValue('reps', Number(form.getValues()['reps']) - 1)}
                                    >
                                        <div className="flex items-center space-x-1 px-2">
                                            <MinusIcon className="w-4 h-4" />
                                            <p>1</p>
                                        </div>
                                    </button>
                                    <input
                                        className="flex justify-center h-full w-full text-center px-2 placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-0"
                                        type="number"
                                        {...field}
                                        ref={repInputRef}
                                        onClick={() => repInputRef.current?.select()}
                                    />
                                    <button
                                        className="px-2 inline-flex whitespace-nowrap text-sm font-medium transition-colors items-center justify-center rounded-r-md bg-green-500 text-destructive-foreground shadow-sm hover:bg-green-500/90"
                                        type="button" onClick={() => form.setValue('reps', Number(form.getValues()['reps']) + 1)}
                                    >
                                        <div className="flex items-center space-x-1 px-2">
                                            <PlusIcon className="w-4 h-4" />
                                            <p>1</p>
                                        </div>
                                    </button>
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />}
                {exercise.has_duration && <FormField
                    control={form.control}
                    name="duration_secs"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Time (sec)</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    {...field}
                                    ref={repInputRef}
                                    onClick={() => repInputRef.current?.select()}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />}
                <Button type="submit">Submit</Button>
                <Button asChild type="button" variant="outline">
                    <Link href={`/exercises/${exercise.id}`}>Cancel</Link>
                </Button>
            </form>
        </Form>

    )
}

const formatDate = (date?: Date) => {
    if (!date || isToday(date)) {
        return "Today"
    }
    return format(date, "PPP")
}