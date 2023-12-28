import { options } from "@/app/api/auth/[...nextauth]/options"
import { getServerSession } from "next-auth"
import Image from "next/image"
import { redirect } from "next/navigation"
import InitialsAvatar from "react-initials-avatar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
const { format } = require("date-fns")
const { es } = require("date-fns/locale")

const TopBar = async () => {
  const session = await getServerSession(options)

  const firstname = session?.user.firstName ?? ""
  const lastname = session?.user.lastName ?? ""

  const initials = session?.user.name ?? firstname + " " + lastname

  const initialsString = initials.toString()

  const currentDate = new Date()
  const formattedDate = format(currentDate, "dd MMMM yyyy", { locale: es })

  if (!session) {
    redirect("/")
  }

  return (
    <div className="w-full h-[5.6rem] p-4 px-8 bg-white dark:bg-background border-b border-gray-200 dark:border-border shadow-sm flex items-center">
      {session && (
        <div className="flex items-center justify-between w-full">
          <div className="flex flex-col">
            <h2 className="text-xl font-bold">Administracion</h2>
            <p className="text-sm text-gray-700 dark:text-muted-foreground">
              {formattedDate}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage
                src={session?.user?.image as string}
                alt="Profile picture"
              />
              <AvatarFallback>
                <InitialsAvatar name={initialsString} />
              </AvatarFallback>
            </Avatar>

            <div>
              <p className="font-semibold leading-none capitalize">
                Hola, {session.user?.name ?? initials}
              </p>
              <p className="text-sm text-gray-700 dark:text-muted-foreground">
                {session?.user?.email}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default TopBar
