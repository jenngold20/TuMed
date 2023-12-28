"use client"

import { useTheme } from "next-themes"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from "next/image"
import Link from "next/link"
import Dropdown from "./Dropdown"
import InitialsAvatar from "react-initials-avatar"
import {
  ChevronDownIcon,
  HamburgerMenuIcon,
  InfoCircledIcon,
  MoonIcon,
  PersonIcon,
  SunIcon,
} from "@radix-ui/react-icons"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useRef, useState } from "react"
import { usePathname } from "next/navigation"
import { signIn, useSession } from "next-auth/react"
import { AnimatePresence, motion } from "framer-motion"
import { Button } from "./ui/button"

const Navbar = () => {
  const pathname = usePathname()
  const [isActive, setIsActive] = useState<boolean>(false)

  const { setTheme } = useTheme()

  const containerRef = useRef<HTMLDivElement | null>(null)

  const { data: session, status } = useSession()

  const firstname = session?.user.firstName ?? ""
  const lastname = session?.user.lastName ?? ""

  const initials = firstname + " " + lastname

  const initialsString = initials.toString()

  const isAdminPath = pathname.startsWith("/admin")
  const isAuthPath = pathname.startsWith("/auth")

  return (
    <>
      {!isAuthPath && !isAdminPath ? (
        <header className="fixed top-0 left-0 z-50 flex flex-col w-full bg-white shadow-sm dark:bg-background">
          <div className="h-8 items-center text-sm tracking-wide flex justify-center text-white bg-[#57B6C6] dark:bg-background dark:border-b dark:border-border">
            <InfoCircledIcon className="w-4 h-4 mr-2" />
            <p>Atencion al cliente las 24hs: 0800-222-2222</p>
          </div>
          <div className="flex items-center justify-center border-b border-[#DADCE2] dark:border-border">
            <div className="max-w-[95%] sm:max-w-[85%] flex justify-between w-full py-3">
              <Link href="/" className="flex items-center gap-3">
                <div className="relative w-32 h-10">
                  <Image
                    src="/logo2.svg"
                    alt="logo"
                    fill={true}
                    style={{ objectFit: "cover" }}
                    priority={true}
                  />
                </div>
              </Link>

              {status !== "authenticated" ? (
                <>
                  <div className="items-center hidden gap-2 sm:flex">
                    <Button
                      onClick={() => signIn()}
                      variant="outline"
                      className="gap-1"
                    >
                      Iniciar Sesión
                      <PersonIcon className="w-4 h-4" />
                    </Button>
                    <Link href="/auth/signup">
                      <Button className="hover:shadow-[#F04D47]/30 hover:bg-[#ff2e27] text-white bg-[#F04D47] hover:shadow-md">
                        Registrarme
                      </Button>
                    </Link>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="icon">
                          <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                          <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                          <span className="sr-only">Toggle theme</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setTheme("light")}>
                          Claro
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTheme("dark")}>
                          Oscuro
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTheme("system")}>
                          Sistema
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="sm:hidden">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="icon">
                          <HamburgerMenuIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                          <HamburgerMenuIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                          <span className="sr-only">Menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Link href="/auth/signin">Iniciar Sesion</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Link href="/auth/signup">Registrarse</Link>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </>
              ) : (
                <div ref={containerRef} className="relative flex">
                  <div onClick={() => setIsActive(!isActive)} className="mr-2">
                    <Avatar className="cursor-pointer">
                      <AvatarImage
                        src={session?.user?.image as string}
                        alt="Profile picture"
                      />
                      <AvatarFallback>
                        <InitialsAvatar name={initialsString} />
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <span className="mt-[.15rem]">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="icon">
                          <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                          <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                          <span className="sr-only">Toggle theme</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setTheme("light")}>
                          Claro
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTheme("dark")}>
                          Oscuro
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTheme("system")}>
                          Sistema
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </span>
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ y: -10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -10, opacity: 0 }}
                      >
                        <Dropdown
                          isActive={isActive}
                          setIsActive={setIsActive}
                          containerRef={containerRef}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>
          </div>
          <div className="hidden md:flex items-center justify-center border-b border-[#DADCE2] dark:border-border">
            <ul className="max-w-[85%] w-full flex gap-8 py-4 text-sm font-semibold ">
              <li>Institucional</li>
              <li className="flex items-center gap-1 cursor-pointer">
                Especialidades
                <ChevronDownIcon className="w-4 h-4" />
              </li>
              <li>Turnos Online</li>
              <li>Resultados de estudios</li>
              <li className="hidden lg:block">Beneficios</li>
              <li className="hidden lg:block">Centro de ayuda</li>
            </ul>
          </div>
        </header>
      ) : null}
    </>
  )
}

export default Navbar
