"use client"

import { UploadIcon } from "@radix-ui/react-icons"
import { useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { Toaster, toast } from "sonner"

const CharacateristicsForm = ({
  params,
}: {
  params: { characteristicId: string }
}) => {
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
  } = useForm<any>()

  const onSubmit: SubmitHandler<any> = async (formData) => {
    const characteristicData = {
      name: formData.name,
      asset: formData.asset,
      icon: selectedImage,
    }

    console.log(characteristicData)

    const res = await fetch(
      `https://api.tumed.com.ar/characteristics/${params.characteristicId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(characteristicData),
      }
    )

    if (res.ok) {
      const promise = () => new Promise((resolve) => setTimeout(resolve, 1000))

      toast.promise(promise, {
        loading: "Procesando cambios...",
        success: "Registro editado exitosamente",
        error: "Error",
      })
    }
  }

  return (
    <div className="flex flex-col w-full m-5  ml-[16.875rem]">
      <Toaster closeButton richColors position="bottom-right" />

      <h2 className="mb-4 text-2xl font-bold">Ingresar nueva caracteristica</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-sm  rounded-md flex flex-col gap-2 border border-[#DADCE2] p-4"
      >
        <div className="flex flex-col items-center gap-4">
          <div className="flex flex-col w-full mt-2">
            <label htmlFor="name">Nombre</label>
            <input
              className="bg-[#fcfeff] p-2 rounded-md  ring-4 ring-transparent focus-within:border-[#56E0DD] border outline-none focus-within:ring-[#CFF6F5] border-[#DADCE2] "
              {...register("name", { required: true })}
              aria-invalid={errors.name ? "true" : "false"}
              placeholder="Ingrese el nombre de la caracteristica"
            />
            {errors.name?.type === "required" && (
              <p className="mt-1 text-red-500" role="alert">
                El nombre de la caracteristica es requerido
              </p>
            )}
            <div className="hidden">
              <label htmlFor="asset">asset</label>
              <input type="checkbox" checked={true} />
            </div>
          </div>
        </div>

        <label
          className="mt-4 w-fit cursor-pointer border-[#DADCE2] gap-1 border flex items-center px-4 py-2 text-sm font-semibold rounded-lg hover:bg-[#dadce23e] ease-linear duration-200 transition-all hover:shadow-sm"
          htmlFor="imagen"
        >
          <UploadIcon className="w-5 h-5" />
          Icono
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

export default CharacateristicsForm
