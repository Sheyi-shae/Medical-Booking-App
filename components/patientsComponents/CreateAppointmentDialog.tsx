
"use client";

import {  Checkbox, Modal} from "flowbite-react";
import { useState } from "react";
import { Button } from "@/components/ui/button"


 
import AppointmentForm from "./AppointmentForm"
import { DoctorsFilter } from "@/lib/types";
import { useSession } from "next-auth/react";

//form





export function CreateAppointDialog({doctors=[]}:DoctorsFilter) {
  const [openModal, setOpenModal] = useState(false);
  const {data:session}=useSession()
  const isVerified =session?.user.isVerified
   function onCloseModal() {
    setOpenModal(false);

  }
  //form
  

  return (
    <>
        <Button disabled={!isVerified}  onClick={() => setOpenModal(true)} className="text-white bg-gradient-to-r from-cyan-500
       to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none
        focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-sm 
         text-sm px-5 py-2.5 text-center me-2 mb-2">Book Appointment</Button>
     
        
        
    
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
      <Modal.Header>Create an Appointment </Modal.Header>
      <Modal.Body>
        
        <AppointmentForm doctors={doctors} onclose={onCloseModal}/>
        <br/>
      </Modal.Body>
      
    </Modal>
    </>
  )
}
