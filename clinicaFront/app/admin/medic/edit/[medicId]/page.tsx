"use client"

import { UploadIcon } from "@radix-ui/react-icons"
import { NextResponse } from "next/server"
import { useEffect, useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { Doctor, Inputs, Speciality } from "@/types/next-auth"
import { Toaster, toast } from "sonner"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const EditMedic = ({ params }: { params: { medicId: string } }) => {
  const [doctor, setDoctor] = useState<Doctor[]>([])
  const [characteristics, setCharacteristics] = useState([])
  const [speciality, setSpeciality] = useState([])
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [selectedChars, setSelectedChars] = useState<any>({})

  const handleCharacteristicClick = (characteristicId: any) => {
    setSelectedChars((prevSelectedChars: any) => ({
      ...prevSelectedChars,
      [characteristicId]: !prevSelectedChars[characteristicId],
    }))
  }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const imageResult = e.target?.result as string | null
        if (imageResult) {
          setSelectedImage(imageResult)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = async (formData) => {
    const doctorData = {
      firtName: formData.firtName,
      lastname: formData.lastname,
      mv: formData.mv,
      description: formData.description,
      speciality: {
        specialityId: formData.specialityId,
      },
      imageGalleries: [
        {
          imagePath: selectedImage,
        },
      ],
      characteristics: Object.keys(selectedChars).map((key) => ({
        characteristicId: key,
      })),
    }

    console.log(doctorData)

    const res = await fetch(
      `https://api.tumed.com.ar/doctors/${params.medicId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(doctorData),
      }
    )

    const data = await res.json()

    if (res.ok) {
      reset()
      const promise = () => new Promise((resolve) => setTimeout(resolve, 1000))

      toast.promise(promise, {
        loading: "Actualizando...",
        success: "Registro actualizado exitosamente",
        error: "Error",
      })
    }

    return NextResponse.json(data)
  }

  async function getSpecialties() {
    const res = await fetch("https://api.tumed.com.ar/specialities")
    const specialties = await res.json()
    setSpeciality(specialties)
  }

  async function getCharacteristics() {
    const res = await fetch("https://api.tumed.com.ar/characteristics")
    const characteristics = await res.json()
    setCharacteristics(characteristics)
  }

  async function getDoctorById() {
    const res = await fetch(
      `https://api.tumed.com.ar/doctors/${params.medicId}`
    )
    const doctor: Doctor = await res.json()
    setDoctor([doctor])
  }

  useEffect(() => {
    getSpecialties()
    getDoctorById()
    getCharacteristics()
  }, [])

  return (
    <div className="flex flex-col w-full m-5  ml-[16.875rem]">
      <Toaster closeButton richColors position="bottom-right" />

      <h2 className="mb-4 text-2xl font-bold">Editar médico</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-sm  rounded-md flex flex-col gap-2 border border-[#DADCE2] p-4"
      >
        <div className="flex items-center gap-4">
          <div className="flex flex-col w-full mt-2">
            <label htmlFor="firtName">Nombre</label>
            <input
              defaultValue={doctor[0]?.firtName}
              className="bg-[#fcfeff] p-2 rounded-md  ring-4 ring-transparent focus-within:border-[#56E0DD] border outline-none focus-within:ring-[#CFF6F5] border-[#DADCE2] "
              {...register("firtName")}
              aria-invalid={errors.firtName ? "true" : "false"}
              placeholder="Juan"
            />
            {errors.firtName?.type === "required" && (
              <p className="mt-1 text-red-500" role="alert">
                El nombre es requerido
              </p>
            )}
          </div>
          <div className="flex flex-col w-full mt-2">
            <label htmlFor="lastname">Apellido</label>
            <input
              defaultValue={doctor[0]?.lastname}
              className="bg-[#fcfeff] p-2 rounded-md  ring-4 ring-transparent focus-within:border-[#56E0DD] border outline-none focus-within:ring-[#CFF6F5] border-[#DADCE2] "
              {...register("lastname")}
              aria-invalid={errors.lastname ? "true" : "false"}
              placeholder="Perez"
            />
            {errors.lastname?.type === "required" && (
              <p className="mt-1 text-red-500" role="alert">
                El apellido es requerido
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-col mt-2">
          <label htmlFor="mv">Matricula</label>
          <input
            defaultValue={doctor[0]?.mv}
            className="bg-[#fcfeff] p-2 rounded-md  ring-4 ring-transparent focus-within:border-[#56E0DD] border outline-none focus-within:ring-[#CFF6F5] border-[#DADCE2] "
            type="number"
            {...register("mv")}
            aria-invalid={errors.mv ? "true" : "false"}
            placeholder="ej: 123456"
          />
          {errors.mv?.type === "required" && (
            <p className="mt-1 text-red-500" role="alert">
              La matricula es requerida
            </p>
          )}
        </div>
        <div className="flex flex-col mt-2">
          <label htmlFor="description">Decripcion</label>
          <textarea
            defaultValue={doctor[0]?.description}
            className="bg-[#fcfeff] p-2 rounded-md  ring-4 ring-transparent focus-within:border-[#56E0DD] border outline-none focus-within:ring-[#CFF6F5] border-[#DADCE2] "
            {...register("description")}
            aria-invalid={errors.description ? "true" : "false"}
            placeholder="..."
          />
          {errors.description?.type === "required" && (
            <p className="mt-1 text-red-500" role="alert">
              La descripcion es requerida
            </p>
          )}
        </div>
        <div className="flex flex-col mt-2">
          <label htmlFor="specialityId">Especialidad</label>
          <select
            {...register("specialityId")}
            className="border border-[#DADCE2] rounded-md p-2 focus:outline-none ring-[#CFF6F5] focus:ring focus:border-[#56E0DD]"
          >
            {speciality.map((speciality: Speciality) => (
              <option
                defaultValue={doctor[0]?.speciality?.specialityId}
                key={speciality.specialityId}
                value={speciality.specialityId}
              >
                {speciality.name}
              </option>
            ))}
          </select>
          {errors.specialityId?.type === "required" && (
            <p className="mt-1 text-red-500" role="alert">
              La especialidad es requerida
            </p>
          )}
        </div>
        <label
          className="mt-4 w-fit cursor-pointer border-[#DADCE2] gap-1 border flex items-center px-4 py-2 text-sm font-semibold rounded-lg hover:bg-[#dadce23e] ease-linear duration-200 transition-all hover:shadow-sm"
          htmlFor="imagen"
        >
          <UploadIcon className="w-5 h-5" />
          Subir imagen
        </label>
        <input
          onChange={handleImageChange}
          className="hidden"
          type="file"
          name="imagen"
          id="imagen"
        />
        <h4 className="font-semibold mt-4">Caracteristicas</h4>
        <div className="flex items-center gap-2">
          {characteristics.map((characteristic: any) => (
            <Button
              className="flex items-center gap-2"
              type="button"
              variant={`${
                selectedChars[characteristic.characteristicId]
                  ? "outlineColor"
                  : "outline"
              }`}
              onClick={() =>
                handleCharacteristicClick(characteristic.characteristicId)
              }
              key={characteristic.characteristicId}
            >
              <div className="relative w-4 h-4">
                <Image
                  src={characteristic.icon}
                  fill={true}
                  alt={"ico"}
                  style={{ objectFit: "cover" }}
                />
              </div>
              {characteristic.name}
            </Button>
          ))}
        </div>
        <Button
          type="submit"
          className="mt-4 px-4 py-2 text-white bg-[#57B6C6] font-semibold transition-all duration-200 ease-linear rounded-md hover:shadow-lg hover:shadow-[#57B6C6]/30 hover:bg-[#64c9db]"
        >
          Confirmar cambios
        </Button>
      </form>
    </div>
  )
}

export default EditMedic
