import Image from "next/image"
import React from "react"

const Ads = () => {
  return (
    <div className="flex-col hidden w-full gap-4 mx-auto sm:flex">
      <div
        className="flex items-center gap-4 justify-between cursor-pointer border border-[#DADCE2] dark:border-[#202020]
                    ease-linear duration-200 transition-all shadow-sm
                    rounded-md h-32 bg-gradient-to-l from-[#a7e3ee] dark:from-[#4ed3ea] to-white dark:to-background p-4 px-6"
      >
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-[#c0f6ff] p-2 relative">
            <Image
              src="/Headphone.svg"
              alt="headphone"
              fill={true}
              style={{ objectFit: "contain" }}
              className="scale-75"
            />
          </div>
          <div className="flex flex-col max-w-sm lg:max-w-full">
            <h3 className="text-lg lg:text-2xl font-bold">
              Tu Médico a tu alcance, ¡agenda con atención personalizada!
            </h3>
            <p className="text-sm lg:text-base text-[#727A88] dark:text-[#aab0bb]">
              Ya sea que necesites agendar una consulta de rutina o una visita
              especializada.
            </p>
          </div>
        </div>
        <button className="text-sm lg:text-base cursor-pointer flex items-center dark:bg-white dark:text-black  px-4 py-2 lg:px-6 lg:py-3 text-white bg-[#57B6C6] font-semibold transition-all duration-200 ease-linear rounded-full hover:shadow-lg hover:shadow-[#57B6C6]/30 hover:bg-[#64c9db]">
          Solicitar atención
        </button>
      </div>
    </div>
  )
}

export default Ads
