"use client"

import { UploadIcon } from "@radix-ui/react-icons"
import { NextResponse } from "next/server"
import { useEffect, useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { Speciality } from "@/types/next-auth"
import { Toaster, toast } from "sonner"

const SpecialityForm = ({ params }: { params: { specialityId: string } }) => {
  const [speciality, setSpeciality] = useState<any>({})
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

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
  } = useForm<Speciality>()

  const onSubmit: SubmitHandler<Speciality> = async (formData) => {
    const specialityData = {
      name: formData.name,
      description: formData.description,
      imageGalleries: [
        {
          imagePath: selectedImage,
        },
      ],
    }

    console.log(specialityData)

    const res = await fetch(
      `https://api.tumed.com.ar/specialities/${params.specialityId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(specialityData),
      }
    )

    const data = await res.json()

    if (res.ok) {
      const promise = () => new Promise((resolve) => setTimeout(resolve, 1000))

      toast.promise(promise, {
        loading: "Actualizando...",
        success: "Registro actualizado exitosamente",
        error: "Error",
      })
    }

    return NextResponse.json(data)
  }

  async function getSpecialityById() {
    const res = await fetch(
      `https://api.tumed.com.ar/specialities/${params.specialityId}`
    )
    const specialityRes: Speciality = await res.json()
    setSpeciality(specialityRes)
  }

  useEffect(() => {
    getSpecialityById()
  }, [])

  return (
    <div className="flex flex-col  ml-[16.875rem] w-full m-5">
      <Toaster closeButton richColors position="bottom-right" />

      <h2 className="mb-4 text-2xl font-bold">Editar especialidad</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-sm  rounded-md flex flex-col gap-2 border border-[#DADCE2] p-4"
      >
        <div className="flex flex-col items-center gap-4">
          <div className="flex flex-col w-full mt-2">
            <label htmlFor="name">Nombre</label>
            <input
              defaultValue={speciality.name}
              className="bg-[#fcfeff] p-2 rounded-md  ring-4 ring-transparent focus-within:border-[#56E0DD] border outline-none focus-within:ring-[#CFF6F5] border-[#DADCE2] "
              {...register("name")}
              aria-invalid={errors.name ? "true" : "false"}
              placeholder="Ingrese una especialidad"
            />
            {errors.name?.type === "required" && (
              <p className="mt-1 text-red-500" role="alert">
                El nombre de la especialidad es requerido
              </p>
            )}
          </div>
          <div className="flex flex-col w-full mt-2">
            <label htmlFor="description">Descripción</label>
            <textarea
              defaultValue={speciality.description}
              className="bg-[#fcfeff] p-2 rounded-md  ring-4 ring-transparent focus-within:border-[#56E0DD] border outline-none focus-within:ring-[#CFF6F5] border-[#DADCE2] "
              {...register("description")}
              aria-invalid={errors.description ? "true" : "false"}
              placeholder="Un médico especialista en enfermedades de la piel."
            />
            {errors.description?.type === "required" && (
              <p className="mt-1 text-red-500" role="alert">
                La descripción es requerida
              </p>
            )}
          </div>
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
        <button
          type="submit"
          className="mt-4 px-4 py-2 text-white bg-[#57B6C6] font-semibold transition-all duration-200 ease-linear rounded-md hover:shadow-lg hover:shadow-[#57B6C6]/30 hover:bg-[#64c9db]"
        >
          Confirmar cambios
        </button>
      </form>
    </div>
  )
}

export default SpecialityForm
