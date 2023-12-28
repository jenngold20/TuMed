import { Speciality, Characteristic, Doctor } from '@/types/next-auth';
import { any } from 'zod';

import {create} from 'zustand';

interface Post {
  id: number;
  title: string;
  body: string;
}

interface TumedStore {
  count: number;
  searchSpecialityDone: boolean;
  toggleSearchSpecialityDone: () => void;
  toggleSearchSpecialityDoneOff: () => void;
  toggleSearchSpecialityDoneOn: () => void;

  showModal: boolean;
  toggleModal: () => void;
  toggleModalOff: () => void;
  toggleModalOn: () => void;
  showModal3: boolean;
  toggleModal3: () => void;
  toggleModalOff3: () => void;
  toggleModalOn3: () => void;
  title: string;
  posts: Post[];
  specialties: Speciality[];
  getSpecialties: () => Promise<void>;
  characteristics: Characteristic[];
  getCharacteristics: () => Promise<void>;
  doctors: Doctor[];
  getDoctors: () => Promise<void>;
  increment: (value:number) => void;
  getPosts: () => Promise<void>;
  clearStore: () => void;
  specialitiesListCheckedStore: string[];
  setSpecialitiesCheckedStore: (value:string[]) => void;
  loadComboBoxList: () => void;
  comboBoxList: string[];
  setComboBoxList: (value:string[]) => void;
  addComboBoxList: (value:string) => void;
  addComboBoxListStringArray: (value: string[]) => void;
  
  appointments: string[];
  setAppointments: (value:string[]) => void;
  
  doctorsByDateFiltered: Doctor[];
  setDoctorsByDateFiltered: (value:Doctor[]) => void;
  doctorsByDateDone: boolean;
  setDoctorsByDateDone: (value:boolean) => void;
}
export const useTumedStore = create<TumedStore>((set, getState)=>({
  count: 10,
  searchSpecialityDone: false,
  toggleSearchSpecialityDone: () =>
    set((state) => ({
      searchSpecialityDone: !state.searchSpecialityDone,
    })),
  toggleSearchSpecialityDoneOff: () =>
    set((state) => ({
      searchSpecialityDone: false,
  })),
  toggleSearchSpecialityDoneOn: () =>
    set((state) => ({
      searchSpecialityDone: true,
  })),


  showModal: false,
  toggleModal: () =>
    set((state) => ({
      showModal: !state.showModal,
    })),
  toggleModalOff: () =>
    set((state) => ({
      showModal: false,
  })),
  toggleModalOn: () =>
    set((state) => ({
      showModal: true,
  })),
  
  showModal3: false,
  toggleModal3: () =>
    set((state) => ({
      showModal3: !state.showModal3,
    })),
  toggleModalOff3: () =>
    set((state) => ({
      showModal3: false,
  })),
  toggleModalOn3: () =>
    set((state) => ({
      showModal3: true,
  })),
  title: 'zustand test',
  posts: [],
  increment: (value:number) => set(state => ({
    count: state.count + value
  })),
  getPosts: async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const posts = await response.json();
    set(state => ({
      ...state,posts
    }))   
  },
  clearStore: () => {
    set({}, true);
  },
  specialties: [],
  getSpecialties: async () => {
    const response = await fetch("https://api.tumed.com.ar/specialities"); 
    const specialties = await response.json();
    set(state => ({
      ...state,specialties
    }));
  },
  characteristics: [],
  getCharacteristics: async () => {
    const response = await fetch("https://api.tumed.com.ar/characteristics");
    const characteristics = await response.json();
    set(state => ({
      ...state,characteristics
    }))
  },
  doctors: [],
  getDoctors: async () => {
    const response = await fetch("https://api.tumed.com.ar/doctors");
    const doctors = await response.json();
    set(state => ({
      ...state,doctors
    }));
  },
  specialitiesListCheckedStore: [],
  setSpecialitiesCheckedStore: (value:string[]) => set(state => ({
    ...state,specialitiesListCheckedStore: value 
  })),
  comboBoxList: [],
  setComboBoxList: (value:string[]) => set(state => ({
    ...state,comboBoxList: value
  })),
  addComboBoxList: (value:string) => set(state => ({
    ...state,comboBoxList: [...state.comboBoxList, value]
  })),
  addComboBoxListStringArray: (value:string[]) => set(state => ({
    ...state,comboBoxList: [...state.comboBoxList, ...value]
  })),
  loadComboBoxList: () => {
    const {specialties, doctors} = getState();    
    const comboList: string[] =[];
    {/*
  
    specialties.forEach(specialty => {
      comboList.push(specialty.name);
    });
  */}
    doctors.forEach(doctor => {
      //console.log(`${doctor.firtName} ${doctor.lastname}`)
      comboList.push(`${doctor.firtName} ${doctor.lastname}`);
    });
    const comboBoxList = comboList;
    set(state => ({
      comboBoxList
    }));
  },
  appointments: [],
  setAppointments: (value:string[]) => set(state => ({
    ...state,appointments: value
  })),

  doctorsByDateFiltered: [],
  setDoctorsByDateFiltered: (value:Doctor[]) => set(state => ({
    ...state,doctorsByDateFiltered: value
  })),
  doctorsByDateDone: false,
  setDoctorsByDateDone: (value:boolean) => set(state => ({
    ...state,doctorsByDateDone: value
  })),
}));

