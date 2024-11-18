import DashboardCard from '@/components/patientsComponents/DashboardCard'
import { VerificationBox } from '@/components/patientsComponents/VerificationBox'

import React from 'react'

import PatientHeader from '@/components/patientsComponents/Header'
import { UpcomingAppointmentTable } from '@/components/patientsComponents/upcoming_appointment/UpcomingAppointments'
import { columns } from '@/components/patientsComponents/upcoming_appointment/column'
import { Appointment } from '@/lib/types'
import AvailableDoctors from '@/components/patientsComponents/AvailableDoctors'
import fetchPatientAppointments from '@/_ACTIONS/fetchAppointments'
import ScheduledAppointments from '@/components/patientsComponents/upcoming_appointment/Appointments'
import PatientCalendar from '@/components/patientsComponents/PatientCalendar'
import CanvasChart from '@/components/patientsComponents/CanvasChart'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOps'
import { VerificationModal } from './verification_status/VerficationModal'

// async function getData() {
//   // Fetch data from your API here.
//   return [
//     {
//       id: "728ed52f",
//       status: "pending",
//       specialist:"Dr. Tancredi",
//       date:'04-09-2024',
//      reasons:'a matter of urgency',
//     },
    
    
//     // ...
//   ]
// }
export default async function page() {
   const data = await fetchPatientAppointments()
   const session = await getServerSession(authOptions)
  const isVerified=session?.user.isVerified
  return (
    <div className=''>
      <h1 className='text-3xl capitalize   '>welcome 

        <span className='text-blue-600 pl-2'>{session?.user.firstName}</span>
      </h1>
      
      
      <p className='text-slate-600 text-sm'>Manage your appointments and expenses effectively and efficiently</p>
    
    <DashboardCard/>

    <div className='w-full flex flex-col lg:flex-row gap-2 py-2'>
      <div className='w-full lg:w-[70%] h-auto ring-1 ring-slate-100 p-1 shadow-sm rounded-sm'>
       {!isVerified && <VerificationModal/>}

       
       <PatientHeader title={'My Calendar'} />
       {/* <UpcomingAppointmentTable columns={columns} data={data}/> */}
       <PatientCalendar appointments={data}/>
       <ScheduledAppointments appointments={data}/>
       

        </div>
      <div className='w-full  max-h-[12rem] lg:w-[30%] ring-1 p-1 ring-slate-100 shadow-sm rounded-sm'>
        <CanvasChart/>
      <PatientHeader title={'Available Doctors/Specialist'} />
      <AvailableDoctors/>
      
      </div>
    </div>
    
    </div>
  )
}
