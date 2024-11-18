import { redirect } from 'next/navigation'
import React from 'react'
import { VerificationOTPForm } from './OTPinput'

export default function page() {
    const isVerified=false
    if(isVerified){
        redirect('/patient')

    }
  return (
    <div className='flex flex-col translate-y-28 w-1/2 items-center justify-center rounded-sm mx-auto  ring-1 ring-slate-300 shadow-sm p-1 py-3'>
        <h4 className='text-2xl'>Please verify your email</h4>
        <p className='text-sm'>Please type the code sent to your registered  email</p>
        <VerificationOTPForm/>
    </div>
  )
}
