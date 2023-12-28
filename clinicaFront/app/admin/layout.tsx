import Sidebar from "@/components/Sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section className="flex min-h-screen">
      <Sidebar />
      {children}
    </section>
  )
}
