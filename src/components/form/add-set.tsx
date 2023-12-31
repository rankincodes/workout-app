'use client'

import * as z from "zod"
import { Button } from "../ui/button"
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "../ui/drawer"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "../ui/use-toast"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { MinusIcon, PlusIcon } from "@radix-ui/react-icons"
import { createExercise, createSet } from "@/lib/actions"
import { Exercise, Set } from "@/lib/types/app.types"
import React from "react"
import { Input } from "../ui/input"

const FormSchema = z.object({
    weight: z.coerce.number().min(0).max(3000),
    reps: z.coerce.number().min(0).max(200),
    duration_secs: z.coerce.number().min(0).max(3600),
})


export const AddSet: React.FC<{
    exercise: Exercise,
    lastSet: Set | null
}> = ({ exercise, lastSet }) => {
    const [open, setOpen] = React.useState(false)
    const weightInputRef = React.useRef<HTMLInputElement>(null)
    const repInputRef = React.useRef<HTMLInputElement>(null)

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            weight: lastSet?.weight ?? 0,
            reps: lastSet?.reps ?? 0,
            duration_secs: lastSet?.duration_secs ?? 0,
        },
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        toast({
            title: 'Set recorded',
        })

        createSet(exercise, data)
        setOpen(false)
    }


    return (
        <Drawer open={open}>
            <DrawerTrigger asChild>
                <Button variant="outline" size="icon" onClick={() => setOpen(true)}>
                    <PlusIcon className="w-4 h-4" />
                </Button>
            </DrawerTrigger>
            <DrawerContent onInteractOutside={() => setOpen(false)}>
                <DrawerHeader>
                    <DrawerTitle>Add {exercise.name.toLocaleLowerCase()} set</DrawerTitle>
                </DrawerHeader>
                <DrawerFooter>
                    <Form {...form} >
                        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-y-2">
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
                                                    type="button" onClick={() => form.setValue('weight', Number(form.getValues()['weight']) - 5)}
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
                                                    type="button" onClick={() => form.setValue('weight', Number(form.getValues()['weight']) + 5)}
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
                            <Button variant="outline" type="button" onClick={() => setOpen(false)}>Cancel</Button>
                        </form>
                    </Form>
                </DrawerFooter>
            </DrawerContent>
        </Drawer >
    )
}