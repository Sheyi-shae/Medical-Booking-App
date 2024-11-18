
import React from 'react'
import RenderStepForm from './RenderStepForm'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOps'
import { redirect } from 'next/navigation'

export default async function page() {

  const session= await getServerSession(authOptions)
  if(session)
    redirect('/')
  
  return (
    <div>
     <RenderStepForm/>
    </div>
  )
}
