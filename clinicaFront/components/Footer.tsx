"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  InstagramLogoIcon,
  LinkedInLogoIcon,
  TwitterLogoIcon,
} from "@radix-ui/react-icons"

const Footer = () => {
  const pathname = usePathname()

  const isAdminPath = pathname.startsWith("/admin")
  const isAuthPath = pathname.startsWith("/auth")

  return (
    <>
      {!isAuthPath && !isAdminPath ? (
        <footer className="bg-white dark:bg-background flex items-center border-t h-[280px] md:h-[240px]">
          <div className="max-w-[85%] mx-auto w-full flex flex-col md:flex-row justify-between">
            <div className="flex flex-col justify-center gap-4 md:flex-row md:items-center md:gap-14">
              <Link href="/" className="flex items-center gap-2">
                <div className="relative w-32 h-12">
                  <Image
                    src="/logo2.svg"
                    alt="logo"
                    fill={true}
                    style={{ objectFit: "cover" }}
                  />
                </div>
              </Link>
              <div className="text-sm font-medium leading-normal">
                <p className="font-bold">Av. Callao 320</p>
                <p>1824 Ciudad Autonoma de Buenos Aires</p>
                <p>Tel: 0800-1454-3832</p>
                <p>Email: contacto@tumed.com</p>
              </div>
            </div>
            <div className="flex flex-col mt-6">
              <ul className="flex items-center gap-2 mb-2 md:justify-end">
                <li>
                  <TwitterLogoIcon className="w-6 h-6" />
                </li>
                <li>
                  <InstagramLogoIcon className="w-6 h-6" />
                </li>
                <li>
                  <LinkedInLogoIcon className="w-6 h-6" />
                </li>
              </ul>
              <p className="text-sm tracking-normal">
                <span className="font-semibold">© 2023 tuMed</span>{" "}
                &nbsp;|&nbsp; Política de privacidad&nbsp;|&nbsp;Términos y
                condiciones
              </p>
            </div>
          </div>
        </footer>
      ) : null}
    </>
  )
}

export default Footer
