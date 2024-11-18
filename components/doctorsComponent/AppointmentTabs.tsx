'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Check, MapPinCheck, TimerIcon, Users } from "lucide-react"
import { CustomButton } from "../forms/TextInput"
import { useEffect, useState } from "react"
import { fetchDoctorAppointments } from "@/_ACTIONS/fetchAppointments"
import { Appointment } from "@prisma/client"
import { Skeleton } from "../ui/skeleton"
import AppointmentSkeleton from "../skeletons/AppointmentSkeleton"
import { FormatDate } from "@/lib/dateCoverter"
import Link from "next/link"
import { Button } from "../ui/button"
 
export default function AppointmentTabs() {
  const [appointments,setAppointments]=useState<Appointment[]>([])
  const [loading,setLoading]=useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
         setLoading(true)
          const res = await fetchDoctorAppointments()
          
          setAppointments(res)
          setLoading(false); // Data fetched, stop loading
      } catch (error) {
          console.error('Error:', error);
          setLoading(false); // Error occurred, stop loading
      }
  };
  fetchData();
  }, [])
  // console.log(appointments)
  const pending=appointments.filter(user=>user.status==='PENDING')
  const scheduled=appointments.filter(user=>user.status==='SCHEDULED')
  const canceled=appointments.filter(user=>user.status==='CANCELED')
  return (
    
  // SCHEDULED
  // COMPLETED
  // CANCELED
  <Tabs defaultValue="Pending" className="w-[100%] ">
  <TabsList className="grid  grid-cols-4 w-[400px]">
    <TabsTrigger value="Pending">Pending</TabsTrigger>
    <TabsTrigger value="Scheduled">Scheduled</TabsTrigger>
    <TabsTrigger value="Canceled">Canceled</TabsTrigger>
    <TabsTrigger value="Completed">Completed </TabsTrigger>
    
  </TabsList>



  <TabsContent value="Pending">
   
      <CardHeader>
        <CardTitle>Pending Appointment</CardTitle>
        <CardDescription>
          Make changes to your pending appointments.
        </CardDescription>
      </CardHeader>
      
        <CardContent className="space-y-2">
          {loading ? (
        <>
        <AppointmentSkeleton/>
        <AppointmentSkeleton/>
        <AppointmentSkeleton/>
        <AppointmentSkeleton/>
        </>
      ) :(
        <div className="w-full ">
          {pending.length > 0 ? (
            <div>
    {pending.map((appointment) => (
          <div key={appointment.id} className="ring-1 ring-slate-200  rounded-sm shadow-sm w-full gap-2 flex p-4 my-2">
            <div className='border-r-2 px-2'>
              {FormatDate(new Date(appointment.appointmentDate))}
            </div>

            <div className='flex flex-col text-xs gap-2 p-2'>
              <div className='flex gap-1'><TimerIcon size={16}/>
              {appointment.appointmentTime}
              </div>
              <div className='flex gap-1'> <MapPinCheck  size={16}/> Online</div>
            </div>

              
            <div className=' mr-8 ml-3 text-sm md:text-base flex flex-col gap-1 line-clamp-1 w-[50%]'>
              <div className='text-left capitalize text-cyan-700'>
                  {appointment.reason}
                  </div>
              <div className='text-center text-xs text-slate-600 flex gap-1 capitalize'><Users  size={18}/>
              {appointment.patientFullName}
              </div>
            </div>
            <div className="flex justify-end">
              <Link href={`/doctor/appointments/${appointment.id}`}><CustomButton type='button' title='details'/></Link>
            </div>
          </div>
              ))}
              </div>
              ):(
              <p>You have no pending appointment</p>
              )}
        </div>
       )}
      </CardContent> 
      
     
    
  </TabsContent>




{/* scheduled */}
<TabsContent value="Scheduled">
   
   <CardHeader>
     <CardTitle>Scheduled Appointment</CardTitle>
     <CardDescription>
       Make changes to your scheduled appointments.
     </CardDescription>
   </CardHeader>
   
     <CardContent className="space-y-2">
       {loading ? (
     <>
     <AppointmentSkeleton/>
     <AppointmentSkeleton/>
     <AppointmentSkeleton/>
     <AppointmentSkeleton/>
     </>
   ) :(
     <div className="w-full ">
       {scheduled.length > 0 ? (
         <div>
 {scheduled.map((appointment) => (
       <div key={appointment.id} className="ring-1 ring-slate-200  rounded-sm shadow-sm w-full gap-2 flex p-4 my-2">
         <div className='border-r-2 px-2'>
           {FormatDate(new Date(appointment.appointmentDate))}
         </div>

         <div className='flex flex-col text-xs gap-2 p-2'>
           <div className='flex gap-1'><TimerIcon size={16}/>
           {appointment.appointmentTime}
           </div>
           <div className='flex gap-1'> <MapPinCheck  size={16}/> Online</div>
         </div>

           
         <div className=' mr-8 ml-3 text-sm md:text-base flex flex-col gap-1 line-clamp-1 w-[50%]'>
         <Link href={`/doctor/appointments/${appointment.id}`}> <div className='text-left capitalize text-cyan-700'>
               {appointment.reason}
               </div></Link>
           <div className='text-center text-xs text-slate-600 flex gap-1 capitalize'><Users  size={18}/>
           {appointment.patientFullName}
           </div>
         </div>
         <div className="flex justify-end whitespace-nowrap">
          <Link href={`../../video`}>
          <CustomButton type='button' title='Start Event'/></Link>
         </div>
       </div>
           ))}
           </div>
           ):(
           <p>You have no scheduled appointment</p>
           )}
     </div>
    )}
   </CardContent> 
   
  
 
</TabsContent>

{/* canceled*/}
<TabsContent value="Canceled">
   
   <CardHeader>
     <CardTitle>Canceled Appointment</CardTitle>
     <CardDescription>
       Your Canceled Appointments.
     </CardDescription>
   </CardHeader>
   
     <CardContent className="space-y-2">
       {loading ? (
     <>
     <AppointmentSkeleton/>
     <AppointmentSkeleton/>
     <AppointmentSkeleton/>
     <AppointmentSkeleton/>
     </>
   ) :(
     <div className="w-full ">
       {canceled.length > 0 ? (
         <div>
 {canceled.map((appointment) => (
       <div key={appointment.id} className="ring-1 ring-slate-200  rounded-sm shadow-sm w-full gap-2 flex p-4 my-2">
         <div className='border-r-2 px-2'>
           {FormatDate(new Date(appointment.appointmentDate))}
         </div>

         <div className='flex flex-col text-xs gap-2 p-2'>
           <div className='flex gap-1'><TimerIcon size={16}/>
           {appointment.appointmentTime}
           </div>
           <div className='flex gap-1'> <MapPinCheck  size={16}/> Online</div>
         </div>

           
         <div className=' mr-8 ml-3 text-sm md:text-base flex flex-col gap-1 line-clamp-1 w-[50%]'>
           <div className='text-left capitalize text-cyan-700'>
               {appointment.reason}
               </div>
           <div className='text-center text-xs text-slate-600 flex gap-1 capitalize'><Users  size={18}/>
           {appointment.patientFullName}
           </div>
         </div>
         <div className="flex justify-end">
         <Button type='submit' className='bg-red-600 capitalize' disabled >canceled event</Button> 
         </div>
       </div>
           ))}
           </div>
           ):(
           <p>You have no canceled appointment</p>
           )}
     </div>
    )}
   </CardContent> 
   
  
 
</TabsContent>
</Tabs>
  )
}
