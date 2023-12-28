"use client"

import React, { Suspense, useEffect, useState } from "react"
import DoctorCard from "./cards/DoctorCard"
import { Doctor, Speciality } from "@/types/next-auth"
import SpecialityCard from "./cards/SpecialityCard"
import Ads from "./Ads"
import wait from "@/utils/wait"

const Content = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [specialities, setSpecialities] = useState<Speciality[]>([])

  const isLoading = doctors.length === 0 || specialities.length === 0

  async function getDoctors() {
    const res = await fetch("https://api.tumed.com.ar/doctors/random")
    const doctors: Doctor[] = await res.json()
    setDoctors(doctors)
  }

  async function getSpecialties() {
    const res = await fetch("https://api.tumed.com.ar/specialities")
    const specialties: Speciality[] = await res.json()
    await wait(1500)
    setSpecialities(specialties)
  }

  useEffect(() => {
    getDoctors()
    getSpecialties()
  }, [])

  return (
    <div className="flex flex-col gap-4 max-w-[85%] mx-auto">
      <div>
        <h2 className="text-2xl font-bold">Especialidades</h2>
        <p className="mb-4 text-lg text-[#727A88] max-w-xl">
          Contamos con los mejores especialistas en distintas areas.
        </p>
        <section className="grid grid-cols-1 gap-3 my-6 md:grid-cols-2 xl:grid-cols-3">
          {isLoading &&
            Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className={`flex flex-col justify-between h-64 bg-[#fff] dark:bg-muted p-4 rounded-md animate-pulse`}
                style={{
                  animationFillMode: "backwards", // Keep the style applied after animation
                  animationDelay: `${i * 200}ms`, // Apply animation delay based on index
                }}
              >
                <div className="w-12 h-12 bg-[#e3e4e8] dark:bg-background rounded-full animate-pulse"></div>
                <div>
                  <div className="w-32 h-4 mb-4 bg-[#e3e4e8]  dark:bg-background rounded-md"></div>
                  <div className="flex flex-col gap-2">
                    <div className="w-full h-4 bg-[#e3e4e8] dark:bg-background  rounded-md"></div>
                    <div className="w-3/4 h-4 bg-[#e3e4e8] dark:bg-background  rounded-md"></div>
                    <div className="w-full h-4 bg-[#e3e4e8] dark:bg-background  rounded-md"></div>
                  </div>
                </div>
              </div>
            ))}
          {!isLoading &&
            specialities.map((speciality: Speciality) => (
              <SpecialityCard
                key={speciality.specialityId}
                speciality={speciality}
              />
            ))}
        </section>
      </div>
      <Ads />
      <div className="flex flex-col mt-4">
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
            <h2 className="text-2xl font-bold">Recomendaciones</h2>
            <p className="mb-4 text-lg text-[#727A88] max-w-xl">
              Una selección de los profesionales mejor valorados.
            </p>
            <section className="grid grid-rows-2 gap-4 md:grid-cols-2 lg:grid-cols-4">
              {doctors.slice(0, 8).map((doctor: Doctor) => (
                <DoctorCard key={doctor.doctorId} doctor={doctor} />
              ))}
            </section>
          </>
        )}
      </div>
    </div>
  )
}

export default Content
