'use client'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,

    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb"
import {  StepsProps } from "@/lib/types";
  import { Progress } from "flowbite-react";



  
export default function StepsCrumb({steps,currentStep}:StepsProps) {
 
  return (
    <div>
    <div className='flex mx-auto justify-center pb-5 '>
      {steps?.map((step,index)=>(
        <Breadcrumb key={step.id}>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink className={`${currentStep===step.id && 'font-semibold text-blue-600'}`}>{step.title}</BreadcrumbLink>
    
    </BreadcrumbItem>
    {index < steps.length - 1 && <BreadcrumbSeparator />}
    
  </BreadcrumbList>
          
        </Breadcrumb>
      ))}
        

</div>
<Progress
      progress={currentStep===1 ? 33:currentStep===2 ? 66 : 100}
      
      size="sm"
      color='blue'
      className="transition-all ease-in-out duration-500"
    
    
    />

    </div>
  )
}
