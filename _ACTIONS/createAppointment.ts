'use server'

import { appointmentCreationEmail } from "@/_services/appointmentCreationEmail";
import { sendVerificationEmail } from "@/_services/sendEmail";
import prismaClient from "@/lib/db";
import { CreateAppointment, UserDataProps } from "@/lib/types";
import { authOptions } from "@/lib/authOps";
import { getServerSession } from "next-auth";

export default async function createAppointment(userData: CreateAppointment) {
  const session = await getServerSession(authOptions)
  try {
    const {
        reason,
          symptoms,
        
        doctorId,
        appointmentDate,
        appointmentTime
    } = userData;

    console.log(userData)
    const findDocByEmail = await prismaClient.user.findUnique({
      where: { id:doctorId},
    });

    if (!findDocByEmail) {
      return {
        message: 'Doctor not found',
        status: 404,
      };
    }
   
    console.log('Doctor:', findDocByEmail);
    const userId=session?.user.id ?? ''
    const firstName=session?.user.firstName
    const lastName=session?.user.lastName
    const email=session?.user.email ?? ''
    const appointment = await prismaClient.appointment.create({
      data: {

       reason,
       symptoms,
        doctorId,
        appointmentDate,
        appointmentTime,
        doctorEmail:findDocByEmail.email,
        doctorFullName:`${findDocByEmail?.firstName} ${findDocByEmail?.lastName}`,
        patientFullName:`${firstName} ${lastName}`,
        patientId:userId,
        patientEmail:email,
        doctorImageUrl:findDocByEmail.imageUrl

      },
    });
      const doctorEmail= findDocByEmail?.email;
      const doctorFullName=`${findDocByEmail?.firstName} ${findDocByEmail?.lastName}`
      const patientFullName = `${firstName} ${lastName}`
    // Send the verification email asynchronously
    await appointmentCreationEmail({ doctorEmail, patientFullName,doctorFullName,appointmentDate,appointmentTime,reason });

   
    return {
      data: appointment,
      message: 'Success',
      subMessage: `You've successfully created an appointment with Dr.${findDocByEmail?.firstName}`,
      status: 200,
    };

  } catch (error) {
    console.error('Error creating appointment:', error);
    return {
      message: 'Internal Server Error',
      subMessage: 'Please try again later',
      status: 500,
    };
  }
}
