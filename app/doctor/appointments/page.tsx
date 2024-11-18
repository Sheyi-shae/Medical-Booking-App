import { fetchDoctorAppointments } from '@/_ACTIONS/fetchAppointments'
import AppointmentTabs from '@/components/doctorsComponent/AppointmentTabs'
import DoctorCalendar from '@/components/doctorsComponent/DoctorCalendar'
import React from 'react'

export default async function page() {
  const data= await fetchDoctorAppointments()
  //all events
  // console.log(data)

  //scheduledd event
  // PENDING
  // SCHEDULED
  // COMPLETED
  // CANCELED
  const scheduled=data?.filter(user=>user.status==='SCHEDULED')
  // console.log('scheduled is', scheduled)
  const pending=data?.filter(user=>user.status==='PENDING')
  // console.log('pending is',pending)

  return (
    <div >

      {/* second layer */}
      <div className='w-full flex lg:flex-row flex-col gap-1'>
      <div className=' w-full lg:w-2/3'>
      <AppointmentTabs/>

      </div>
      <div className=' w-full lg:w-1/3'>
      <DoctorCalendar appointments={scheduled}/>

      </div>
      </div>
      {/* end second layer */}
      
    </div>
  )
}
