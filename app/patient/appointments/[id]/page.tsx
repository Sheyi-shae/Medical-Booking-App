import DAppointmentDetails from '@/components/doctorsComponent/DAppointmentDetails'
import { ParamProps } from '@/lib/types'
import React from 'react'



export default function page({ params: { id } }: ParamProps) {
  return (
    <div className='w-full lg:w-[60%]  lg:translate-x-48 grid grid-cols-1 items-center  '>
      <h3 className='capitalize pb-1 font-semibold text-slate-800'>Booking Information</h3>
      
      <DAppointmentDetails id={id}/>

    </div>
  )
}
