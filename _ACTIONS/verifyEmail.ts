'use server'

import { confirmVerification } from "@/_services/confirmVerification";
import { authOptions } from "@/lib/authOps";
import prismaClient from "@/lib/db";
import { getServerSession } from "next-auth";

interface verifyEmailProps {
  pin: string;
  email:string |"me";
  
}

export default async function verifyEmail({ pin,email }: verifyEmailProps) {
  
 
  try {
    // Check if user exists
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

    // Check if the email has already been verified
    if (existUser.isVerified) {
      return {
        data: null,
        message: 'Your email has already been verified',
        status: 200,
      };
    }

    
    const verificationCode = existUser.verificationCode;
    

    
    if (pin !== verificationCode) {
      return {
        data: null,
        message: 'Invalid verification code',
        subMessage: 'Please try again',
        status: 400,
      };
    }

    // Update the user as verified
    const updatedUser = await prismaClient.user.update({
      where: { email },
      data: {
        verificationCode: null,
        isVerified: true,
      },
    });

    const firstName = existUser.firstName

    await confirmVerification({firstName, email });

    return {
      data: updatedUser,
      message: 'Verification Successful',
      subMessage: 'Your email has been verified successfully',
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
