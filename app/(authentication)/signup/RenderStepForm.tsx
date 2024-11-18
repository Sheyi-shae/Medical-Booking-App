'use client'
import React, { useState } from 'react'
import FormSteps from '@/components/forms/FormSteps'
import StepsCrumb from '@/components/StepsCrumb'
import { AlertCircle } from "lucide-react"
 
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import DoctorSignup from '@/components/forms/DoctorSignup'
import Link from 'next/link'

export default function RenderStepForm() {
    const steps=[{id:1,title:'Basic info'},
        {id:2,title:'Health info'},
        {id:3,title:'Login info'} 
      ]
      let [currentStep, setcurrentStep] = useState(1) 

      const [patient,setPatient]=useState(true)
      
      const handleNext=()=>{
        setcurrentStep((prev)=>prev + 1)
      }
      const handlePrevious=()=>{
        setcurrentStep((prev)=>prev - 1)
      }
  return (
    <div>
       {patient ? ( 
        <>
        <StepsCrumb handleNext={handleNext} 
       handlePrevious={handlePrevious} steps={steps} currentStep={currentStep} />
    <div className=' ring-1 ring-blue-200 shadow-sm rounded-sm px-2'>
      <span className='flex'>
     <h4 className='text-slate-900  font-semibold font-serif text-lg text-left'>Join CarePlus</h4><p>®</p>
     </span>
     <p className='text-slate-700 text-xs md:text-sm '>Get access to medical and mental health experts 24 hours a day, 365 days a year.</p>

     <div>

      <FormSteps
       steps={steps} 
       currentStep={currentStep}
        handleNext={handleNext} 
       handlePrevious={handlePrevious}
        />
     </div>
    </div>
    </>
    ):(
<>

<div className=' ring-1 ring-blue-200 shadow-sm rounded-sm px-2 transition-all ease-in-out duration-700'>
      <span className='flex'>
     <h4 className='text-slate-900  font-semibold font-serif text-lg text-left'>Join CarePlus Doctors</h4><p>®</p>
     </span>
     <Alert className='bg-blue-400'>
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Reminder!</AlertTitle>
      <AlertDescription className='text-xs text-slate-200'>
      You will not be able to provide a service until your <strong>Medical License Number</strong> is verified
      </AlertDescription>
    </Alert>

    <div>
      <DoctorSignup/>
    </div>

     </div>

</>
    )}

    <div className='flex justify-between mt-2'>

      <span className='text-xs flex gap-1'>
        <p className='text-slate-700'>Already have an account?</p><Link href={'/signin'} className='text-blue-500'>Login</Link></span>
      
    {/* <p onClick={()=>setPatient(!patient)} className='cursor-pointer text-blue-500  text-xs'>
      
      {patient ? 'sign up as a doctor' :'sign up as a patient'}</p> */}


    </div>

    </div>
  )
}
