import Image from 'next/image'
import React from 'react'

export default function AvailableDoctors() {
  return (
    <div className='flex justify-around mt-3'>
        <div className='rounded-full w-10 h-10'><Image src={'/images/signup.png'} alt='' height={50} width={50}/></div>
        <div className='flex flex-col '>
            <span className='capitalize text-sm'>Dr.Tancredi</span>
             <span className='capitalize text-xs text-slate-600'>Dentist</span>
        </div>
        <div className='text-xs'>more details</div>

    </div>
  )
}
