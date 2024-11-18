import React from 'react'
import { Card } from '../ui/card'
import { Skeleton } from '../ui/skeleton'

export default function DetailAppointSkeleton() {
  return (
    <>
    <div >
    

    <Card className='text-slate-800  '>
        {/*  */}
      <div className='flex space-x-2 p-3 '>
        <div className='' >
        <Skeleton  className='rounded-full w-12 h-12 '  /></div>
        <div className='flex flex-col'>
            <Skeleton className='h-5 w-[300px] '/>
            <Skeleton className='h-4 w-[300px] '/>
        </div>


      </div>
      {/*  */}
      <div className=' px-5 p-3 '>
        <Skeleton className='w-full h-20 '/> 
        


        <div className='flex w-full mt-3 gap-2 lg:flex-row flex-col'>

        <div className='w-full lg:w-1/2 '>
        <Skeleton className='w-full h-14 '/> 


        </div>
        <div className='w-full lg:w-1/2 '>
        <Skeleton className='w-full h-14'/> 


        </div>
        </div>
      </div>
      
    </Card>
    </div>

    <div>
    

    <Card>
    <div className='flex w-full mt-3 gap-2 lg:flex-row p-3 flex-col'>

         <div className='w-full lg:w-1/2 '>
         <Skeleton className='w-[70%] h-12 '/> 

        </div>
        <div className='w-full lg:w-1/2 '>
        <Skeleton className='w-[70%] h-12 '/> 


        </div>
    </div>
       
    </Card>
    </div>
    <div className='flex justify-end gap-2'>
    <Skeleton className='w-4 h-4 '/> 
    
    <Skeleton className='w-4 h-4 '/> 

    </div>
</>
  )
}
