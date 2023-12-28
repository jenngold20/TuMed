import { useState } from "react";
import { useTumedStore } from "@/store/tumedStore"
import { useEffect } from "react"
import { shallow } from "zustand/shallow"
import { Speciality, Characteristic } from "@/types/next-auth"
import Spinner from "./Spinner";
import { spec } from "node:test/reporters";
// Form component
const Form = () => {
  const [name, setName] = useState("");
  const [checked, setChecked] = useState(false);
  const [checkedSpecialities, setCheckedSpecialities] = useState<number[]>([]);
  const [checkedSpecialitiesString, setCheckedSpecialitiesString] = useState<string[]>([]);
  const [checkedCharacteristic, setCheckedCharacteristic] = useState<number[]>([]);
   // on Submit store values in Store close modal
  
  const {specialities, characteristics, specialitiesListCheckedStore, comboBoxList } = useTumedStore((state)=>({
    specialities: state.specialties,
    characteristics: state.characteristics,
    specialitiesListCheckedStore: state.specialitiesListCheckedStore,
    showModal: state.showModal,    
    comboBoxList: state.comboBoxList,
  }),shallow) 
  const {getSpecialties, getCharacteristics,toggleModal,toggleModalOff, setSpecialitiesCheckedStore, toggleSearchSpecialityDoneOn} = useTumedStore()

  const handleSpecialityChange = (specialityId: number, specialityName: string, checked: boolean) => {
    console.log(specialityName)
    if (checked) {
      setCheckedSpecialities([...checkedSpecialities, specialityId]);
      setCheckedSpecialitiesString([...checkedSpecialitiesString, specialityName]);

    } else {
      setCheckedSpecialities(checkedSpecialities.filter((id) => id !== specialityId));
      setCheckedSpecialitiesString(checkedSpecialitiesString.filter((name) => name !== specialityName));
   
    }
  }; 
  useEffect(()=>{
    //getSpecialties()
    //getCharacteristics()
    setCheckedSpecialitiesString(specialitiesListCheckedStore)
    console.log(specialitiesListCheckedStore)

    //console.log('specialities',specialities)
  },[])
  const handleCharacteristicChange = (characteristicId: number, checked: boolean) => {
    if (checked) {
      setCheckedCharacteristic([...checkedCharacteristic, characteristicId]);
    } else {
      setCheckedCharacteristic(checkedCharacteristic.filter((id) => id !== characteristicId));
    }
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault()
    toggleModalOff()
    toggleSearchSpecialityDoneOn()
    //console.log(checkedSpecialities)
    setSpecialitiesCheckedStore(checkedSpecialitiesString)
    //console.log(checkedSpecialitiesString)
    
    //console.log(checkedCharacteristic)
    //console.log("Form submitted: name = " + name + ", checked = " + checked);
    //console.log(specialitiesListCheckedStore)
  };
  useEffect(()=>{
    const timer = setTimeout(() => {
      // Do something after 3 seconds
      
      //console.log(`list of comboBoxList in Form: ${comboBoxList}`)
    }, 6000);
  },[])
  return (
    <div className="px-5 ">

    
     
      <h1 className="text-2xl text-center font-semibold m-5">Seleccione la Especialidad</h1>

      { 
        specialities.length === 0 ? (        
          <div className="">
          <Spinner  ></Spinner>
        </div>
          )
            :
          
          <div className="mt-2 grid  sm:grid-cols-2 md:grid-cols-3    sm:gap-x-6 gap md:gap-x-10 lg:gap-x-20  xl:gap-x-36 mx-auto">
            {


              specialities.map((speciality: Speciality) => (
                <div key={speciality.specialityId} className="w-8/12 sm:w-full mx-[10%] sm:mx-0 mt-4 cursor-pointer flex items-center text-sm  text-white bg-[#57B6C6] font-semibold transition-all duration-200 ease-linear rounded-md hover:shadow-lg hover:shadow-[#57B6C6]/30 hover:bg-[#64c9db]">
                  <label className="flex items-center space-x-2 lg:space-x-6 w-full px-4 py-2 ">
                    <input
                      name={speciality.specialityId.toString()}
                      type="checkbox"
                      className="form-checkbox h-5 w-5 text-blue-600"
                      checked={checkedSpecialitiesString.includes(speciality.name)}
                      onChange={(event) => handleSpecialityChange(speciality.specialityId, speciality.name,event.target.checked)}
                      />
                    <span className="text-white text-xs">{speciality.name}</span>
                  </label>
                </div>            
              ))
            }

          </div>
      }
        
        
      { /*
      <h1 className="text-2xl text-center font-semibold m-5">Seleccione la Caracteristica</h1>
      characteristics.length === 0 ? (<Spinner ></Spinner>) :
          <div className="mt-2 grid  sm:grid-cols-2 md:grid-cols-3    sm:gap-x-6 gap md:gap-x-10 lg:gap-x-20  xl:gap-x-36 mx-auto">
            {characteristics.map((characteristic: Characteristic) => (
              <div key={characteristic.characteristicId} className="w-8/12 sm:w-full mx-[10%] sm:mx-0 mt-4 cursor-pointer flex items-center text-sm  text-white bg-[#57B6C6] font-semibold transition-all duration-200 ease-linear rounded-md hover:shadow-lg hover:shadow-[#57B6C6]/30 hover:bg-[#64c9db]">
                <label className="flex items-center space-x-2 lg:space-x-6 w-full px-4 py-2 ">
                  <input
                    name={characteristic.characteristicId.toString()}
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-blue-600"
                    checked={checkedCharacteristic.includes(characteristic.characteristicId)}
                    onChange={(event) => handleCharacteristicChange(characteristic.characteristicId, event.target.checked)}
                    />
                  <span className="text-white text-xs">{characteristic.name}</span>
                </label>
              </div>
            ))
            }
          </div>
          */
      }
      
      <div className="flex w-full justify-between">

        <button 
          className="cursor-pointer m-10 flex items-center w-fit text-sm px-4 py-2 text-white bg-[#57B6C6] font-semibold transition-all duration-200 ease-linear rounded-md hover:shadow-lg hover:shadow-[#57B6C6]/30 hover:bg-[#64c9db]"
          onClick={() => toggleModalOff()}>Cancelar</button>
        <button 
          className="cursor-pointer m-10 flex items-center w-fit text-sm px-4 py-2 text-white bg-[#57B6C6] font-semibold transition-all duration-200 ease-linear rounded-md hover:shadow-lg hover:shadow-[#57B6C6]/30 hover:bg-[#64c9db]"
          onClick={e => handleSubmit(e)}>Aceptar</button>
      </div>
  
    
    
    </div>
  );
};
export default Form;