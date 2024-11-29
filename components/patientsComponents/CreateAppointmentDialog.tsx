
"use client";

import {  Checkbox, Modal} from "flowbite-react";
import { useState } from "react";
import { Button } from "@/components/ui/button"


 
import AppointmentForm from "./AppointmentForm"
import { DoctorsFilter } from "@/lib/types";
import { useSession } from "next-auth/react";


export function CreateAppointDialog({doctors=[]}:DoctorsFilter) {
  const [openModal, setOpenModal] = useState(false);
  const {data:session}=useSession()
  const isVerified =session?.user.isVerified
   function onCloseModal() {
    setOpenModal(false);

  }
  return (
    <>
        <Button disabled={!isVerified}  onClick={() => setOpenModal(true)} className="text-white bg-gradient-to-r from-cyan-500
       to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none
        focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-sm 
         text-sm px-5 py-2.5 text-center me-2 mb-2">Book Appointment</Button>
     
          
          {/* <Modal show={openModal} size="lg" onClose={onCloseModal} popup>
        <Modal.Header />
        
        <div className="text-blue-500 h-auto">Create an Appointment with a Specialist</div>
        <Modal.Body>
        
          <AppointmentForm doctors={doctors} onclose={onCloseModal}/>
            
            
        </Modal.Body>
      </Modal> */}
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
      <Modal.Header>Terms of Service</Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            With less than a month to go before the European Union enacts new consumer privacy laws for its citizens,
            companies around the world are updating their terms of service agreements to comply.
          </p>
          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant
            to ensure a common set of data rights in the European Union. It requires organizations to notify users as
            soon as possible of high-risk data breaches that could personally affect them.
          </p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => setOpenModal(false)}>I accept</Button>
        <Button color="gray" onClick={() => setOpenModal(false)}>
          Decline
        </Button>
      </Modal.Footer>
    </Modal>
    </>
  )
}
