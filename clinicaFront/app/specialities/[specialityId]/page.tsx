"use client"

import DoctorCard from "@/components/cards/DoctorCard"
import { Button } from "@/components/ui/button"
import { Doctor, Speciality } from "@/types/next-auth"
import wait from "@/utils/wait"
import { ArrowLeftIcon } from "@radix-ui/react-icons"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const Speciality = ({ params }: { params: { specialityId: string } }) => {
  const router = useRouter()

  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [specialities, setSpecialities] = useState<Speciality[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  async function getDoctors() {
    setIsLoading(true)
    const res = await fetch("https://api.tumed.com.ar/doctors")
    const doctorsData: Doctor[] = await res.json()
    setDoctors(doctorsData)
    await wait(1500)
    setIsLoading(false)
  }

  async function getSpecialities() {
    setIsLoading(true)
    const res = await fetch("https://api.tumed.com.ar/specialities")
    const specialitiesData = await res.json()
    await wait(1500)
    setSpecialities(specialitiesData)
    setIsLoading(false)
  }

  useEffect(() => {
    getDoctors()
    getSpecialities()
  }, [])

  const filterDoctors: Doctor[] = doctors.filter(
    (doctor) => doctor.speciality.specialityId === Number(params.specialityId)
  )

  const filterSpeciality = specialities.filter(
    (spec) => spec.specialityId === Number(params.specialityId)
  )

  return (
    <div className="h-fit m-10 text-black mt-48 max-w-[85%] mx-auto">
      {isLoading ? (
        <>
          <div className="bg-[#e3e4e8] dark:bg-muted w-[80px] mb-2 h-5 rounded-md animate-pulse"></div>
          <div className="bg-[#e3e4e8] dark:bg-muted h-7 w-[400px] rounded-md my-2 animate-pulse"></div>
          <div className="bg-[#e3e4e8] dark:bg-muted w-[150px] h-5 rounded-md animate-pulse"></div>
          <div className="grid grid-rows-1 gap-6 mt-4 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="flex flex-col justify-between h-96 bg-[#fff] dark:bg-background rounded-md animate-pulse"
                style={{
                  animationFillMode: "backwards", // Keep the style applied after animation
                  animationDelay: `${i * 200}ms`, // Apply animation delay based on index
                }}
              >
                <div className="w-full h-80 bg-[#e3e4e8] dark:bg-muted"></div>
                <div className="flex flex-col gap-2 p-4">
                  <div className="flex flex-col gap-2">
                    <div className="w-2/4 h-4 bg-[#e3e4e8] dark:bg-muted rounded-md"></div>
                    <div className="w-1/4 h-4 bg-[#e3e4e8] dark:bg-muted rounded-md"></div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="w-full h-4 bg-[#e3e4e8] dark:bg-muted rounded-md"></div>
                    <div className="w-2/4 h-4 bg-[#e3e4e8] dark:bg-muted rounded-md"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <Button
            variant="outline"
            className="flex items-center gap-1 mb-4 dark:text-foreground"
            onClick={() => router.back()}
          >
            <ArrowLeftIcon className="w-4 h-4 dark:text-foreground" />
            Volver
          </Button>
          <h1 className="text-3xl font-bold dark:text-foreground">
            Especialistas en {filterSpeciality.map((spec) => spec.name)}
          </h1>
          <h2 className="text-[#4a5252]">
            Mostrando {filterDoctors.length} resultados
          </h2>
          <div className="grid grid-rows-1 gap-4 mt-4 lg:grid-cols-4">
            {filterDoctors.map((doctor: Doctor) => (
              <DoctorCard key={doctor.doctorId} doctor={doctor} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default Speciality
