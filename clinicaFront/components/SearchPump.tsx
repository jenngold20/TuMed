'use client'

import { useState, FormEvent, useEffect } from "react"
import { useRouter,useSearchParams } from "next/navigation"
import { MagnifyingGlassIcon } from "@radix-ui/react-icons"
import Modal2 from "./Modal2"

import { Doctor, Speciality } from "@/types/next-auth"

import { useTumedStore } from "@/store/tumedStore"

import SearchNameAndSpeciality from "./SearchNameAndSpeciality"
import { get } from "http"
import { shallow } from "zustand/shallow"
import { set } from "zod"
import DoctorCard from "./cards/DoctorCard"
import Modal3 from "./Modal3"

type Props = {
  searchParams: string,
  setSpeciality: (speciality: string) => void,
}

export default  function SearchPump() {
  const [loaded, setLoaded] = useState(false)
  const [searchFilteredDoctors, setSearchFilteredDoctors] = useState<Doctor[]>([])
  const searchParams = useSearchParams();
  console.log(searchParams)
  /*
  
  
  const name = searchParams.get("name");
  
  return (
    <div>
    The name is: {name}
    </div>
    );
  };
  */
  const [checkedSpecialities, setCheckedSpecialities] = useState<number[]>([]);

  const { doctorsByDateFiltered, doctorsByDateDone,specialitiesListCheckedStore, comboBoxList, showModal, doctors,searchDone,showModal3 } = useTumedStore((state)=>({


    doctorsByDateFiltered: state.doctorsByDateFiltered,
    doctorsByDateDone: state.doctorsByDateDone,
    specialitiesListCheckedStore: state.specialitiesListCheckedStore,
    doctors: state.doctors,
    showModal: state.showModal,
    showModal3: state.showModal3,    
    comboBoxList: state.comboBoxList,
    searchDone: state.searchSpecialityDone,
  }),shallow) 

  const {getSpecialties, getCharacteristics,getDoctors, toggleModalOn,toggleModalOff,toggleModalOn3,toggleModalOff3,
     setSpecialitiesCheckedStore,loadComboBoxList, setComboBoxList, toggleSearchSpecialityDoneOn} = useTumedStore()
  const [search, setSearch] = useState('')
  const [submited, setSubmited] = useState(false)
  const router = useRouter()
  
  const [specialityList, setSpecialityList] = useState<string[]>([""])
  //const [showFormModal, setShowFormModal] = useState(false);
  
  // ComboMagic
  const [speciality, setEspeciality] = useState('')
  
  
  
  
  const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    //setEspeciality("")
    //console.log("Form submitted: name = ");
    
    //console.log(`specialidades chequeadas: ${checkedSpecialities}`)
    //console.log(`specialidades buscada: ${speciality}`)
    
    let searchSpeciality = ""
    for(let i=0; i<checkedSpecialities.length; i++){
      if(i==0){
        searchSpeciality = checkedSpecialities[i].toString()
      }else{
        searchSpeciality = searchSpeciality +","+ checkedSpecialities[i].toString()
      }
    }
    
    //console.log(`busqueda filtrada buscada: ${speciality}`)
    //console.log(`lista de doctores filtrado ${searchFilteredDoctors}`	)
    /*
    const doctorsWithMatchingSpecialties = searchFilteredDoctors.filter((doctor) => {
      const fullName = doctor.firstName + " " + doctor.lastName;
      return fullName === doctor.specialty;
    });
    */

    // check if searchFilteredDoctors is empty
    if(searchFilteredDoctors.length === 0 || undefined){
      //console.log(doctors)
      setSearchFilteredDoctors(
        doctors.filter((doctor) => {
          const fullName = doctor.firtName + " " + doctor.lastname;
          return fullName === speciality;
        })
      );
    }else{
      setSearchFilteredDoctors(
        searchFilteredDoctors.filter((doctor) => {
          const fullName = doctor.firtName + " " + doctor.lastname;
          return fullName === speciality;
        })
      );
    }
    // check if date filtered
    /*
    if(dateFilteredDoctors.length === 0 || undefined){

    */
    toggleSearchSpecialityDoneOn()
        //router.push(`/${speciality}/`)
  }
  
  
  useEffect(() => {
    getCharacteristics()
    getSpecialties()    
    getDoctors()
    const timer = setTimeout(() => {
      // Do something after 3 seconds
      loadComboBoxList()
      setLoaded(true)
      console.log(`list of comboBoxList in SearchPump: ${comboBoxList}`)
    }, 2000);
    
  }, [])
  //onst dermatologists = doctors.filter((doctor) => doctor.specialty === "Dermatology");
  useEffect(()=>{
    setLoaded(false)
    let filteredDoctorsNames: any = [];
    let filteredDoctors: any = [];
    doctors
    if(doctorsByDateDone){
      filteredDoctors = doctorsByDateFiltered

    }
    doctors.filter((doctor)=>{
      specialitiesListCheckedStore.forEach((speciality)=>{
        if(doctor.speciality.name === speciality){
          filteredDoctorsNames.push(`${doctor.firtName} ${doctor.lastname}`) 
          filteredDoctors.push(doctor)
          console.log(doctor)         
        }
      }) 
    })
    
    setComboBoxList(filteredDoctorsNames)
    setSearchFilteredDoctors(filteredDoctors)

    const timer = setTimeout(() => { 
      setLoaded(true)
      console.log(`list of comboBoxList in SearchPump: filtrado ${comboBoxList}`)
    }, 1000);
  },[specialitiesListCheckedStore,doctorsByDateFiltered])
  
  
  
  
  
  return (
    <>
      <div className="flex flex-col gap-8 border border-[#358492] dark:border-[#202020] bg-white dark:bg-black max-w-[75%] mx-auto rounded-lg shadow-[0_3px_0_0_rgba(0,0,0,0.1)] w-full p-4">
        <h2 className="text-2xl font-bold">
          Busca un especialista o por especialidad
        </h2>
        <form onSubmit={handleSubmit} className="flex justify-center md:justify-between">
          <div className="flex flex-col w-full">
            <div
              className=" flex w-full p-1 pl-2 bg-white dark:bg-black dark:border-[#202020]  border-[#DADCE2] border  text-sm  rounded-lg
              ring-4 ring-transparent focus-within:border-[#56E0DD] focus-within:ring-[#CFF6F5] dark:focus-within:border-[#56E0DD] dark:focus-within:ring-[#56e0de13]"
              >
              {
                /*
              <input
                name="search bar"
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="ej: Martin Perez, ej: Pediatria"
                className="w-full bg-transparent outline-none"
                />
              <button
                type="submit"
                className="cursor-pointer flex items-center w-fit text-sm px-4 py-2 text-white bg-[#57B6C6] font-semibold transition-all duration-200 ease-linear rounded-md hover:shadow-lg hover:shadow-[#57B6C6]/30 hover:bg-[#64c9db]"
                >
                {submited === true ? (
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
                */
              }
              {
                loaded ?
                (
                <>
                
                  <SearchNameAndSpeciality speciality={speciality} setSpeciality={setEspeciality}/>
                  <button
                    type="submit"                
                    className="cursor-pointer flex items-center  w-fit text-sm px-4 py-2 text-white bg-[#57B6C6] font-semibold transition-all duration-200 ease-linear rounded-md hover:shadow-lg hover:shadow-[#57B6C6]/30 hover:bg-[#64c9db]"
                    >
                    Buscar
                  </button>
                </>
                ) : (
                  <div>
                    Seleccionando los mejores especialistas para atenderte  
                  </div>
                )
              }
              
            </div>
            <div className="flex w-full justify-between ">
              { //className="mt-2 grid  sm:grid-cols-2 md:grid-cols-3    sm:gap-x-6 gap md:gap-x-10 lg:gap-x-20  xl:gap-x-36 mx-auto"
              }
                <div className="w-1/2 justify-center">
                
                  <div 
                    className="sm:ml-[40%] mr-[10%] cursor-pointer flex items-center w-fit text-xs sm:text-sm px-2 sm:px-4 h-10 mt-4 text-white bg-[#57B6C6] font-semibold transition-all duration-200 ease-linear rounded-md hover:shadow-lg hover:shadow-[#57B6C6]/30 hover:bg-[#64c9db]"
                    onClick={()=>toggleModalOn()}>Filtrar especialidad

                  </div>
                  <Modal2 show={showModal} onClose={()=>toggleModalOff()} />
                   
                </div>
              
              <div className="flex flex-col w-1/2 justify-center">
                
                <div 
                  className="sm:mr-[50%] cursor-pointer flex items-center w-fit text-xs sm:text-sm px-2 sm:px-4 h-10 mt-4 text-white bg-[#57B6C6] font-semibold transition-all duration-200 ease-linear rounded-md hover:shadow-lg hover:shadow-[#57B6C6]/30 hover:bg-[#64c9db]"
                  onClick={()=>toggleModalOn3()}>Seleccionar Fechas
                </div>
                <div className="w-1/12">

                  <Modal3 show={showModal3} onClose={()=>toggleModalOff3()} >

                  </Modal3>                
                </div>
                
                
              </div>
            </div>
          </div>
        </form>
      </div>
      
      {
        /*

          <div className="z-10">
            <Modal2  isVisible={showFormModal} onClose={handleModal}>      
              <div className="grid grid-cols-3">
                <div 
                  className="mt-2  cursor-pointer flex items-center w-fit text-sm px-4 py-2 text-white bg-[#57B6C6] font-semibold transition-all duration-200 ease-linear rounded-md hover:shadow-lg hover:shadow-[#57B6C6]/30 hover:bg-[#64c9db]"
                  id="1"
                  onClick={(e)=>handleSelectSpeciality(e)}>
                  Pediatría
                </div>
                <div 
                  className="mt-2  cursor-pointer flex items-center w-fit text-sm px-4 py-2 text-white bg-[#57B6C6] font-semibold transition-all duration-200 ease-linear rounded-md hover:shadow-lg hover:shadow-[#57B6C6]/30 hover:bg-[#64c9db]"
                  id="2" onClick={(e)=>handleSelectSpeciality(e)}>
                  Traumatología
                </div>                
                <div 
                  className="mt-2  cursor-pointer flex items-center w-fit text-sm px-4 py-2 text-white bg-[#57B6C6] font-semibold transition-all duration-200 ease-linear rounded-md hover:shadow-lg hover:shadow-[#57B6C6]/30 hover:bg-[#64c9db]"
                  id="3" onClick={(e)=>handleSelectSpeciality(e)}>
                  Obstetricia
                </div>
                <div
                  className="mt-2  cursor-pointer flex items-center w-fit text-sm px-4 py-2 text-white bg-[#57B6C6] font-semibold transition-all duration-200 ease-linear rounded-md hover:shadow-lg hover:shadow-[#57B6C6]/30 hover:bg-[#64c9db]"
                  id="4" onClick={(e)=>handleSelectSpeciality(e)}>
                  Dermatología
                </div>
                <div 
                  className="mt-2  cursor-pointer flex items-center w-fit text-sm px-4 py-2 text-white bg-[#57B6C6] font-semibold transition-all duration-200 ease-linear rounded-md hover:shadow-lg hover:shadow-[#57B6C6]/30 hover:bg-[#64c9db]"
                  id="5" onClick={(e)=>handleSelectSpeciality(e)}>
                  Otorrinolaringología
                </div>
                <div 
                  className="mt-2  cursor-pointer flex items-center w-fit text-sm px-4 py-2 text-white bg-[#57B6C6] font-semibold transition-all duration-200 ease-linear rounded-md hover:shadow-lg hover:shadow-[#57B6C6]/30 hover:bg-[#64c9db]"
                  id="1057" onClick={(e)=>handleSelectSpeciality(e)}>
                  Cardiología
                </div>
                
                
              </div>

            </Modal2>

          
          </div>
        */
      }
      { (searchDone|| doctorsByDateDone) && (
      <div className="max-w-[85%] mx-auto mt-10">
        <h2 className="text-2xl font-bold">Resultados de la busqueda</h2>
          <p className="mb-4 text-lg text-[#727A88] max-w-xl">
            Se encontraron en total {`${searchFilteredDoctors.length}`} profesionales.
          </p>
          <section className="grid grid-rows-2 gap-4 sm:grid-cols-2  lg:grid-cols-4 z-10">
            { searchFilteredDoctors.map((doctor: any) => (
              <DoctorCard key={doctor.doctorId} doctor={doctor} />
            ))}
              
            
          </section>
        </div>
      )
      }
    </>
  )
}