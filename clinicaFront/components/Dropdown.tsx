import { signOut, useSession } from "next-auth/react"
import Link from "next/link"
import React, { useEffect, useRef, useState } from "react"
import InitialsAvatar from "react-initials-avatar"
import { Button } from "./ui/button"
import { Separator } from "./ui/separator"
import { AvatarIcon, CalendarIcon, GearIcon } from "@radix-ui/react-icons"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface DropdownProps {
  isActive: boolean
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>
  containerRef: React.RefObject<HTMLDivElement>
}

const Dropdown = ({ isActive, setIsActive, containerRef }: DropdownProps) => {
  const dropdownRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleMouseDown = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsActive(false)
      }
    }

    document.addEventListener("mousedown", handleMouseDown)
    return () => {
      document.removeEventListener("mousedown", handleMouseDown)
    }
  }, [setIsActive, containerRef])

  const { data: session } = useSession()

  const firstname = session?.user.firstName ?? ""
  const lastname = session?.user.lastName ?? ""

  const initials = session?.user.name ?? firstname + " " + lastname

  const initialsString = initials.toString()

  const handleLogout = async () => {
    await signOut({ redirect: false })
  }

  return (
    <div
      ref={dropdownRef}
      className={`p-3 absolute flex flex-col justify-between dark:bg-background border border-[#DADCE2] dark:border-border ${
        session?.user.role === "ROLE_ADMIN"
          ? "-bottom-[300px]"
          : "-bottom-[260px]"
      } rounded-md right-0 h-fit w-[250px] bg-white shadow-lg z-[99] ${
        isActive ? "opacity-100" : "opacity-0"
      } transition-all duration-400 ease-in-out`}
    >
      <div className="flex flex-col items-center">
        <Avatar>
          <AvatarImage
            src={session?.user?.image as string}
            alt="Profile picture"
          />
          <AvatarFallback>
            <InitialsAvatar name={initialsString} />
          </AvatarFallback>
        </Avatar>
        <p className="mt-1 text-lg font-semibold capitalize">
          {initialsString}
        </p>
        <p className="mb-2 text-sm dark:text-muted-foreground">
          {session?.user?.email}
        </p>
      </div>
      <div className="flex flex-col">
        {session?.user.role === "ROLE_ADMIN" && (
          <Link
            className="flex items-center p-2 text-sm font-light rounded-md group hover:bg-gray-100 dark:hover:bg-accent"
            onClick={() => setIsActive(false)}
            href="/admin"
          >
            <span className="flex items-center transition-all duration-200 ease-in-out group-hover:translate-x-3">
              <GearIcon className="mr-2" />
              Administracion
            </span>
          </Link>
        )}
        <Link
          className="flex items-center p-2 text-sm font-light rounded-md group hover:bg-gray-100 dark:hover:bg-accent"
          onClick={() => setIsActive(false)}
          href="/"
        >
          <span className="flex items-center transition-all duration-200 ease-in-out group-hover:translate-x-3">
            <AvatarIcon className="mr-2" />
            Preferencias
          </span>
        </Link>
        <Link
          className="flex items-center p-2 text-sm font-light rounded-md group hover:bg-gray-100 dark:hover:bg-accent"
          onClick={() => setIsActive(false)}
          href="/"
        >
          <span className="flex items-center transition-all duration-200 ease-in-out group-hover:translate-x-3">
            <CalendarIcon className="mr-2" />
            Mis turnos
          </span>
        </Link>
        <Separator className="mt-2" />
        <Button
          variant="secondary"
          className="mt-3 bg-gray-100 dark:bg-secondary"
          onClick={() => handleLogout()}
        >
          Cerrar Sesión
        </Button>
      </div>
    </div>
  )
}

export default Dropdown
