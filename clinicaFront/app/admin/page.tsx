import { getServerSession } from "next-auth"
import { options } from "../api/auth/[...nextauth]/options"
import { redirect } from "next/navigation"
import TopBar from "@/components/TopBar"

const Admin = async () => {
  const session = await getServerSession(options)

  if (!session) {
    redirect("/")
  }

  return (
    <div className="ml-[15.6rem] w-full">
      <TopBar />
    </div>
  )
}

export default Admin
