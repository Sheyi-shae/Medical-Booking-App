
"use client";

import {  Checkbox, Modal} from "flowbite-react";
import { useState } from "react";
import { Button } from "@/components/ui/button"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
    Form,
   
  } from "@/components/ui/form"

import TextInput, {  CustomOutlineButton, LoadingButton } from "@/components/forms/TextInput"
import { useToast } from "../ui/use-toast";
import { IdString } from "@/lib/types";
import { declineAppointment } from "@/_ACTIONS/updateAppointment";
import { ThreeCircles } from "react-loader-spinner";




const formSchema = z.object({
    
    reason: z.string().min(5, {
        message: "Please enter a valid reason",
      }),
    
    
  })


export function DeclineEvent(id:IdString) {
  const [openModal, setOpenModal] = useState(false);
   function onCloseModal() {
    setOpenModal(false);

  }

  const [loading, setloading] = useState(false)
  const {toast}=useToast()
  
    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {},
      })

      // 2. Define a submit handler.
  async function onSubmit(data: z.infer<typeof formSchema>) {
    const declineData={...data,...id}
    try {
      setloading(true)
     const appointment= await declineAppointment(declineData)
      toast({
        // title: `${appointment?.message}`,
        // description: `${appointment?.subMessage}`,
        // action: (
        //   <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
        // ),
      })
    //   if(appointment?.status===200){
    //     onCloseModal()
  
    //   }
      setloading(false)

     
    } catch (error) {
      console.log(error)
      setloading(false)
    }
  }
  return (
    <>
       
         <Button onClick={() => setOpenModal(true)} className='text-slate-50   bg-red-600 hover:bg-red-700 '>Decline</Button>
     
          
          <Modal show={openModal} size="lg" onClose={onCloseModal} popup>
        <Modal.Header />
       
        <div className='p-2'>
        <Form {...form} >
      <form  className="space-y-6  " onSubmit={form.handleSubmit(onSubmit)}>
       
     
       <TextInput 
       control={form.control}
       label="Reason"
       name="reason"
       placeholder="please enter a valid reason"

       />
        




        <div className='flex justify-end gap-2'> 
        <Button onClick={onCloseModal} >Cancel</Button>
            {loading ? (
               <Button type='button' disabled className='bg-red-600' >
               <ThreeCircles
               visible={true}
               height="20"
               width="20"
               color="white"
               ariaLabel="three-circles-loading"
               wrapperStyle={{}}
               wrapperClass=""
               />
               </Button> 
            ) :( 
              <Button type='submit' className='bg-red-600' >Proceed</Button> 
            )}
        
        </div>
      </form>
    </Form>
    </div>
            
        {/* </Modal.Body> */}
      </Modal>
    </>
  )
}
