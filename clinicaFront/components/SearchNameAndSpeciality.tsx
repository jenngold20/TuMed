'use client'

import { Combobox, Transition } from '@headlessui/react';
import Image from 'next/image';
import { useState, Fragment, FormEvent, useEffect } from 'react';
import { specialitiesConst } from '@/constants';
import { useTumedStore } from '@/store/tumedStore';
type Props = {
  speciality: string,
  setSpeciality: (speciality: string) => void,
}
const SearchNameAndSpeciality = ({speciality,setSpeciality}: Props) => {
  const [query, setQuery] = useState('') // ['query', setQuery
  
  const { comboBoxList, getSpecialties, getDoctors } = useTumedStore();
  const filteredSpecialities =
  query === "" ? 
  comboBoxList :
  comboBoxList.filter((speciality) => (
    speciality.toLowerCase()
    .replace(/\s+/g,"")
    .includes(query.toLowerCase().replace(/\s+/g,""))
    ))
  

  useEffect(()=>{
    //getSpecialties();
    //getDoctors();
    console.log('comboBoxList in searchName',comboBoxList)
    const timer = setTimeout(() => {
      // Do something after 3 seconds

      //console.log(`list of comboBoxList: ${comboBoxList}`)
    }, 6000);
    
    return () => clearTimeout(timer);
  },[] )
    
    
  return (
    <div className='flex-1 max-sm:w-full flex justify-start items-center'>
      <Combobox value={speciality} onChange={setSpeciality}>
        <div className='relative w-full'>
          <Combobox.Button className="absolute top-[14px]">              
            <Image
              src="/chevron-up-down.svg"
              width={20}
              height={20}
              alt="car logo"
              className="ml-4"
              />
          </Combobox.Button>
          <Combobox.Input
           
            className="search- w-full h-[48px] pl-12 p-4 rounded-l-full max-sm:rounded-full bg-light-white outline-none cursor-pointer text-sm"
            placeholder='Mario López, Valentin Luna, etc.'
            displayValue={(speciality: string) => speciality}
            onChange={(e)=> setQuery(e.target.value)}
            />
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
            afterLeave={()=>setQuery("")}>
            <Combobox.Options>
            {
              filteredSpecialities.map((speciality) => (
                <Combobox.Option
                key={speciality}
                className={({ active }) => 
                `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-[#57B6C6] mr-5 text-white rounded-lg' : 'text-gray-900'}`}
                value={speciality}
                >
                    {({ selected, active }) => (
                      <>
                          <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                        >
                        {speciality}
                      </span>
                      {selected ? (
                        <span
                        className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                          active ? 'text-white' : 'text-teal-600'
                        }`}
                        >
          
                        </span>
                      ) : null}
                      </>
                    )
                  }
                    
                </Combobox.Option>
            ))}

            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
     
    </div>
  )
}


export default SearchNameAndSpeciality