"use client"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { LoginSchema } from "@/validators/validatorsSchema"
import { useRef } from "react"
import { signIn } from "next-auth/react"

type Inputs = z.infer<typeof LoginSchema>

type Props = {
  searchParams?: Record<"callbackUrl" | "error", string>
}

const Rhf = (props: Props) => {
  const userName = useRef("")
  const pass = useRef("")

  const form = useForm<Inputs>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    form.reset()
    console.log(values)
    console.log(props.searchParams?.callbackUrl)

    await signIn("credentials", {
      username: userName.current,
      password: pass.current,
      redirect: true,
      callbackUrl: props.searchParams?.callbackUrl,
    })
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-[350px] rounded-md">
        <CardHeader>
          <CardTitle>Iniciar Sesion</CardTitle>
          <CardDescription>Ingresa tus credenciales de acceso</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Usuario</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="TuMed"
                        {...field}
                        onChange={(e) =>
                          field.onChange((userName.current = e.target.value))
                        }
                      />
                    </FormControl>
                    <FormDescription>
                      Ingresa tu nombre de usuario.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contraseña</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="*******"
                        {...field}
                        onChange={(e) =>
                          field.onChange((pass.current = e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="w-full" type="submit">
                Ingresar
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

export default Rhf
