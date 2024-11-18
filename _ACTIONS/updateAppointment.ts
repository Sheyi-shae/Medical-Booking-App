'use server'

import { cancelledAppointment } from "@/_services/cancelledAppointment";
import { confirmVerification } from "@/_services/confirmVerification";
import { scheduledAppointment } from "@/_services/scheduledApp";
import prismaClient from "@/lib/db";
import { generateRoomName } from "@/lib/generateRoomName";
import { IdString } from "@/lib/types";



export default async function acceptAppointment({id}:IdString) {
  try {
    // Check if user exists
    const existApp = await prismaClient.appointment.findUnique({
      where: {id },
    });

    if (!existApp) {
      return {
        data: null,
        message: 'User does not exist',
        subMessage: 'Please check your email',
        status: 400,
      };
    }

    

    
    const meetingId = generateRoomName(existApp.appointmentDate);
    const meetingPassword = Math.random().toString(36).slice(2, 10).toString();

    // Verify the PIN
    

    // Update the user as verified
    const updatedApp = await prismaClient.appointment.update({
      where: { id},
      data: {
        status:'SCHEDULED',
        meetingId:  meetingId,
        meetingPassword:meetingPassword
      },
    });

    const patientEmail = existApp.patientEmail
    const patientFullName = existApp.patientFullName
    const  doctorFullName = existApp.doctorFullName


    await scheduledAppointment({meetingId,meetingPassword,patientEmail,patientFullName,doctorFullName });

    return {
      data: updatedApp,
      message: 'Update Successful',
      subMessage: 'Appointment status  has been updated successfully',
      status: 200,
    };

  } catch (error) {
    console.log(error);
    return {
      message: 'Internal Server Error',
      subMessage: 'Please try again later',
      status: 500,
    };
  }
}


interface DeclineProps{
  
    reason: string;
    id:string


}

export  async function declineAppointment(userData:DeclineProps) {
  const {reason,id}=userData
  
  try {
    // Check if user exists
    const existApp = await prismaClient.appointment.findUnique({
      where: {id },
    });

    if (!existApp) {
      return {
        data: null,
        message: 'event does not exist',
        subMessage: 'Please try again',
        status: 400,
      };
    }

    // Update the user as verified
    const updatedApp = await prismaClient.appointment.update({
      where: { id},
      data: {
        status:'CANCELED',
        reason:`Doctor has cancelled this event because -'${reason}'`
       
      },
    });

    const patientEmail = existApp.patientEmail
    const patientFullName = existApp.patientFullName
    const  doctorFullName = existApp.doctorFullName


    await cancelledAppointment({patientEmail,patientFullName,doctorFullName,reason });

    return {
      data: updatedApp,
      message: 'Update Successful',
      subMessage: 'Appointment status  has been updated successfully',
      status: 200,
    };

  } catch (error) {
    console.log(error);
    return {
      message: 'Internal Server Error',
      subMessage: 'Please try again later',
      status: 500,
    };
  }
}
