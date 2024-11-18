import React from 'react'
import SigninForm from './SigninForm'
import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOps'
import { redirect } from 'next/navigation'

export default async function page() {
  const session= await getServerSession(authOptions)
  if(session)
    redirect('/')
  return (
  
     <div className=' ring-1 ring-blue-200 shadow-sm rounded-sm px-2'>
      <span className='flex'>
     <p className='text-slate-900  font-semibold font-serif text-lg text-left'> CarePlus</p><p>®</p>
     </span>
     <p className='text-slate-700 text-xs md:text-sm '>Sign in to your account</p>

     <div>
<SigninForm/>
      
     </div>
     <span className='text-xs flex gap-1'><p className='text-slate-700'>Don&apos;t have an account?</p><Link href={'/signup'} className='text-blue-500'>Sign up</Link></span>
    </div>
    
  )
}
