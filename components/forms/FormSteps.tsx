import { StepsProps } from "@/lib/types"
import BasicInfo from "./BasicInfo";
import { Button } from "../ui/button";
import HealthInfo from "./HealthInfo";
import LoginInfo from "./LoginInfo";

 

 

export default function FormSteps({currentStep,handleNext,handlePrevious}:StepsProps) {
  const onNextClick = () => {
    handleNext?.();
  };
  function formSteps(steps:number){
    switch (steps) {
      case 1:
        return <BasicInfo 
        
       currentStep={currentStep}
        handleNext={handleNext} 
       handlePrevious={handlePrevious}
        />
      
        case 2:
          return <HealthInfo 
        
          currentStep={currentStep}
           handleNext={handleNext} 
          handlePrevious={handlePrevious}
           />
           case 3:
          return <LoginInfo 
        
          currentStep={currentStep}
           handleNext={handleNext} 
          handlePrevious={handlePrevious}
           />
       
    
      default:<p>does not exist</p>
        break;
    }
  }


  return (
    <div className="mt-5">
      {formSteps(currentStep)}
     

      
     
    </div>
  )
}
