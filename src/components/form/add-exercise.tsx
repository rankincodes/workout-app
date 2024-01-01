'use client'

import * as z from "zod"
import { Button } from "../ui/button"
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "../ui/drawer"
import { Input } from "../ui/input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "../ui/use-toast"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { PlusIcon } from "@radix-ui/react-icons"
import { createExercise } from "@/lib/actions/exercises"
import React from "react"
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group"
import { IconBarbell, IconClock, IconExposurePlus1 } from "@tabler/icons-react"

const FormSchema = z.object({
    name: z.string().min(3).max(255),
    has_reps: z.boolean().default(true),
    has_duration: z.boolean().default(false),
    has_weight: z.boolean().default(true),
})

const toggleKeys = ["has_reps", "has_duration", "has_weight"] as const

export const AddExerciseDrawer: React.FC = () => {
    const [open, setOpen] = React.useState(false)
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: "",
            has_reps: true,
            has_duration: false,
            has_weight: true,
        },
    })

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        toast({
            title: `${data.name} added`,
        })

        await createExercise(data)
        setOpen(false)
    }

    function setToggleValues(values: string[]) {
        const toggles = toggleKeys.reduce((acc, value) => {
            acc[value] = values.includes(value)
            return acc
        }, {} as Record<string, boolean>)

        form.setValue("has_reps", toggles.has_reps)
        form.setValue("has_duration", toggles.has_duration)
        form.setValue("has_weight", toggles.has_weight)
    }

    return (
        <Drawer open={open}>
            <DrawerTrigger asChild>
                <Button variant="outline" onClick={() => setOpen(true)}>
                    <PlusIcon className="w-4 h-4" />
                    Add Exercise
                </Button>
            </DrawerTrigger>
            <DrawerContent onInteractOutside={() => setOpen(false)}>
                <DrawerHeader>
                    <DrawerTitle>Add new Exercise</DrawerTitle>
                </DrawerHeader>
                <DrawerFooter>
                    <Form {...form} >
                        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-y-2">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                         <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="eg. Bench Press" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormLabel>Metrics</FormLabel>
                            <ToggleGroup
                                type="multiple"
                                variant="outline"
                                value={toggleKeys.filter((key) => form.watch(key))}
                                onValueChange={setToggleValues}
                            >
                                <ToggleGroupItem value="has_weight" aria-label="Has Weights" className="min-h-14" defaultChecked>
                                    <IconBarbell className="w-4 h-4" />
                                    <p>Weight</p>
                                </ToggleGroupItem>
                                <ToggleGroupItem value="has_reps" aria-label="Toggle italic" className="min-h-14" defaultChecked>
                                    <IconExposurePlus1 className="w-4 h-4" />
                                    <p>Reps</p>
                                </ToggleGroupItem>
                                <ToggleGroupItem value="has_duration" aria-label="Toggle strikethrough" className="min-h-14">
                                    <IconClock className="w-4 h-4" />
                                    <p>Time</p>
                                </ToggleGroupItem>
                            </ToggleGroup>
                            <Button type="submit">Submit</Button>
                            <DrawerClose asChild>
                                <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                            </DrawerClose>
                        </form>
                    </Form>
                </DrawerFooter>
            </DrawerContent>
        </Drawer >
    )
}