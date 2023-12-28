"use client"

import {
  AccessibilityIcon,
  AvatarIcon,
  ExitIcon,
  LayersIcon,
  ListBulletIcon,
  PersonIcon,
  PlusCircledIcon,
} from "@radix-ui/react-icons"
import Image from "next/image"
import Link from "next/link"
import React, { useState } from "react"
import MenuItem from "./MenuItem"
import { MenuSection } from "@/types/next-auth"

const menuSections: MenuSection[] = [
  {
    title: "Médicos",
    icon: <PersonIcon className="w-5 h-5" />,
    links: [
      {
        href: "/admin/medic",
        icon: <PlusCircledIcon />,
        text: "Ingresar nuevo registro",
      },
      {
        href: "/admin/medic/list",
        icon: <ListBulletIcon />,
        text: "Ver listado",
      },
    ],
  },
  {
    title: "Especialidades",
    icon: <LayersIcon className="w-5 h-5" />,
    links: [
      {
        href: "/admin/speciality",
        icon: <PlusCircledIcon />,
        text: "Ingresar nuevo registro",
      },
      {
        href: "/admin/speciality/list",
        icon: <ListBulletIcon />,
        text: "Ver listado",
      },
    ],
  },
  {
    title: "Caracteristicas",
    icon: <AccessibilityIcon className="w-5 h-5" />,
    links: [
      {
        href: "/admin/characteristic",
        icon: <PlusCircledIcon />,
        text: "Ingresar nuevo registro",
      },
      {
        href: "/admin/characteristic/list",
        icon: <ListBulletIcon />,
        text: "Ver listado",
      },
    ],
  },
  {
    title: "Usuarios",
    icon: <AvatarIcon className="w-5 h-5" />,
    links: [
      {
        href: "/admin/users/list",
        icon: <ListBulletIcon />,
        text: "Ver listado",
      },
    ],
  },
]

const Sidebar: React.FC = () => {
  const [menuStates, setMenuStates] = useState<boolean[]>(
    menuSections.map(() => true)
  )

  const toggleMenu = (index: number) => {
    setMenuStates((prevStates) => {
      const newStates = [...prevStates]
      newStates[index] = !newStates[index]
      return newStates
    })
  }

  return (
    <aside className="overflow-auto fixed top-0 left-0 z-50 p-4 border-r justify-between shadow-sm border-gray-200 dark:border-border w-full max-w-[250px] min-h-screen bg-white dark:bg-background flex flex-col gap-1">
      <div className="flex flex-col justify-between h-screen">
        <section className="flex flex-col gap-4">
          <div className="pb-4 mb-4 border-b border-gray-200 dark:border-border">
            <Link
              href="/admin"
              className="flex items-center justify-center gap-4"
            >
              <div className="relative self-center w-[9.2rem] h-14">
                <Image
                  src="/logo2.svg"
                  alt="logo"
                  fill={true}
                  style={{ objectFit: "cover" }}
                />
              </div>
            </Link>
          </div>
          {menuSections.map((section, index) => (
            <MenuItem
              key={section.title}
              isOpen={menuStates[index]}
              toggleMenu={() => toggleMenu(index)}
              title={section.title}
              icon={section.icon}
              links={section.links}
            />
          ))}
        </section>
        <div className="mb-8">
          <Link
            className="flex items-center gap-2 p-2 transition-all duration-100 ease-in-out rounded-md hover:bg-gray-100 dark:hover:bg-accent"
            href="/"
          >
            <ExitIcon className="w-5 h-5" />
            Salir
          </Link>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
