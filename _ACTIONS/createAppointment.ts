'use server'

import { appointmentCreationEmail } from "@/_services/appointmentCreationEmail";
import { sendVerificationEmail } from "@/_services/sendEmail";
import prismaClient from "@/lib/db";
import { convertTo12Hour } from "@/lib/timeConverter";
import { CreateAppointment, UserDataProps } from "@/lib/types";
import bcrypt from 'bcryptjs';
import { redirect } from "next/navigation";

export default async function createAppointment(userData: CreateAppointment) {
  try {
    const {
        reason,
          symptoms,
        
        doctorId,
        appointmentDate,
        appointmentTime
    } = userData;

    
    const findDocByEmail = await prismaClient.user.findUnique({
      where: { id:doctorId},
    });

    if (!findDocByEmail) {
      return null
    }
    const time= convertTo12Hour(appointmentTime)
    // next auth server to get this
    const user ={id:'66dae557c368ca110e46a373',lastName:'Sarah' ,firstName:'Aduke',email:'seyi@gmail.com'}
    const appointment = await prismaClient.appointment.create({
      data: {

       reason,
       symptoms,
        doctorId,
        appointmentDate,
        appointmentTime:time,
        doctorEmail:findDocByEmail.email,
        doctorFullName:`${findDocByEmail?.firstName} ${findDocByEmail?.lastName}`,
        patientFullName:`${user.firstName} ${user.lastName}`,
        patientId:user.id,
        patientEmail:user.email

      },
    });
      const doctorEmail= findDocByEmail?.email;
      const doctorFullName=`${findDocByEmail?.firstName} ${findDocByEmail?.lastName}`
      const patientFullName = `${user.firstName} ${user.lastName}`
    // Send the verification email asynchronously
    await appointmentCreationEmail({ doctorEmail, patientFullName,doctorFullName,appointmentDate,time,reason });

   
    return {
      data: appointment,
      message: 'Success',
      subMessage: `You've successfully created an appointment with Dr.${findDocByEmail?.firstName}`,
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
