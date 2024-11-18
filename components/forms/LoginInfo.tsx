'use client'
import { StepsProps } from '@/lib/types'
import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
    Form,
   
  } from "@/components/ui/form"

import TextInput, { CustomButton, CustomOutlineButton, } from "./TextInput"
import { useDispatch, useSelector } from 'react-redux'
import { loginInfo } from '@/redux/slices/patientSlice'
import { RootState } from '@/redux/store'
import signUp from '@/_ACTIONS/users'
import { useToast } from '../ui/use-toast'
import { ToastAction } from '../ui/toast'
import { useRouter } from 'next/navigation'

const formSchema = z.object({
    email: z.string().email({
      message: "Invalid email address.",
    }),
   
      password: z.string().min(6, {
        message: "Password is weak.",
      }),
      confirmPassword: z.string().min(6, {
        message: "Please confirm your password.",
      }),
    }).refine((data) => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ['confirmPassword'] 
      
    });

export default function LoginInfo({handlePrevious ,handleNext}:StepsProps) {
  const { toast } = useToast()
   const router = useRouter()
  const [loading, setLoading] = useState(false)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: { },
      })
      const basic = useSelector((state:RootState) => state.patient.step1);
      const medical = useSelector((state:RootState) => state.patient.step2);
     
      

      const dispatch=useDispatch()
      
      async function onSubmit(data: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        dispatch(loginInfo(data))
       
          const user='patient'
          
      const signupDetails={...basic,...medical,...data,role:user}
      try {
        setLoading(true)
        const newUser = await signUp(signupDetails)
        

        toast({
          title: `${newUser.message}`,
          description: `${newUser.subMessage}`,
          // action: (
          //   <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
          // ),
        })
        if(newUser.status===200){
          router.push('/signin')

        }
        setLoading(false)
       
        
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
      
        
           
        
      
        
    // 
      }
  return (
    <div>
         <Form {...form} >
      <form  className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
      
        <TextInput
        name="email"
        label="Email"
        control={form.control}
        placeholder="example@info.com"
        type="text"
        
        
        />
        <TextInput
        name="password"
        label="Password"
        control={form.control}
        placeholder="****************"
        type="password"
        
        
        />
        <TextInput
        name="confirmPassword"
        label="Confirm Password"
        control={form.control}
        placeholder="****************"
        type="password"
        
        
        />
        <div className='flex justify-between'>
       <button onClick={handlePrevious}><CustomOutlineButton title={'Prev'} type={'button'}   /></button>  
        {loading ? (
          
            <CustomButton  title={'Please wait...'} type={'submit'}/>


        ): (
          <CustomButton title={'Sign up'} type={'submit'}/> 
        )}
        
        </div>
      </form>
    </Form>
    </div>
  )
}
