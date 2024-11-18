"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"


import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { useToast } from "@/components/ui/use-toast"
import resendVerificationCode from "@/_ACTIONS/resendCode"
import verifyEmail from "@/_ACTIONS/verifyEmail"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { useState } from "react"

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "verification code must be 6 characters.",
  }),
})

interface ModalProps{
  onclose: () => void
}

export function VerificationOTPForm({onclose}:ModalProps) {
  const router =useRouter()
  const [loading,setLoading]=useState(false)
  const [resend,setResend]=useState(false)
  const {data:session,status}=useSession()
    const {toast}=useToast()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  })

  
  //split email into parts before and after @ (adeniyi + gmail.com)
//   const [local,main]=email.split('@')
  //replace part of the local with *
//   const localPart =local.substring(0,4)+'****'
//   const encryptedEmail=localPart +'@' +main
const email=session?.user.email ?? " "

  const resendCode = async()=>{
    try {
      setResend(true)
      const verificationCode= await resendVerificationCode(email)
    toast({
        title: ` ${verificationCode.message}`
        
      })
      setTimeout(() => {
        setResend(false)
      }, 1000);
    } catch (error) {
      
    }

    

  }

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const pin=data.pin
     
    try {
      setLoading(true)
     const verifyUser= await verifyEmail({pin,email})
     toast({
      title: ` ${verifyUser.message}`,
      description:` ${verifyUser.subMessage}`
      
    })
    setLoading(false)

    if(verifyUser.status===200){
      onclose();
      router.push('/patient')
    }
    } catch (error) {
      toast({
        title: ` Ooops! Something went wrong`,
        description:` Please try again`
        
      })
      setLoading(false)
      
    }
    
   
    
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full p-3 flex-col  flex justify-center items-center space-y-6">
        <FormField
          control={form.control}
          name="pin"
          render={({ field }) => (
            <FormItem>
              
              <FormControl>
                <InputOTP maxLength={6} {...field}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              {!resend && <FormDescription>
                Didn&apos;t recieve code? <button className="text-blue-500" type="button" onClick={resendCode}>Resend code</button>
              </FormDescription>}
              <FormMessage />
            </FormItem>
          )}
        />
        {loading ?(
          <Button type="button" disabled >Verifying...</Button>

        ):(
          <Button type="submit">Verify</Button>

        )
        }

        
      </form>
    </Form>
  )
}
