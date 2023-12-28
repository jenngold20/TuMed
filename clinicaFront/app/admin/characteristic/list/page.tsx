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

import {
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
  MagnifyingGlassIcon,
  Pencil2Icon,
  TrashIcon,
} from "@radix-ui/react-icons"
import { useRouter } from "next/navigation"
import React, { useState, useEffect } from "react"
import { Toaster, toast } from "sonner"

const ITEMS_PER_PAGE = 10

const Lista = () => {
  const [characteristics, setCharacteristics] = useState([])
  const [currentPage, setCurrentPage] = useState(1)

  const router = useRouter()

  //barra busqueda
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredCharacteristics, setFilteredCharacteristics] = useState([])
  const [confirm, setConfirm] = useState<boolean>(false)

  const totalPages = Math.ceil(filteredCharacteristics.length / ITEMS_PER_PAGE)

  useEffect(() => {
    fetch("https://api.tumed.com.ar/characteristics")
      .then((response) => response.json())
      .then((data) => setCharacteristics(data))
      .catch((error) => console.error("Error fetching data:", error))
  }, [])

  const deleteCharacteristic = async (id: number, isConfirm: boolean) => {
    if (!isConfirm) {
      return
    }

    const res = await fetch(`https://api.tumed.com.ar/characteristics/${id}`, {
      method: "DELETE",
    })
    if (res.ok) {
      const newCharacteristics = characteristics.filter(
        (characteristic: any) => characteristic.characteristicId !== id
      )
      setCharacteristics(newCharacteristics)
      toast.success("Registro eliminado exitosamente")
    }
  }

  const filterCharacteristics = () => {
    const filtered = characteristics.filter((characteristic: any) => {
      const lowerSearchTerm = searchTerm.toLowerCase()
      return characteristic.name.toLowerCase().includes(lowerSearchTerm)
    })
    return filtered
  }

  useEffect(() => {
    const filtered = filterCharacteristics()
    setFilteredCharacteristics(filtered)
    setCurrentPage(1) // Restablece la página actual al realizar una búsqueda
  }, [searchTerm, characteristics])

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE

  return (
    <div className="w-full m-5 ml-[16.875rem]">
      <Toaster closeButton richColors position="bottom-right" />
      <h2 className="mb-4 text-2xl font-bold">Listado de Caracteristicas</h2>
      <div
        className="flex w-full p-2 mb-2 bg-white  border-[#DADCE2] border rounded-md
          ring-4 ring-transparent focus-within:border-[#56E0DD] focus-within:ring-[#CFF6F5]"
      >
        <input
          type="text"
          placeholder="Buscar caracteristica..."
          className="w-full bg-transparent outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <MagnifyingGlassIcon className="w-5 h-5 text-gray-400" />
      </div>
      <div className="w-full overflow-hidden border border-gray-200 rounded-lg shadow-sm">
        <table className="w-full text-sm text-left text-gray-500 bg-white border-collapse">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                ID
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Nombre
              </th>
              <th
                scope="col"
                className="px-6 py-4 font-medium text-gray-900"
              ></th>
              <th
                scope="col"
                className="px-6 py-4 font-medium text-gray-900"
              ></th>
              <th
                scope="col"
                className="px-6 py-4 font-medium text-gray-900"
              ></th>
            </tr>
          </thead>
          <tbody className="border-t border-gray-100 divide-y divide-gray-100">
            {filteredCharacteristics
              .slice(startIndex, endIndex)
              .map((characteristic: any) => (
                <tr
                  key={characteristic.characteristicId}
                  className="hover:bg-gray-50"
                >
                  <td className="px-6 py-4">
                    # {characteristic.characteristicId}
                  </td>
                  <td className="flex items-center gap-4 px-6 py-4">
                    <div className="relative w-8 h-8 overflow-hidden rounded-full"></div>
                    {characteristic.name}
                  </td>
                  <td className="px-6 py-4"></td>
                  <td className="px-6 py-4"></td>
                  <td className="flex items-center gap-1 px-6 py-4">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <TrashIcon className="p-1 text-red-500 bg-red-100 rounded-full cursor-pointer w-7 h-7 hover:bg-red-200" />
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
                            onClick={() =>
                              deleteCharacteristic(
                                characteristic.characteristicId,
                                true
                              )
                            }
                          >
                            Eliminar
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                    <Pencil2Icon
                      onClick={() =>
                        router.push(
                          `/admin/characteristic/edit/${characteristic.characteristicId}`
                        )
                      }
                      className="p-1 text-green-500 bg-green-100 rounded-full cursor-pointer w-7 h-7 hover:bg-green-200"
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
          disabled={endIndex >= filteredCharacteristics.length}
        >
          Siguiente
        </button>
        <button
          className="border-[#DADCE2] ml-2 gap-1 border flex items-center px-4 py-2 text-sm font-semibold rounded-lg hover:bg-[#dadce23e] ease-linear duration-200 transition-all hover:shadow-sm"
          onClick={() => setCurrentPage(totalPages)}
          disabled={endIndex >= filteredCharacteristics.length}
        >
          <DoubleArrowRightIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

export default Lista
