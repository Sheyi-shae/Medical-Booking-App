import React from 'react'
import { Skeleton } from '../ui/skeleton'

export default function AppointmentSkeleton() {
  return (
    <div className="w-full ">
    
    <div  className="ring-1 ring-slate-200  rounded-sm shadow-sm w-full gap-2 flex p-4 my-2">
      <Skeleton className='w-3 h-3'/>
        

      <Skeleton className='h-4 w-[250px]'/>
       
   

        <div className="flex flex-col space-y-3">
      <Skeleton className=' h-4 w-[50%]'/>
        <Skeleton className='h-2 w-[250px]'/>
         
        <Skeleton className='h-2 w-[250px]'/>
        </div>
     
      <div className="flex justify-end">
      <Skeleton className='h-4 w-16'/>
      </div>
   
      </div>
  </div>
  )
}
