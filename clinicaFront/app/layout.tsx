import Navbar from "@/components/Navbar"
import "./globals.css"
import type { Metadata } from "next"
import { Archivo } from "next/font/google"
import Footer from "@/components/Footer"
import "react-initials-avatar/lib/ReactInitialsAvatar.css"
import AuthProvider from "./context/AuthProvider"
import { ThemeProvider } from "@/components/theme-provider"

const archivo = Archivo({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "TuMed | Tu médico en línea",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={archivo.className}>
        <AuthProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Navbar />
            {children}
          </ThemeProvider>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  )
}
