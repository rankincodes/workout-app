'use client'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { signIn, signUp } from "@/lib/actions/auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

const LoginFormSchema = z.object({
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
    console.log('signup')
    return signUp(formData)
  }


  return (
    <div className="flex w-full justify-center p-4">
      <Tabs defaultValue="signin" className="w-[400px]">
        <TabsList className="grid grid-cols-2 w-full">
          <TabsTrigger value="signin">Sign In</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>
        <TabsContent value="signin">
          <Card>
            <CardContent>
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
                  <Button >
                    Sign In
                  </Button>
                  {searchParams?.message && (
                    <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
                      {searchParams.message}
                    </p>
                  )}
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="signup">
          <Card>
            <CardContent>
              <Form {...form}>
                <form
                  className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
                  onSubmit={form.handleSubmit(handleSignUp)}
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
                  <Button >
                    Sign Up
                  </Button>
                  {searchParams?.message && (
                    <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
                      {searchParams.message}
                    </p>
                  )}
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs >
    </div>
  )
}
