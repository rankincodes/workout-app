'use client'
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { signIn, signUp } from "@/lib/actions/auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

export const LoginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

export default function Login({
  searchParams,
}: {
  searchParams: { message: string }
}) {

  const form = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const handleSignIn = async (formData: z.infer<typeof LoginFormSchema>) => {
    return signIn(formData)
  }

  const handleSignUp = async (formData: z.infer<typeof LoginFormSchema>) => {
    return signUp(formData)
  }


  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <Form {...form}>
        <form
          className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
          onSubmit={form.handleSubmit(handleSignIn)}
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="you@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <Input placeholder="********" type="password" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
          <Button formAction={() => form.handleSubmit(handleSignIn)}>
            Sign In
          </Button>
          <Button formAction={() => form.handleSubmit(handleSignUp)} variant="outline">
            Sign Up
          </Button>
          {searchParams?.message && (
            <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
              {searchParams.message}
            </p>
          )}
        </form>
      </Form>
    </div>
  )
}
