import { authOptions } from '@/lib/authOps'
import { getServerSession } from 'next-auth'
import React from 'react'

export default async function page() {
  const session = await getServerSession(authOptions)
  return (
    <div>
        <h1 className='text-3xl capitalize   '>welcome 

<span className='text-blue-600 pl-2'>Dr.{session?.user.firstName} {session?.user.lastName} </span>
</h1>


<p className='text-slate-600 text-sm'>Manage your appointments and expenses effectively and efficiently</p>
    </div>
  )
}
