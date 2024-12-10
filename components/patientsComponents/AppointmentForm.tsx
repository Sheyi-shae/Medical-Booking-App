'use client'
import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
    Form,
   
  } from "@/components/ui/form"

import  { CustomButton,  LoadingButton,  SelectFormWithValueId,  TextAreaInputNoKeyDown, TimeSelect,   } from "@/components/forms/TextInput"

import { DateOfBirth } from '../forms/TextInput'
import { DoctorsFilter } from '@/lib/types'
import createAppointment from '@/_ACTIONS/createAppointment'
import { useToast } from '../ui/use-toast'



const formSchema = z.object({
    
    reason: z.string().min(5, {
        message: "Please enter valid reason",
      }),
      symptoms: z.string().min(5, {
        message: "Please enter valid reason",
      }),
    
    doctorId: z.string(),
    appointmentDate: z.date(),
    appointmentTime: z.enum(["9:00-10:00am", "10:00-11:00am", "11:00-12:00pm","01:00-2:00pm"], {
      required_error: "Please pick appointment time",
    }),
  })

  
export default function AppointmentForm({doctors=[],onclose}:DoctorsFilter) {
  const [loading, setloading] = useState(false)
  const {toast}=useToast()
  
    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {},
      })
  
     
    
       // 2. Define a submit handler.
  async function onSubmit(data: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    try {
      setloading(true)
      const appointment= await createAppointment(data)
      toast({
        title: `${appointment?.message}`,
        description: `${appointment?.subMessage}`,
        // action: (
        //   <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
        // ),
      })
      if(appointment?.status===200){
        onclose!()
  
      }
      setloading(false)
    
     
    } catch (error) {
      console.log(error)
      setloading(false)
    }
  }
  return (
    <div>
         <Form {...form} >
      <form className= "space-y-6 " onSubmit={form.handleSubmit(onSubmit)}>
       
     
       <div className="grid h-auto  grid-cols-2 space-x-3 space-y-2 ">
        <SelectFormWithValueId
        name="doctorId"
        label="Doctor/Specialist"
        control={form.control}
        placeholder="select a doc"
        options={doctors}
        />
         
        <DateOfBirth
        name='appointmentDate'
        label='Appointment Date'
        control={form.control}
        />
        
        </div>
        <TextAreaInputNoKeyDown
         control={form.control} 
         label='Reason for Appointment'
         name='reason'
         placeholder='e.g., consultation, follow-up'/>

<TextAreaInputNoKeyDown
         control={form.control} 
         label='Symptoms/Concerns'
         name='symptoms'
         placeholder='describe symptoms or health concerns'/>


    <TimeSelect
    control={form.control} 
    name='appointmentTime' 
    label='Appointment Time'
  
      />




        <div className='flex justify-end'> 
            {loading ? (
              <LoadingButton/>
            ) :( 
              <CustomButton title={'Proceed'} type={'submit'}/> 
            )}
        
        </div>
      </form>
    </Form>
    </div>
  )
}
