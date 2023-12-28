import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

//login user with credentials
export const login = async (credentials: any) => {
  const res = await fetch("https://api.tumed.com.ar/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  })
  const user = await res.json()
  if (res.ok && user) {
    console.log(user)
    return user
  }
  return null
}
