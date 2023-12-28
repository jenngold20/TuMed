"use client"

import {
  Form,
  FormControl,
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
import { LoginSchema } from "@/validators/validatorsSchema"
import { useRef, useState } from "react"
import { signIn, useSession } from "next-auth/react"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import Image from "next/image"
import Link from "next/link"
import { Toaster, toast } from "sonner"
import { redirect } from "next/navigation"
import { PasswordInput } from "@/components/password-input"

type Inputs = z.infer<typeof LoginSchema>

type Props = {
  searchParams?: Record<"callbackUrl" | "error", string>
}

const SignIn = (props: Props) => {
  const Email = useRef("")
  const pass = useRef("")
  const session = useSession()

  const form = useForm<Inputs>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async (values: Inputs) => {
    form.reset()

    await signIn("credentials", {
      email: Email.current,
      password: pass.current,
    })

    toast.promise(signIn, {
      loading: "Iniciando sesion...",
      success: "Autenticado, redireccionando...",
      error: "Error",
    })
  }

  if (session.status === "authenticated") {
    redirect("/")
  }

  const wea = <p>wea</p>

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
        <Card className="w-full rounded-md min-w-screen md:w-3/4 max-w-[450px]">
          <CardHeader>
            <CardTitle className="text-2xl">Iniciar Sesion</CardTitle>
            <CardDescription>Ingresa con tu metodo preferido</CardDescription>
            <div className="flex items-center gap-2">
              <Button
                className="flex items-center w-full gap-2 my-4"
                variant="outline"
                onClick={() => signIn("google")}
              >
                <div className="relative w-5 h-5">
                  <Image
                    src="/Google.svg"
                    fill={true}
                    style={{ objectFit: "cover" }}
                    alt="google"
                  />
                </div>
                Google
              </Button>
              <Button
                className="flex items-center w-full gap-2 my-4"
                variant="outline"
                onClick={() => signIn("facebook")}
              >
                <div className="relative w-5 h-5">
                  <Image
                    src="/Facebook.svg"
                    fill={true}
                    style={{ objectFit: "cover" }}
                    alt="facebook"
                  />
                </div>
                Facebook
              </Button>
            </div>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="px-2 bg-white dark:bg-background text-muted-foreground">
                  O continua con tu cuenta
                </span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          className="outline-none  border-[#DADCE2] dark:border-border border  text-sm  rounded-lg
                       ring-4 ring-transparent focus:border-[#56E0DD] dark:focus:border-[#56E0DD] dark:focus:ring-[#56e0de13] focus:ring-[#CFF6F5]"
                          placeholder="email@tumed.com"
                          {...field}
                          onChange={(e) =>
                            field.onChange((Email.current = e.target.value))
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
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  className="w-full bg-[#57B6C6] hover:shadow-lg dark:text-foreground hover:shadow-[#57B6C6]/30 hover:bg-[#64c9db]"
                  type="submit"
                >
                  Ingresar
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex flex-wrap items-center justify-between gap-2">
            <div className="text-sm text-muted-foreground">
              <span className="hidden mr-1 sm:inline-block">
                No estas registrado?
              </span>
              <Link
                aria-label="Sign up"
                href="/auth/signup"
                className="transition-colors text-primary hover:text-[#64c9db] underline-offset-4 hover:underline"
              >
                Registrate
              </Link>
            </div>
            <Link
              aria-label="Reset password"
              href="/signin/reset-password"
              className="text-sm transition-colors text-primary underline-offset-4 hover:underline hover:text-[#64c9db]"
            >
              Recuperar contraseña
            </Link>
          </CardFooter>
        </Card>
      </main>
    </div>
  )
}

export default SignIn
