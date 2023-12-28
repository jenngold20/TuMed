'use client'
import { es } from 'date-fns/locale';

import React, { useState } from 'react';

import { addDays, format, addMonths, isSameMonth } from 'date-fns';
import { DateRange, DayPicker } from 'react-day-picker';
import { useTumedStore } from '@/store/tumedStore';
import shallow from 'zustand/shallow';
import { fetchDoctorsByAppointments } from '@/lib/getSearchResult';
import { Doctor } from '@/types/next-auth';

const pastMonth = new Date(2020, 10, 15);


export default function App() {
  const defaultSelected: DateRange = {
    from: pastMonth,
    to: addDays(pastMonth, 4)
  };
  const [doctorFilteredByDate,setDoctorFilteredByDate] = useState<Doctor[]>([])
  const [doctorFilteredByDateDone,setDoctorFilteredByDateDone] = useState<boolean>(false)
  const [range, setRange] = useState<DateRange | undefined>(defaultSelected);

  const { } = useTumedStore((state)=>({
    specialities: state.specialties,
    characteristics: state.characteristics,
    specialitiesListCheckedStore: state.specialitiesListCheckedStore,
    showModal: state.showModal,    
    comboBoxList: state.comboBoxList,
  }),shallow) 
  const {setDoctorsByDateDone, setDoctorsByDateFiltered} = useTumedStore()


  const clicHandler = (e: any) => {
    e.preventDefault()
    toggleModalOff3()
    console.log(range)
    if(range?.from && range?.to) {
      const formattedDateFrom = format(range.from, 'yyyy-MM-dd', { locale: es });
      const formattedDateTo = format(range.to, 'yyyy-MM-dd', { locale: es });
      fetchDoctorsByAppointments(formattedDateFrom, formattedDateTo)
        .then((doctors) => {
          console.log(doctors);
          setDoctorFilteredByDate(doctors);
          setDoctorsByDateDone(true)
          setDoctorsByDateFiltered(doctors)
          setDoctorFilteredByDateDone(true);
          
         
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
        setDoctorFilteredByDateDone(false);
        setDoctorFilteredByDate([]);
        setDoctorsByDateDone(false)
        setDoctorsByDateFiltered([])       
    }
    
  }
   

  let footer = <p>Please pick the first day.</p>;
  if (range?.from) {
    if (!range.to) {
      footer = <p>{format(range.from, 'PPP')}</p>;
    } else if (range.to) {
      footer = (
        <p>          
          {format(range.from, 'yyyy/MM/dd', { locale: es })}–{format(range.to, 'yyyy/MM/dd', { locale: es })}
        </p>
      );
    }
  }

  const {specialities, characteristics, specialitiesListCheckedStore, comboBoxList } = useTumedStore((state)=>({
    specialities: state.specialties,
    characteristics: state.characteristics,
    specialitiesListCheckedStore: state.specialitiesListCheckedStore,
    showModal: state.showModal,    
    comboBoxList: state.comboBoxList,
  }),shallow) 
  const {getSpecialties, getCharacteristics,toggleModal3,toggleModalOff3, setSpecialitiesCheckedStore, toggleSearchSpecialityDoneOn} = useTumedStore()


  return (
    <div className='w-fit'>
      <DayPicker
        
        locale={es}
        id="test"
        mode="range"
        defaultMonth={pastMonth}
        selected={range}
        footer={""}
        onSelect={setRange}
      />
      <div className="flex  justify-between">

        <button 
          className="cursor-pointer m-10 flex items-center w-fit text-sm px-4 py-2 text-white bg-[#57B6C6] font-semibold transition-all duration-200 ease-linear rounded-md hover:shadow-lg hover:shadow-[#57B6C6]/30 hover:bg-[#64c9db]"
          onClick={() => toggleModalOff3()}>
            Cancelar
        </button>
        <button 
          className="cursor-pointer m-10 flex items-center w-fit text-sm px-4 py-2 text-white bg-[#57B6C6] font-semibold transition-all duration-200 ease-linear rounded-md hover:shadow-lg hover:shadow-[#57B6C6]/30 hover:bg-[#64c9db]"
          onClick={e => clicHandler(e)}>
            Aceptar
        </button>
      </div>


    </div>
  );
}