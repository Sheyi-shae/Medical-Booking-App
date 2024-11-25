
import { CustomButton } from "@/components/forms/TextInput"

import { CreateAppointDialog } from "@/components/patientsComponents/CreateAppointmentDialog"
import { getData } from "@/lib/getData"
import fetchDoctors from "@/_ACTIONS/fetchDoctors"
import fetchPatientAppointments from "@/_ACTIONS/fetchAppointments"
import PatientCalendar from "@/components/patientsComponents/PatientCalendar"
import AppointmentTabs from "@/components/doctorsComponent/AppointmentTabs"
import PatientAppointmentTabs from "@/components/patientsComponents/PatientAppTabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/authOps"

interface UserProps{
  id:string
  role:string
  firstName:string
  lastName:string
}

export default async function page() {
  const session= await getServerSession(authOptions)
  const isVerified=session?.user.isVerified
  const user= await fetchDoctors();
 const doctors=user.data
 const data= await fetchPatientAppointments()
 
 const scheduled=data?.filter(user=>user.status==='SCHEDULED')
 
 const pending=data?.filter(user=>user.status==='PENDING')
  

  return (
    <div className="container mx-auto ">
      <h1 className='text-3xl capitalize'>my appointments
</h1>


<p className='text-slate-600 text-sm'>Manage and view your appointment details </p>

{!isVerified && <Alert className='bg-blue-400'>
      <AlertCircle className="h-4 w-4" />
      
      <AlertDescription className='text-xs text-slate-200'>
      You need to <strong>verify</strong> your email before you can book an appointment
      </AlertDescription>
    </Alert>}

<div className="py-2 flex justify-end"> <CreateAppointDialog doctors={doctors}/></div>
     

<div >

{/* second layer */}
<div className='w-full flex lg:flex-row flex-col gap-1'>
<div className=' w-full lg:w-2/3'>
<PatientAppointmentTabs/>

</div>
<div className=' w-full lg:w-1/3'>
<PatientCalendar appointments={scheduled}/>

</div>
</div>
{/* end second layer */}

</div>
    </div>
  )
}
