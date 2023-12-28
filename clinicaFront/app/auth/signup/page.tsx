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
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { RegisterSchema } from "@/validators/validatorsSchema"
import { useRef, useState } from "react"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import Image from "next/image"
import Link from "next/link"
import { Toaster, toast } from "sonner"
import { PasswordInput } from "@/components/password-input"
import { EnvelopeOpenIcon } from "@radix-ui/react-icons"

type Inputs = z.infer<typeof RegisterSchema>

const SignUp = () => {
  const firstName = useRef("")
  const lastName = useRef("")
  const email = useRef("")
  const pass = useRef("")
  const [showSuccess, setShowSuccess] = useState(false)
  const [resendId, setResendId] = useState("")

  const form = useForm<Inputs>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  })

  const onResendEmail = async () => {
    const getUsers = await fetch("https://api.tumed.com.ar/auth/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    const usersToFilter = await getUsers.json()
    const userToResend = usersToFilter.filter(
      (user: any) => user.email === email.current
    )
    const userId = userToResend[0].id

    await fetch(`https://api.tumed.com.ar/auth/sendEmail/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
  }

  const onSubmit = async (values: z.infer<typeof RegisterSchema>) => {
    form.reset()
    console.log(values)

    const res = await fetch("https://api.tumed.com.ar/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
    setShowSuccess(true)
  }

  return (
    <div className="grid min-h-screen grid-cols-1 overflow-hidden md:grid-cols-3 lg:grid-cols-2">
      <AspectRatio ratio={16 / 9}>
        <Image
          src="/images/5.avif"
          alt="A skateboarder doing a high drop"
          fill
          className="absolute inset-0 object-cover"
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-background/60 md:to-background/40" />
        <Link
          href="/"
          className="absolute top-0 z-20 flex items-center text-lg font-bold tracking-tight left-8"
        >
          <div className="relative mr-2 w-44 h-44">
            <Image src="/logo2.svg" alt="logo" fill={true} />
          </div>
        </Link>
      </AspectRatio>
      <main className="container absolute flex items-center justify-center col-span-1 -translate-y-1/2 md:bg-white md:dark:bg-background top-1/2 md:static md:top-0 md:col-span-2 md:flex md:translate-y-0 lg:col-span-1">
        <Toaster closeButton richColors position="bottom-right" />
        {showSuccess && (
          <Card className="text-center w-full rounded-md min-w-screen md:w-3/4 max-w-[450px]">
            <CardHeader>
              <CardTitle className="text-xl">
                <div className="justify-center flex">
                  <EnvelopeOpenIcon className="my-2 h-16 w-16 text-[#57B6C6] dark:text-[#57B6C6]" />
                </div>
                Bienvenido a TuMed!
              </CardTitle>
              <CardDescription>
                Te enviamos un email de confirmacion, por favor revisa tu correo
                y sigue las instrucciones para verificar tu cuenta.
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <div className="text-center flex-col flex items-center justify-center w-full">
                <Button
                  onClick={() => onResendEmail()}
                  variant="link"
                  type="submit"
                  className="text-sm transition-colors text-primary underline-offset-4 hover:underline hover:text-[#64c9db]"
                >
                  No recibiste el email? Reenviar
                </Button>
                <Link className="mt-2" aria-label="Sign in" href="/auth/signin">
                  <Button
                    variant="default"
                    className="cursor-pointer flex items-center w-fit text-sm px-4 py-2 text-white bg-[#57B6C6] font-semibold transition-all duration-200 ease-linear rounded-md hover:shadow-lg hover:shadow-[#57B6C6]/30 hover:bg-[#64c9db]"
                  >
                    Iniciar sesion
                  </Button>
                </Link>
              </div>
            </CardFooter>
          </Card>
        )}
        {!showSuccess && (
          <Card className="w-full rounded-md min-w-screen md:w-3/4 max-w-[450px]">
            <CardHeader>
              <CardTitle className="text-2xl">Registro</CardTitle>
              <CardDescription>
                Ingresa tus datos para registrarte.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nombre</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="John"
                            className="outline-none  border-[#DADCE2] border dark:border-border  text-sm  rounded-lg
                       ring-4 ring-transparent focus:border-[#56E0DD] focus:ring-[#CFF6F5] dark:focus:border-[#56E0DD] dark:focus:ring-[#56e0de13]"
                            {...field}
                            onChange={(e) =>
                              field.onChange(
                                (firstName.current = e.target.value)
                              )
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Apellido</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Doe"
                            className="outline-none  border-[#DADCE2] border  text-sm  rounded-lg dark:border-border
                       ring-4 ring-transparent focus:border-[#56E0DD] focus:ring-[#CFF6F5] dark:focus:border-[#56E0DD] dark:focus:ring-[#56e0de13]"
                            {...field}
                            onChange={(e) =>
                              field.onChange(
                                (lastName.current = e.target.value)
                              )
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="email@tumed.com"
                            className="outline-none  border-[#DADCE2] border  text-sm  rounded-lg dark:border-border
                       ring-4 ring-transparent focus:border-[#56E0DD] focus:ring-[#CFF6F5] dark:focus:border-[#56E0DD] dark:focus:ring-[#56e0de13]"
                            {...field}
                            onChange={(e) =>
                              field.onChange((email.current = e.target.value))
                            }
                          />
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
                        <FormLabel>Contraseña</FormLabel>
                        <FormControl>
                          <PasswordInput
                            className="outline-none  border-[#DADCE2] dark:border-border border  text-sm  rounded-lg
                        ring-4 ring-transparent focus:border-[#56E0DD] dark:focus:border-[#56E0DD] dark:focus:ring-[#56e0de13] focus:ring-[#CFF6F5]"
                            placeholder="*******"
                            {...field}
                            onChange={(e) =>
                              field.onChange((pass.current = e.target.value))
                            }
                          />
                        </FormControl>
                        <FormDescription>
                          La contraseña debe tener al menos 6 caracteres.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    className="w-full bg-[#57B6C6] dark:text-foreground hover:shadow-lg hover:shadow-[#57B6C6]/30 hover:bg-[#64c9db]"
                    type="submit"
                  >
                    Registrar
                  </Button>
                </form>
              </Form>
            </CardContent>
            <CardFooter className="flex flex-wrap items-center justify-between gap-2">
              <div className="text-sm text-muted-foreground">
                <span className="hidden mr-1 sm:inline-block">
                  Ya estas registrado?
                </span>
                <Link
                  aria-label="Sign in"
                  href="/auth/signin"
                  className="transition-colors text-primary hover:text-[#64c9db] underline-offset-4 hover:underline"
                >
                  Inicia sesion
                </Link>
              </div>
            </CardFooter>
          </Card>
        )}
      </main>
    </div>
  )
}

export default SignUp
