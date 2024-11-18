'use server'

import { sendVerificationEmail } from "@/_services/sendEmail";
import prismaClient from "@/lib/db";
import { UserDataProps } from "@/lib/types";
import bcrypt from 'bcryptjs';
import { redirect } from "next/navigation";

export default async function signUp(userData: UserDataProps) {
  try {
    const {
      email,
      password,
      allergies,
      medicalHistory,
      medications,
      firstName,
      lastName,
      occupation,
      number,
      gender,
      dob,
      role,
      specialization,
  yearsOfExperience,
  licenseNumber,
  consultationFee,
 
  
  imageUrl,
     
    } = userData;

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const existingUser = await prismaClient.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return {
        data: null,
        message: 'Email already exists',
        subMessage: 'Please try another email',
        status: 400,
      };
    }

    // Generate a verification code
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    const verificationCodeExpiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

    const newUser = await prismaClient.user.create({
      data: {
        email,
        password: hashedPassword,
        allergies,
        medicalHistory,
        medications,
        firstName,
        lastName,
        occupation,
        number,
        gender,
        dob,
        role,
        specialization,
        yearsOfExperience,
        licenseNumber,
        consultationFee,
       imageUrl,
        verificationCode,
        verificationCodeExpiresAt,
        
        
      },
    });

    // Send the verification email asynchronously
    
    await sendVerificationEmail({ email, verificationCode });
    

   
    return {
      data: newUser,
      message: 'Registration Successful',
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
