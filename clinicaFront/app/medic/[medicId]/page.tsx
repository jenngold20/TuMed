"use client"

import { Doctor } from "@/types/next-auth"
import {
  ArrowLeftIcon,
  StarFilledIcon,
  TokensIcon,
} from "@radix-ui/react-icons"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { JSXElementConstructor, Key, PromiseLikeOfReactNode, ReactElement, ReactNode, ReactPortal, useEffect, useState } from "react"
import { ImageProps } from "@/types/next-auth"
import Modal from "@/components/Modal"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  LinkedinShareButton,
  LinkedinIcon,
} from "next-share"
import Calendar from "@/components/Calendar"
import { signIn, useSession } from "next-auth/react"

const MedicDetails = ({ params }: { params: { medicId: string } }) => {
  const { data: session, status } = useSession()
  const [isActive, setIsActive] = useState<boolean>(false)
  
  

  const [doctor, setDoctor] = useState<Doctor[]>([])
  const [showAllImagesModal, setShowAllImagesModal] = useState(false)
  const router = useRouter()
  const [daySelected, setDaySelected] = useState<boolean>(false);
  const [appointments, setAppointments] = useState<string[]>([]);
  
  async function getDoctorById() {
    const res = await fetch(
      `https://api.tumed.com.ar/doctors/${params.medicId}`
    )
    const doctor: Doctor = await res.json()
    setDoctor([doctor])
  }

  useEffect(() => {
    getDoctorById()
  })

  return (
    <section className="max-w-[85%] mx-auto min-h-screen mt-48">
      {status !== "authenticated" ?
        <div> No estoy auth </div>
        : <div> Estoy auth </div>
      }
      <Button
        variant="outline"
        className="flex items-center gap-1 mb-4 dark:text-foreground"
        onClick={() => router.back()}
      >
        <ArrowLeftIcon className="w-4 h-4 dark:text-foreground" />
        Volver
      </Button>
      {doctor.map((doctor: any) => (
        <>
          <div className="flex justify-between">
            <div>
              <h2 className="text-3xl font-semibold leading-none">
                {doctor.firtName}
                &nbsp;
                {doctor.lastname}
              </h2>
              <h3 className="text-lg text-[#4a5252] dark:text-muted-foreground">
                {doctor.speciality.name}
              </h3>

              <div className="flex items-center gap-1 mt-2">
                <p className="flex items-center gap-1">
                  <StarFilledIcon className="w-4 h-4" />
                  {doctor.rating}
                </p>
                <span>·</span>
                <p className="font-medium underline cursor-pointer">
                  Opiniones
                </p>
                <span>·</span>
                <p className="font-medium">Buenos Aires</p>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <h4 className="text-sm font-bold">Compartir en:</h4>
              <div className="flex gap-1">
                <FacebookShareButton
                  url={`http://localhost:3000/medic/${doctor.doctorId}`}
                  quote={`${doctor.firtName} ${doctor.lastname} es especialista en ${doctor.speciality.name} `}
                  hashtag={"#tumed"}
                >
                  <FacebookIcon size={32} round />
                </FacebookShareButton>
                <TwitterShareButton
                  url={`http://localhost:3000/medic/${doctor.doctorId}`}
                  title={`${doctor.firtName} ${doctor.lastname} es especialista en ${doctor.speciality.name} `}
                >
                  <TwitterIcon size={32} round />
                </TwitterShareButton>
                <LinkedinShareButton
                  url={`http://localhost:3000/medic/${doctor.doctorId}`}
                >
                  <LinkedinIcon size={32} round />
                </LinkedinShareButton>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center gap-2 mt-6 sm:flex-row">
            <div className="rounded-sm overflow-hidden h-96 relative bg-[#e3e7ea] w-full sm:w-1/2 hover:brightness-[.85] ease-linear duration-100 transition-all">
              {doctor.imageGalleries.length > 0 && (
                <Image
                  src={doctor.imageGalleries[0].imagePath}
                  alt={`${doctor.firtName} ${doctor.lastname}`}
                  layout="fill"
                  objectFit="contain"
                  priority
                />
              )}
            </div>

            <div className="relative grid w-full grid-cols-2 grid-rows-2 gap-2 sm:w-1/2 h-96">
              {doctor.speciality.imageGalleries
                .slice(0, 4)
                .map((image: ImageProps) => (
                  <div
                    key={image.id}
                    className="rounded-sm overflow-hidden relative h-full bg-[#e3e7ea] hover:brightness-[.85] ease-linear duration-100 transition-all"
                  >
                    <Image
                      src={image.imagePath}
                      fill={true}
                      alt="main"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                ))}

              <button
                className="absolute bottom-4 right-4 bg-white border-[#757881] dark:bg-background dark:border-border  gap-1 border flex items-center px-4 py-2 text-sm font-semibold rounded-lg hover:bg-[#f3f3f3] ease-linear duration-200 transition-all hover:shadow-sm"
                onClick={() => setShowAllImagesModal(true)} // Open the modal when clicked
              >
                <TokensIcon className="w-4 h-4" />
                Mostrar todas las fotos
              </button>

              {showAllImagesModal && (
                <Modal
                  open={showAllImagesModal}
                  onClose={() => setShowAllImagesModal(false)}
                >
                  <div className="grid grid-cols-3 gap-2">
                    {doctor.speciality.imageGalleries.map(
                      (image: ImageProps) => (
                        <div
                          key={image.id}
                          className="rounded-sm overflow-hidden relative bg-[#e3e7ea] hover:brightness-[.85] ease-linear duration-100 transition-all"
                          style={{ height: "30vh", width: "30vw" }} // Set a fixed height here
                        >
                          <Image
                            src={image.imagePath}
                            fill={true}
                            alt="main"
                            style={{ objectFit: "cover" }}
                          />
                        </div>
                      )
                    )}
                  </div>
                </Modal>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2 my-8 sm:flex-row">
            <div className="sm:w-1/2">
              <h2 className="text-xl font-semibold">Conocé al especialista</h2>
              <p className="mt-2 text-sm leading-[1.4] pr-4 text-[#4a5252] dark:text-muted-foreground">
                {doctor.description}
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Unde
                ab error pariatur atque rem consequatur consectetur impedit,
                eveniet dolorum illum?
              </p>
              <span>
                <Separator className="my-4" />
                {/*
                doctor.doctorSchedules[0].dayOfWeek
                    element.dayOfWeek + " " + element.startTime + " " + element.endTime
                    { doctor.doctorSchedules.forEach((element: { dayOfWeek: string; startTime: string; endTime: string; id: number }) => {
                      <div key={element.id}>
                        {element.dayOfWeek + " " + element.startTime + " " + element.endTime}
                      </div>
                    })}
                      */}
                {
                  <div>
                    {doctor.doctorSchedules.map((doctorSchedule: { id: Key | null | undefined; dayOfWeek: string ; startTime: string ; endTime: string  }) => (
                      <div key={doctorSchedule.id}>
                        {doctorSchedule.dayOfWeek}:  {doctorSchedule.startTime.slice(0,-3)} a {doctorSchedule.endTime.slice(0,-3)}
                      </div>
                    ))}
                  </div>
                }

                
                <Separator className="my-4" />
                <div className="flex">
                {status !== "authenticated" ?
                  <div> Registrate para reservar un turno </div>
                  : <Calendar doctorIdFromParams={params.medicId} daySelected={(e:boolean)=>setDaySelected(e)} setAppointments={(e:string[])=>setAppointments(e)}></Calendar>
                }
                 
                </div>
                <Separator className="my-4" />                
                <h2 className="mt-4 text-xl font-semibold">Caracteristicas</h2>
                {doctor.characteristics.map((char: any) => (
                  <div
                  key={char.characteristicId}
                  className="flex items-center gap-4 mt-4"
                  >
                    <div className="relative w-6 h-6">
                      <Image
                        alt={char.name}
                        src={char.icon}
                        fill={true}
                        style={{ objectFit: "cover" }}
                        />
                    {/*
                      daySelected && 
                        appointments.map((appointment: string) => (
                        <div key={appointment}>
                          {appointment}                          
                        </div>
                      ))
                      */
                    }
                    </div>
                    <p
                      className="text-[#4a5252] dark:text-muted-foreground text-sm"
                      key={char.characteristicId}
                    >
                      {char.name}
                    </p>
                  </div>
                ))}
              </span>
            </div>
            <div className="w-full">
              
              <div className=" mt-6 sm:mt-0  w-full max-h-[200px] h-fit  justify-center flex-col shadow-custom flex bg-white dark:bg-background dark:border-border border border-[#DADCE2] p-8 rounded-md">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-2xl font-bold">
                    $3.500&nbsp;
                    <span className="text-base font-normal">consulta</span>
                  </p>

                  <div className="flex items-center gap-1 mt-2">
                    <p className="flex items-center gap-1">
                      <StarFilledIcon className="w-4 h-4" />
                      {doctor.rating}
                    </p>
                    <span>·</span>
                    <p className="font-medium underline cursor-pointer">
                      Opiniones
                    </p>
                  </div>
                </div>
                <button className="w-full px-4 py-2 text-white bg-[#57B6C6] font-semibold transition-all duration-200 ease-linear rounded-md hover:shadow-lg hover:shadow-[#57B6C6]/30 hover:bg-[#64c9db]">
                  Reservar turno
                </button>
                <p className="mt-2 text-sm text-center dark:text-muted-foreground">
                  No vamos a cobrarte ningún cargo por el momento
                </p>
              </div>

              <div className="mt-14 grid grid-cols-2 gap-5 w-full">
                { daySelected &&
                  appointments.map((appointment: string) => (
                    <Button
                    className="w-full px-4 py-2 text-white bg-[#57B6C6] font-semibold transition-all duration-200 ease-linear rounded-md hover:shadow-lg hover:shadow-[#57B6C6]/30 hover:bg-[#64c9db]"
                                
                                type="button"
                                
                                
                                key={appointment}
                                >
                      {appointment} 
                    </Button>
                  ))
                }
              </div>
              </div>      
              {
/*

*/
}

           
            
          </div>
        </>
      ))}
    </section>
  )
}

export default MedicDetails
