import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import FacebookProvider from "next-auth/providers/facebook"
import { login } from "@/lib/utils"

export const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID as string,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "email:",
          type: "email",
        },
        password: {
          label: "Password:",
          type: "password",
        },
      },
      async authorize(credentials) {
        const user = await login(credentials)

        if (credentials?.email === user.email) {
          return user
        } else {
          return null
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id
      if (user) token.role = user.role
      if (user) token.firstName = user.firstName
      if (user) token.lastName = user.lastName
      return token
    },
    async session({ session, token, user }) {
      if (session?.user) session.user.id = token.id
      if (session?.user) session.user.role = token.role
      if (session?.user) session.user.firstName = token.firstName
      if (session?.user) session.user.lastName = token.lastName
      return session
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
}
