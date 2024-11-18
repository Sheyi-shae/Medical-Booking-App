'use server'
import prismaClient from '@/lib/db'
import React from 'react'

interface VideoProps{
    meetingId:string
    meetingPassword:string
}
export default async function videoRoom(videoData:VideoProps) {
    
    const { meetingId, meetingPassword } = videoData
  
    try {
   // `findFirst` since `findUnique` requires a unique field
   const appDetails = await prismaClient.appointment.findFirst({
    where: {
      meetingId,
      meetingPassword,
    },
  })
      if (!appDetails) {
        return {
          data: null,
          message: 'Invalid meeting ID or meeting password',
          subMessage: 'Please refer to the email sent to you or check your appointment details in the app.',
          status: 400,  // Use 400 for bad request due to invalid credentials
        }
      }
      
      return {
        data: appDetails,
        message: 'Preparing meeting',
        subMessage: 'Your meeting details are now being loaded.',
        status: 200,
        roomName:appDetails.reason
      }
}catch (error) {
  console.log(error);
  return {
    message: 'Internal Server Error',
    subMessage: 'Please try again later',
    status: 500,
  };
}

} 
