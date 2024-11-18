
'use client'
import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
    Form,
   
  } from "@/components/ui/form"

import  { CustomButton,  CustomOutlineButton,   TextAreaInput } from "./TextInput"
import {  StepsProps } from '@/lib/types'
import { useDispatch, useSelector } from 'react-redux'
import { medicalInfo } from '@/redux/slices/patientSlice'
import { RootState } from '@/redux/store'


const formSchema = z.object({
    medicalHistory: z.string().min(5, {
      message: "Invalid medical history.",
    }),
    medications: z.string().min(5, {
        message: "Invalid medications",
      }),
      allergies: z.string().min(2, {
        message: "Must be at least 2 characters.",
      }),
   
    });
    
  

export default function HealthInfo({handleNext,handlePrevious}:StepsProps) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: { },
      })
      const dispatch=useDispatch()
      
      function onSubmit(data: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        dispatch(medicalInfo(data))
        console.log(data)
        handleNext();
    // 
      }
  return (
    <div>
           <Form {...form} >
      <form  className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        
        <TextAreaInput
        name="medicalHistory"
        label="Medical History"
        control={form.control}
        placeholder="Diabetes,Hypertension etc..."
        
        
        
        />
        <TextAreaInput
        name="allergies"
        label="Allergies"
        control={form.control}
        placeholder="peanuts,oil etc..."
        
        
        
        />
        <TextAreaInput
        name="medications"
        label="Current Medication "
        control={form.control}
        placeholder="Metformin,Lisinopril etc..."
        
        
        
        />
        
        
      
        <div className='flex justify-between'>
       <span onClick={handlePrevious}><CustomOutlineButton title={'Prev'} type={'button'}   /></span>  
        <CustomButton title={'Next'} type={'submit'}/> 
        </div>
      </form>
    </Form>
    </div>
  )
}
