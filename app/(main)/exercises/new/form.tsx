'use client'

import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { PlusIcon } from "@radix-ui/react-icons"
import { createExercise } from "@/lib/actions/exercises"
import React from "react"
import { IconBarbell, IconClock, IconExposurePlus1 } from "@tabler/icons-react"
import { toast } from "@/components/ui/use-toast"
import { Drawer, DrawerClose } from "@/components/ui/drawer"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRouter } from "next/navigation"

const FormSchema = z.object({
    name: z.string().min(3).max(255),
    has_reps: z.boolean().default(true),
    has_duration: z.boolean().default(false),
    has_weight: z.boolean().default(true),
})

const toggleKeys = ["has_reps", "has_duration", "has_weight"] as const

export const NewExerciseForm: React.FC = () => {
    const router = useRouter()
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
        router.push("/")
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
        <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-y-2">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>New Exercise Name</FormLabel>
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
                <Button asChild type="button" variant="outline">
                    <Link href="/">Cancel</Link>
                </Button>
            </form>
        </Form>
    )
}