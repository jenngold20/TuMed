import { DefaultSession, DefaultUser } from "next-auth"
import { JWT, DefaultJWT } from "next-auth/jwt"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      firstName: string
      lastName: string
      role: string
      isFavorite: boolean
    } & DefaultSession["user"]
  }

  interface User extends DefaultUser {
    id: string
    role: string
    firstName: string
    lastName: string
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string
    role: string
    firstName: string
    lastName: string
  }
}

export interface Doctor {
  doctorId: number
  firtName: string
  lastname: string
  mv: number
  description: string
  imageGalleries?: ImageGalleriesEntity[] | null
  speciality: Speciality
  rating: double
}
export interface ImageGalleriesEntity {
  id: number
  imagePath: string
}
export interface Speciality {
  specialityId: number
  name: string
  description: string
  doctors?: null[] | null
  imageGalleries?: ImageGalleriesEntity[] | null
}

export interface Inputs {
  firtName: string
  lastname: string
  mv: number
  description: string
  specialityId: string
  imagen: FileList
}

export interface ImageProps {
  id: number
  imagePath: string
}

export interface MenuItemLink {
  href: string
  icon: JSX.Element
  text: string
}

export interface MenuItemProps {
  isOpen: boolean
  toggleMenu: () => void
  title: string
  icon: JSX.Element
  links: MenuItemLink[]
}

export interface MenuSection {
  title: string
  icon: JSX.Element
  links: MenuItemLink[]
}

export interface User {
  email: string
  password: string
  firstName: string
  lastName: string
  role: string
  id: number
  emailVerified: boolean
}

export interface Characteristic {
  characteristicId: number
  name: string
  icon: string
  asset: boolean
}