"use client"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { Doctor } from "@/types/next-auth"
import {
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
  MagnifyingGlassIcon,
  Pencil2Icon,
  TrashIcon,
} from "@radix-ui/react-icons"
import Image from "next/image"
import { useRouter } from "next/navigation"
import React, { useState, useEffect } from "react"
import { Toaster, toast } from "sonner"

const ITEMS_PER_PAGE = 10

const Lista = () => {
  const [doctors, setDoctors] = useState([])
  const [currentPage, setCurrentPage] = useState(1)

  const router = useRouter()

  //barra busqueda
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredDoctors, setFilteredDoctors] = useState([])
  const [confirm, setConfirm] = useState<boolean>(false)

  const totalPages = Math.ceil(filteredDoctors.length / ITEMS_PER_PAGE)

  useEffect(() => {
    fetch("https://api.tumed.com.ar/doctors")
      .then((response) => response.json())
      .then((data) => setDoctors(data))
      .catch((error) => console.error("Error fetching data:", error))
  }, [])

  const deleteDoctor = async (id: number, isConfirm: boolean) => {
    if (!isConfirm) {
      return
    }

    const res = await fetch(`https://api.tumed.com.ar/doctors/${id}`, {
      method: "DELETE",
    })
    if (res.ok) {
      const newDoctors = doctors.filter(
        (doctor: Doctor) => doctor.doctorId !== id
      )
      setDoctors(newDoctors)
      toast.success("Registro eliminado exitosamente")
    }
  }

  const filterDoctors = () => {
    const filtered = doctors.filter((doctor: Doctor) => {
      const lowerSearchTerm = searchTerm.toLowerCase()
      return (
        doctor.firtName.toLowerCase().includes(lowerSearchTerm) ||
        doctor.lastname.toLowerCase().includes(lowerSearchTerm) ||
        doctor.mv.toString().includes(lowerSearchTerm)
      )
    })
    return filtered
  }

  useEffect(() => {
    const filtered = filterDoctors()
    setFilteredDoctors(filtered)
    setCurrentPage(1) // Restablece la página actual al realizar una búsqueda
  }, [searchTerm, doctors])

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE

  return (
    <div className="w-full m-5 ml-[16.875rem]">
      <Toaster closeButton richColors position="bottom-right" />
      <h2 className="mb-4 text-2xl font-bold">Listado de Médicos</h2>
      <div
        className="flex w-full p-2 mb-2 bg-white dark:bg-background dark:border-border  border-[#DADCE2] border rounded-md
        ring-4 ring-transparent focus-within:border-[#56E0DD] focus-within:ring-[#CFF6F5] dark:focus-within:ring-[#236e6b78] dark:focus-within:border-[#56E0DD]"
      >
        <input
          type="text"
          placeholder="Buscar por nombre o matrícula"
          className="w-full bg-transparent outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <MagnifyingGlassIcon className="w-5 h-5 text-gray-400" />
      </div>
      <div className="w-full overflow-hidden border dark:border-border border-gray-200 rounded-lg shadow-sm">
        <table className="w-full text-sm text-left text-gray-500 bg-white border-collapse dark:bg-background  dark:text-muted-foreground">
          <thead className="bg-gray-50 dark:bg-background">
            <tr>
              <th
                scope="col"
                className="px-6 py-4 font-medium text-gray-900 dark:text-foreground"
              >
                ID
              </th>
              <th
                scope="col"
                className="px-6 py-4 font-medium text-gray-900 dark:text-foreground"
              >
                Nombre
              </th>
              <th
                scope="col"
                className="px-6 py-4 font-medium text-gray-900 dark:text-foreground"
              >
                Matricula
              </th>
              <th
                scope="col"
                className="px-6 py-4 font-medium text-gray-900 dark:text-foreground"
              >
                Especialidad
              </th>
              <th
                scope="col"
                className="px-6 py-4 font-medium text-gray-900 dark:text-foreground"
              ></th>
            </tr>
          </thead>
          <tbody className="border-t border-gray-100 dark:border-border dark:divide-border   divide-y divide-gray-100">
            {filteredDoctors.slice(startIndex, endIndex).map((doctor: any) => (
              <tr
                key={doctor.doctorId}
                className="hover:bg-gray-50 dark:hover:bg-accent"
              >
                <td className="px-6 py-4"># {doctor.doctorId}</td>
                <td className="flex items-center gap-4 px-6 py-4">
                  <div className="relative w-8 h-8 overflow-hidden rounded-full">
                    {doctor.imageGalleries.length > 0 && (
                      <Image
                        src={doctor.imageGalleries[0].imagePath}
                        alt={`${doctor.firtName} ${doctor.lastname}`}
                        fill={true}
                        sizes="100%"
                        style={{ objectFit: "cover" }}
                        priority={true}
                      />
                    )}
                  </div>
                  {doctor.firtName} {doctor.lastname}
                </td>
                <td className="px-6 py-4">{doctor.mv}</td>
                <td className="px-6 py-4">
                  {doctor.speciality ? doctor.speciality.name : "N/A"}
                </td>
                <td className="flex items-center gap-1 px-6 py-4">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <TrashIcon className="p-1 text-red-500 bg-red-100 dark:bg-red-100/20 rounded-full cursor-pointer w-7 h-7 hover:bg-red-200" />
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          ¿Estás absolutamente seguro?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          Esta acción no se puede deshacer. Esto eliminará
                          permanentemente el registro de la base de datos.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setConfirm(false)}>
                          Cancelar
                        </AlertDialogCancel>
                        <AlertDialogAction
                          className="hover:shadow-[#F04D47]/30 hover:bg-[#ff2e27] text-white bg-[#F04D47] hover:shadow-md"
                          onClick={() => deleteDoctor(doctor.doctorId, true)}
                        >
                          Eliminar
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                  <Pencil2Icon
                    onClick={() =>
                      router.push(`/admin/medic/edit/${doctor.doctorId}`)
                    }
                    className="p-1 text-green-500 bg-green-100 dark:bg-green-100/20 rounded-full cursor-pointer w-7 h-7 hover:bg-green-200"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination controls */}
      <div className="flex items-center justify-center mt-4">
        <button
          className="border-[#DADCE2] mr-2 gap-1 border flex items-center px-4 py-2 text-sm font-semibold rounded-lg hover:bg-[#dadce23e] ease-linear duration-200 transition-all hover:shadow-sm"
          onClick={() => setCurrentPage(1)}
          disabled={currentPage === 1}
        >
          <DoubleArrowLeftIcon className="w-4 h-4" />
        </button>
        <button
          className="border-[#DADCE2] gap-1 border flex items-center px-4 py-2 text-sm font-semibold rounded-lg cursor-pointer hover:bg-[#dadce23e] ease-linear duration-200 transition-all hover:shadow-sm"
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        <span className="mx-4 text-gray-600">Página {currentPage}</span>
        <button
          className="border-[#DADCE2] gap-1 border flex items-center px-4 py-2 text-sm font-semibold rounded-lg hover:bg-[#dadce23e] ease-linear duration-200 transition-all hover:shadow-sm"
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={endIndex >= filteredDoctors.length}
        >
          Siguiente
        </button>
        <button
          className="border-[#DADCE2] ml-2 gap-1 border flex items-center px-4 py-2 text-sm font-semibold rounded-lg hover:bg-[#dadce23e] ease-linear duration-200 transition-all hover:shadow-sm"
          onClick={() => setCurrentPage(totalPages)}
          disabled={endIndex >= filteredDoctors.length}
        >
          <DoubleArrowRightIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

export default Lista
