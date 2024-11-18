'use client'
import React, { useState } from 'react'
import VideoCall from './Videocall'
import TextInput,{ CustomButton, LoadingButton } from '../forms/TextInput'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
    Form,
   
  } from "@/components/ui/form"
import { Alert, AlertDescription, AlertTitle } from '../ui/alert'
import { AlertCircle } from 'lucide-react'
import videoRoom from '@/_ACTIONS/videoRoom'
import { useToast } from '../ui/use-toast'


  const formSchema = z.object({
    meetingId: z.string(),
   
      meetingPassword: z.string(),
      
      
    });
export default function VideoRoom() {
    const [isAuthorized, setIsAuthorized]=useState(false)
    const [loading, setLoading] = useState(false)
    const [room,setRoom]=useState('')
    const {toast}  =useToast()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: { },
      })


      async function onSubmit(data: z.infer<typeof formSchema>) {
          
     
      try {
        setLoading(true)
        const roomDetails = await videoRoom(data)
       
        toast({
          title: `${roomDetails.message}`,
          description: `${roomDetails.subMessage}`,
          // action: (
          //   <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
          // ),
        })
        if(roomDetails.status===200 ){
          setRoom(roomDetails.roomName || "")
          setIsAuthorized(true)
          

        }
        setLoading(false)
       
        
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
      
        
           
        
       

        
    // 
      }
  return (
    <div className='flex gap-2 w-full '>
        <div className='w-full md:w-[20%] shadow-sm rounded-sm '>
          {isAuthorized ? (
            <div>
              You are in call
            </div>
          ):(
            <div>
               <Alert className='bg-blue-400'>
      <AlertCircle className="h-4 w-4" />
      
      <AlertDescription className='text-xs text-slate-200'>
      This is a private room. Please enter <strong>roomId and room Password</strong> 
      </AlertDescription>
    </Alert>
        <Form {...form} >
      <form  className="space-y-6 p-1" onSubmit={form.handleSubmit(onSubmit)}>
      
        <TextInput
        name="meetingId"
        label="Meeting ID"
        control={form.control}
        placeholder="room-175y7787"
        type="text"
        
        
        />
        <TextInput
        name="meetingPassword"
        label="Meeting Password"
        control={form.control}
        placeholder="****************"
        type="password"
        
        
        />
        
        <div className='flex justify-end'>
       
        {loading ? (
          
            <LoadingButton />


        ): (
          <CustomButton title={'Start'} type={'submit'}/> 
        )}
        
        </div>
      </form>
    </Form>


            </div>
          )}
       


        </div>
        <div className='w-full md:w-[80%] max-h-[85vh]'>
            {isAuthorized ? (
                <VideoCall roomName={room}/>

            ):
            (
                <div className='w-full h-[85vh] rounded-sm bg-slate-800 '>
                    <p className='text-white flex justify-center translate-y-48'>Waiting room....</p>
                </div>

            )}
            
        </div>
    </div>
  )
}
