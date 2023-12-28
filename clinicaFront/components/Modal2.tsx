import React from 'react'
import Form from './Form'
interface ModalProps {
  
  onClose: () => void;
  show: boolean;
  children?: React.ReactNode;
}

export default function Modal2({ show, onClose, children }: ModalProps) {
  if(!show) return (<></>)
  const handleClose = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if(e.target === e.currentTarget) {
      onClose()
    }
  }
  return (
    <div 
      className='z-50  modal fixed inset-0 bg-black transition-all bg-opacity-25 backdrop-blur-sm flex justify-center items-center'
      id="wrapper" onClick={handleClose}
      >

      <div className='modal-content w-3/4 flex flex-col'>
        <button onClick={()=>onClose()} className='text-white place-self-end mr-2 mb-2 p-'>X</button>
        <div className='bg-white text-xl text-slate-800 rounded-lg '>
          <Form></Form>
          
        </div>
      </div>
    </div>
    
  );
}
