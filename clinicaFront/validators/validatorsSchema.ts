import { z } from "zod"

export const LoginSchema = z.object({
  email: z
    .string()
    .nonempty({ message: "El email es requerido" })
    .email({ message: "El email no es valido" }),
  password: z.string().nonempty({ message: "La contraseña es requerida" }),
})

export const RegisterSchema = z.object({
  firstName: z
    .string()
    .nonempty({ message: "El nombre es requerido" })
    .min(3, { message: "El nombre debe contener al menos 2 caracteres" })
    .max(10, { message: "El nombre no puede tener mas de 10 caracteres" }),
  lastName: z
    .string()
    .nonempty({ message: "El apellido es requerido" })
    .min(2, { message: "El apellido debe contener al menos 2 caracteres" })
    .max(20, { message: "El apellido no puede tener mas de 20 caracteres" }),
  email: z.string().nonempty({ message: "El email es requerido" }),
  password: z
    .string()
    .nonempty({ message: "La contraseña es requerida" })
    .min(8, { message: "La contraseña debe tener al menos 8 caracteres" })
    .max(15, { message: "La contraseña no puede tener mas de 15 caracteres" }),
})
