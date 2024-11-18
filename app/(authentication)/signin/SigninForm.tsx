'use client'
import { StepsProps } from '@/lib/types'
import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
    Form,
   
  } from "@/components/ui/form"

import TextInput, { CustomButton, CustomOutlineButton, LoadingButton, } from "@/components/forms/TextInput"
import { signIn } from 'next-auth/react'
import { useToast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'
import { ToastAction } from '@/components/ui/toast'
import Link from 'next/link'


const formSchema = z.object({
    email: z.string(),
   
      password: z.string()
  
    });

export default function SigninForm() {
  const { toast } = useToast()
   const router = useRouter()
  //  const {status}=useSession()
   const[loading,setLoading]=useState(false)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: { },
      })
     

       // 2. Define a submit handler.
  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      setLoading(true)
     
      const loginData = await signIn("credentials", {
          ...data,
          redirect: false,
        });
        
        if (loginData?.error) {
          toast({
            title: `An Error Occured`,
            description: `Invalid email or password`,
            action: (
              <ToastAction altText="Don,t have an account"><Link href='/signup'>Sign up</Link></ToastAction>
            ),
          })

          setLoading(false);
          console.log("Invalid email or password");
        } else {
          // Sign-in was successful
          console.log("Login Successful");
          setLoading(false);
      
          router.push('/')
        
       
      }
  } catch (error) {
    setLoading(false);
    console.error("Network Error:", error);
    
  }
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
        
        <div className='flex justify-between'>
          {loading ? (
            <LoadingButton/>
          ):(
            <CustomButton title={'Sign in'} type={'submit'}/> 

          )
        }
         
        
        </div>
      </form>
    </Form>
    </div>
  )
}
