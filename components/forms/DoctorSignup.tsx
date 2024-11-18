'use client'
import { StepsProps } from '@/lib/types'
import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
    Form,
   
  } from "@/components/ui/form"

import TextInput, { CustomButton, CustomOutlineButton, LoadingButton, PhoneNumberInput, SelectForm, } from "./TextInput"
import ImageUploader from '../doctorsComponent/ImageUploader'
import signUp from '@/_ACTIONS/users'
import { useToast } from '../ui/use-toast'
import { useRouter } from 'next/navigation'

const formSchema = z.object({
    email: z.string().email({
      message: "Invalid email address.",
    }),
    firstName: z.string().min(2, {
      message: "Must be at least 2 characters.",
    }),
    lastName: z.string().min(2, {
      message: "Must be at least 2 characters.",
    }),
   
    number: z.string().min(2, {
      message: "Must be at least 2 characters.",
    }),
    specialization:z.string(),
    yearsOfExperience:z.string(),
    licenseNumber: z.string().min(8, {
      message: "Invalid medical license number",
    }),

    consultationFee: z.string().min(3, {
      message: "consultation fee is too low",
    },).max(3, {
      message: "consultation fee is too high",
    },),
   
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

export default function DoctorSignup() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: { },
      })

      const [imageUrl, setImageUrl] = useState('')
      const [loading, setLoading] = useState(false)
      const { toast } = useToast()
   const router = useRouter()
     

       // 2. Define a submit handler.
  async function onSubmit(data: z.infer<typeof formSchema>) {
    const doctorSignup={...data,imageUrl,role:'doctor'}
    try {
      
      setLoading(true)
          const newUser = await signUp(doctorSignup)
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
   
 
  }



// Specialization: Medical field of expertise (e.g., cardiology, pediatrics).
const specialization=[{id:'1',title:'Cardiology (Heart and blood vessels)'},
  {id:'2',title:"Pediatrics (Children's health)"},
  {id:'3',title:"Dermatology (Skin, hair, and nails)"},
  {id:'4',title:"Ophthalmology (Eye health)"},
  {id:'5',title:"Gastroenterology (Digestive system)"},
  {id:'6',title:"Obstetrics and Gynecology (Pregnancy and women's reproductive health)"},
  {id:'6',title:"Psychiatry (Mental health)"}
]
  

// Years of Experience: Professional experience details.
const years=[{id:'1',title:'2'},
  {id:'2',title:"3+"},
  {id:'3',title:"5+"},
  {id:'4',title:"10+"},
  
]

// Consultation Fee: Amount charged for appointments.
// Profile Picture: Optional but useful for patient trust.
  return (
    <div>
         <Form {...form} >
      <form  className="space-y-4 overflow-scroll h-[90vh]" onSubmit={form.handleSubmit(onSubmit)}>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-3'>
          <TextInput
        name="firstName"
        label="First Name"
        control={form.control}
        placeholder="smith"
        type="text"
        
        
        />
        <TextInput
        name="lastName"
        label="Last Name"
        control={form.control}
        placeholder="joe"
        type="text"
        
        
        />

        <TextInput
        name="email"
        label="Email"
        control={form.control}
        placeholder="example@info.com"
        type="text"
        
        />
         <PhoneNumberInput
        name="number"
        label="Phone Number"
        control={form.control}
        type="text"
        />


<SelectForm
        name="yearsOfExperience"
        label="Years of Experience"
        control={form.control}
        placeholder="--------"
        options={years}
        /> 
        <TextInput
        name="consultationFee"
        label="Consultation Fee"
        control={form.control}
        placeholder="&#x20A6;10,000 "
        type="number"
        
        />
        </div>
      
          <TextInput
        name="licenseNumber"
        label="Medical License Number"
        control={form.control}
        placeholder="8u8u888848"
        type="text"
        
        />
        <SelectForm
        name="specialization"
        label="Specialization"
        control={form.control}
        placeholder="select area of specialization"
        options={specialization}
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
        <ImageUploader className='w-full' label='Passport' imageUrl={imageUrl} setImageUrl={setImageUrl}/>
        <div className='flex justify-center items-center'>
        {loading ? (
          <LoadingButton />
        ):(
          <>
          {imageUrl && <CustomButton title={'Sign up as a Doctor'} type={'submit'}/> }
          </>
          )}
        
        </div>
      </form>
    </Form>
    </div>
  )
}
