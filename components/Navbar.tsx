'use client'
import React from 'react'
import MobileMenu from './MobileMenu'
import { signOut, useSession } from 'next-auth/react'
import { LogOut } from 'lucide-react'
import Link from 'next/link'

export default function Navbar() {
    const {data:session,status}=useSession()
    console.log(session?.user.firstName)
  return (
    <div>
        <header className=" bg-black fixed sm:py-2 w-full z-10" >
           
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between"> 
            {/* logo here */}
            <div className="shrink-0">
                <a href="#" title="" className="flex">
                    <p className='text-lg text-white font-semibold'>Logo</p>
                 </a>
            </div>
            {/* end of logo */}

          
            <nav className="hidden ml-10 mr-auto space-x-10 lg:ml-20 lg:space-x-12 md:flex md:items-center md:justify-start">
                <a href="#" title="" className=" text-slate-100 transition-all duration-500 hover:text-white"> Products </a>

                <a href="#" title="" className=" text-slate-100 transition-all duration-500 hover:text-white"> Products </a>

                <a href="#" title="" className=" text-slate-100 transition-all duration-500 hover:text-white"> Products </a>

             {session?.user.role==='patient' &&(  <Link href="/patient"  className=" text-slate-100 transition-all duration-500 hover:text-white"> My Portal </Link> )} 
             {session?.user.role==='doctor' &&(  <Link href="/doctor"  className=" text-slate-100 transition-all duration-500 hover:text-white"> My Portal </Link> )}   
            </nav>

            {/* large screen */}
            <div className="relative hidden md:items-center md:justify-center md:inline-flex group">
         {status==='authenticated' ? (   <button  onClick={()=>signOut()} className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-white rounded-full group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800 group-hover:shadow-lg group-hover:shadow-purple-400/50">
<span className="relative px-5 py-2.5 transition-all ease-in duration-200 bg-black dark:bg-gray-900  group-hover:bg-opacity-0 rounded-full">

   <p className='flex'>Sign Out <LogOut size={18}/> </p> 
   </span>
</button>
):
(
    <button  className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-white rounded-full group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800 group-hover:shadow-lg group-hover:shadow-purple-400/50">
    <span className="relative px-5 py-2.5 transition-all ease-in duration-200 bg-black dark:bg-gray-900  group-hover:bg-opacity-0 rounded-full">
    
       <p>Get Started </p> 
       </span>
    </button>  
)
}

            </div>
            {/* small screen */}
            <div className="relative md:hidden items-center md:justify-center inline-flex group">
                <div className="absolute transition-all duration-200 rounded-full -inset-px bg-gradient-to-r from-cyan-500 to-purple-500 group-hover:shadow-lg group-hover:shadow-cyan-500/50"></div>
                <span className="relative inline-flex items-center justify-center px-6 py-2 text-base font-normal text-white bg-black border border-transparent rounded-full" > <MobileMenu/> </span>
            </div>

        </div>

       
    </div>
</header>
</div>
  )
}
