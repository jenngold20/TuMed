import { CalendarIcon, PersonIcon } from "@radix-ui/react-icons"

const Hero = () => {
  return (
    <section className="flex min-h-fit h-[calc(100vh-50px)] mx-auto max-w-[85%] w-full">
      <div className="flex items-start justify-between w-full">
        <div className="flex flex-col self-center max-w-lg mt-36">
          <h1 className="max-w-2xl font-extrabold lg:text-4xl xl:text-5xl xl:leading-none">
            La atención Médica nunca fue tan Fácil.
          </h1>
          <p className="leading-[1.4] text-xl mt-2 text-[#727A88]">
            Transformando la experiencia Médica: Acceso más Sencillo, Atención
            más Cercana.
          </p>
          <div className="flex flex-col mt-6 gap-4 text-[#727A88] font-medium">
            <div className="flex items-center">
              <CalendarIcon className="w-5 h-5 mr-3 text-[#F04D47]" />
              <p>Reserva en línea fácilmente</p>
            </div>
            <div className="flex items-center">
              <PersonIcon className="w-5 h-5 mr-3 text-[#F04D47]" />
              <p>Atendido directamente por Expertos</p>
            </div>
          </div>
          <div className="flex mt-8 space-x-2">
            <button className="w-fit px-4 py-2 text-sm text-white bg-[#F04D47] font-semibold transition-all duration-200 ease-linear rounded-lg hover:shadow-lg hover:shadow-[#F04D47]/30 hover:bg-[#ff2e27]">
              Consultar ahora
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
