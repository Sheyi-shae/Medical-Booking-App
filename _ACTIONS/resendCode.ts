'use server'

import { sendVerificationEmail } from "@/_services/sendEmail";
import prismaClient from "@/lib/db";
import { UserDataProps } from "@/lib/types";
import bcrypt from 'bcryptjs';
import { redirect } from "next/navigation";

export default async function resendVerificationCode(email:string) {
  try {
   
   //check if user exist
    const existUser = await prismaClient.user.findUnique({
      where: { email },
    });

    if (!existUser) {
      return {
        data: null,
        message: 'User does not exist',
        subMessage: 'Please check your email',
        status: 400,
      };
    }

    // Generate a verification code
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    const verificationCodeExpiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

    const updatedCode = await prismaClient.user.update({
        where:{
          email
        },
          data:{
              verificationCode,verificationCodeExpiresAt
          }
      })

    // Send the verification email asynchronously
    await sendVerificationEmail({ email, verificationCode });

    
  
  const [local,main]=email.split('@')
  //replace part of the local with *
  const localPart =local.substring(0,4)+'****'
  const encryptedEmail=localPart +'@' +main
    return {
      data: updatedCode,
      message: `New code has been sent to ${encryptedEmail}`,
      subMessage: 'A verification code has been sent to your mail',
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
