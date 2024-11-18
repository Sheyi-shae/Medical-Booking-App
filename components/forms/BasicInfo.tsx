'use client'
import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
    Form,
   
  } from "@/components/ui/form"

import TextInput, { CustomButton,  PhoneNumberInput, SelectForm } from "./TextInput"
import {  StepsProps } from '@/lib/types'
import { useDispatch,  } from 'react-redux'
import { basicInfo } from '../../redux/slices/patientSlice'



const formSchema = z.object({
    firstName: z.string().min(2, {
      message: "Must be at least 2 characters.",
    }),
    lastName: z.string().min(2, {
      message: "Must be at least 2 characters.",
    }),
    occupation: z.string().min(2, {
      message: "Must be at least 2 characters.",
    }),
    number: z.string().min(2, {
      message: "Must be at least 2 characters.",
    }),
    gender: z.string(),
    dob: z.string()
  })
export default function BasicInfo({handleNext}:StepsProps) {
  

  const options=[{id:'1',title:'Male'},{id:'2',title:'Female'}]
    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {},
      })
      const dispatch=useDispatch()
     

       // 2. Define a submit handler.
  function onSubmit(data: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    dispatch(basicInfo(data))

    handleNext();
// 
  }
  return (
    <div>
         <Form {...form} >
      <form  className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 space-x-3">
        <TextInput
        name="firstName"
        label="First Name"
        control={form.control}
        placeholder="Joe"
        type="text"
        
        
        />
        <TextInput
        name="lastName"
        label="Last Name"
        control={form.control}
        placeholder="Smith"
        type="text"
        
        
        />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:space-x-3 space-y-3 lg:space-y-0 space-x-0">
        <PhoneNumberInput
        name="number"
        label="Phone Number"
        control={form.control}
        type="text"
        />

<TextInput
        name="occupation"
        label="Occupation"
        control={form.control}
        placeholder="Freelancer"
        type="text"
        
        
        />
        
        </div>
        <div className="grid grid-cols-2 space-x-3 ">
        <SelectForm
        name="gender"
        label="Gender"
        control={form.control}
        placeholder="select your gender"
        options={options}
        />
        {/* <DateOfBirth
        name='dob'
        label='Date of Birth'
        control={form.control}
        /> */}
        <TextInput
        name="dob"
        label="Date of Birth"
        control={form.control}
        placeholder="dd/mm/yyyy"
        type="date"
        
        
        />
        </div>
        <div className='flex justify-end'>
        <CustomButton title={'Next'} type={'submit'}/> 
        </div>
      </form>
    </Form>
    </div>
  )
}
