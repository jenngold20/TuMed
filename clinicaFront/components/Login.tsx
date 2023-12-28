"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "./ui/button"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { PersonIcon } from "@radix-ui/react-icons"

import { signIn } from "next-auth/react"
import { useRef } from "react"

type Props = {
  className?: string
  callbackUrl?: string
  error?: string
}

const Login = (props: Props) => {
  const userName = useRef("")
  const pass = useRef("")

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await signIn("credentials", {
      username: userName.current,
      password: pass.current,
      redirect: false,
    })
  }
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="outline" className="gap-1">
          Iniciar Sesión
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Iniciar Sesión</DialogTitle>
          <DialogDescription>
            Ingresa los datos de tu cuenta para continuar.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="grid gap-4 py-4">
          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="username" className="text-right">
              Usuario
            </Label>
            <Input
              id="username"
              className="col-span-3"
              placeholder="John Doe"
              onChange={(e) => (userName.current = e.target.value)}
            />
          </div>
          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="password" className="text-right">
              Contraseña
            </Label>
            <Input
              id="password"
              className="col-span-3"
              placeholder="********"
              type="password"
              onChange={(e) => (pass.current = e.target.value)}
            />
          </div>
        </form>
        <DialogFooter>
          <Button
            className="hover:shadow-[#57B6C6]/30 hover:bg-[#64c9db] text-white bg-[#57B6C6] hover:shadow-md"
            type="submit"
          >
            Iniciar Sesión
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default Login
