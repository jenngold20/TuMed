"use client"
import { MagnifyingGlassIcon } from "@radix-ui/react-icons"
import { useState } from "react"

const Search = () => {
  const [isClick, setIsClick] = useState(false)

  return (
    <div className="flex flex-col gap-8 border border-[#358492] dark:border-border bg-white dark:bg-background max-w-[75%] mx-auto rounded-lg shadow-[0_3px_0_0_rgba(0,0,0,0.1)] w-full p-4">
      <h2 className="text-2xl font-bold">
        Busca un especialista o por especialidad
      </h2>
      <div className="flex space-x-4">
        <div
          className="flex w-full p-1 pl-2 bg-white dark:bg-black dark:border-[#202020]  border-[#DADCE2] border  text-sm  rounded-lg
          ring-4 ring-transparent focus-within:border-[#56E0DD] focus-within:ring-[#CFF6F5] dark:focus-within:border-[#56E0DD] dark:focus-within:ring-[#56e0de13]"
        >
          <input
            type="text"
            placeholder="ej: Martin Perez, ej: Pediatria"
            className="w-full bg-transparent outline-none"
          />
          <button
            onClick={() => setIsClick(true)}
            className="cursor-pointer flex items-center w-fit text-sm px-4 py-2 text-white bg-[#57B6C6] font-semibold transition-all duration-200 ease-linear rounded-md hover:shadow-lg hover:shadow-[#57B6C6]/30 hover:bg-[#64c9db]"
          >
            {isClick === true ? (
              <div className="flex items-center hover:cursor-not-allowed disabled">
                <div className="w-5 h-5 border-2 border-white border-solid rounded-full border-t-transparent animate-spin"></div>
                <div className="ml-2"> Buscando... </div>
              </div>
            ) : (
              <>
                <MagnifyingGlassIcon className="w-5 h-5" />
                <span>Buscar</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Search
