'use server'

import { authOptions } from "@/lib/authOps";
import prismaClient from "@/lib/db";
import { IdString } from "@/lib/types";
import { getServerSession } from "next-auth";



export default async function fetchPatientAppointments(){
  const session = await getServerSession(authOptions)
  if(session?.user.role==='patient'){
    try {
      const userId=session?.user.id
       const appointment=await prismaClient.appointment.findMany(
           {
             where: {
              patientId: userId,
              
             },
             orderBy: {
               createdAt: "desc",
             },
           }

           
       )
     
      
         
      
       return appointment
   
     } catch (error) {
       console.log(error);
       return  []
     }

  }
  else{
    return  []
  }
  
}

export  async function fetchDoctorAppointments()  {
  const session = await getServerSession(authOptions)
  if(session?.user.role==='doctor'){
  try {
   const userId=session?.user.id
    const docAppointment=await prismaClient.appointment.findMany(
        {
          where: {
            doctorId: userId,
             
          },
          orderBy: {
            createdAt: "desc",
          },
        }
    )
  
   
   
    return docAppointment

  } catch (error) {
    console.log(error);
    return  []
  }
}
else{
  return  []
}
}



export  async function fetchAppDetails({id}:IdString)  {
  try {
   
    const appDetails=await prismaClient.appointment.findUnique(
        {
          where: {
            id
             
          }
        }
    )
  
    if (!appDetails) {
      throw new Error('Event not found');
    }
   
    return appDetails

  } catch (error) {
    console.log(error);
    throw error
  }
}
