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
import { Button } from "@/components/ui/button"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
  MagnifyingGlassIcon,
  TrashIcon,
} from "@radix-ui/react-icons"
import React, { useState, useEffect } from "react"
import { Toaster, toast } from "sonner"

const ITEMS_PER_PAGE = 10

const Lista = () => {
  const [users, setUsers] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [position, setPosition] = useState("user")

  const [isAdmin, setIsAdmin] = useState(false)

  const toggleRole = () => {
    setIsAdmin((prevIsAdmin) => !prevIsAdmin)
  }

  //barra busqueda
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredUsers, setFilteredUsers] = useState([])
  const [confirm, setConfirm] = useState<boolean>(false)

  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE)

  useEffect(() => {
    fetch("https://api.tumed.com.ar/auth/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching data:", error))
  }, [])

  const deleteUser = async (id: number, isConfirm: boolean) => {
    if (!isConfirm) {
      return
    }

    const res = await fetch(`https://api.tumed.com.ar/auth/delete/${id}`, {
      method: "DELETE",
    })
    if (res.ok) {
      const newUsers = users.filter((user: any) => user.id !== id)
      setUsers(newUsers)
      toast.success("Registro eliminado exitosamente")
    }
  }

  const filterUsers = () => {
    const filtered = users.filter((user: any) => {
      const lowerSearchTerm = searchTerm.toLowerCase()
      return (
        user.email?.toLowerCase().includes(lowerSearchTerm) ||
        user.firstName.toLowerCase().includes(lowerSearchTerm) ||
        user.lastName.toLowerCase().includes(lowerSearchTerm)
      )
    })
    return filtered
  }

  useEffect(() => {
    const filtered = filterUsers()
    setFilteredUsers(filtered)
    setCurrentPage(1) // Restablece la página actual al realizar una búsqueda
  }, [searchTerm, users])

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE

  const changeRole = async (id: any) => {
    console.log(id)
    try {
      const res = await fetch(
        `https://api.tumed.com.ar/auth/chageRole/${id}`,
        {
          method: "GET",
        }
      )
      console.log(res)
      if (res.ok) {
        const newUsers = users.filter((user: any) => user.id !== id)
        setUsers(newUsers)
        toast.success("Rol cambiado exitosamente")
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="w-full m-5 ml-[16.875rem]">
      <Toaster closeButton richColors position="bottom-right" />
      <h2 className="mb-4 text-2xl font-bold">Listado de Usuarios</h2>
      <div
        className="flex w-full p-2 mb-2 bg-white  border-[#DADCE2] border rounded-md
          ring-4 ring-transparent focus-within:border-[#56E0DD] focus-within:ring-[#CFF6F5]"
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
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Email
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Rol
              </th>
              <th
                scope="col"
                className="px-6 py-4 font-medium text-gray-900"
              ></th>
            </tr>
          </thead>
          <tbody className="border-t border-gray-100 divide-y divide-gray-100">
            {filteredUsers.slice(startIndex, endIndex).map((user: any) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4"># {user.id}</td>
                <td className="gap-4 px-6 py-4">
                  {user.firstName} {user.lastName}
                </td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">
                  <Button
                    variant="outline"
                    className="text-sm"
                    onClick={() => changeRole(user.id)}
                  >
                    {user.role === "ROLE_ADMIN" ? "Administrador" : "Usuario"}
                  </Button>
                </td>
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
                          onClick={() => deleteUser(user.id, true)}
                        >
                          Eliminar
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
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
          disabled={endIndex >= filteredUsers.length}
        >
          Siguiente
        </button>
        <button
          className="border-[#DADCE2] ml-2 gap-1 border flex items-center px-4 py-2 text-sm font-semibold rounded-lg hover:bg-[#dadce23e] ease-linear duration-200 transition-all hover:shadow-sm"
          onClick={() => setCurrentPage(totalPages)}
          disabled={endIndex >= filteredUsers.length}
        >
          <DoubleArrowRightIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

export default Lista
