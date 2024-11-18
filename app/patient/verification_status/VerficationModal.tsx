
"use client";

import { Modal} from "flowbite-react";

import { useState } from "react";
import { VerificationOTPForm } from "./OTPinput";

export function VerificationModal() {
  const [openModal, setOpenModal] = useState(true);


  function onCloseModal() {
    setOpenModal(false);
    
  }

  return (
    <>
      <button onClick={() => setOpenModal(true)}></button>
      <Modal show={openModal} size="md" onClose={onCloseModal} popup>
        <Modal.Header />
        
          <div className="space-y-6 px-3">
          <h4 className='text-2xl'>Please verify your email</h4>
          <p className='text-sm'>Please type the code sent to your registered  email</p>
          <VerificationOTPForm onclose={onCloseModal}/>
          </div>
        
      </Modal>
    </>
  );
}
