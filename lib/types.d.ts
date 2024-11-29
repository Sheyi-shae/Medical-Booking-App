import { Control, FieldValues, Path } from "react-hook-form";
declare interface TextInputProps<T extends FieldValues> {
    name: Path<T>;
    control: Control<T>;
    type: string;
    placeholder: string;
    label:string;
  }

  // declare interface CurrentStepProps {
  //   currentStep: number;
    
  // }
 

 // Define the type for each step
declare interface Step {
 
  id: number;
  title: string;
}

declare interface Doctors{
  id: string;
  title: string;
  email: string;
  onclose?: () => void
}
declare interface DoctorsFilter{
  doctors?: Doctors[] |null;
  onclose?: () => void
}

declare interface Options {
  id: string;
  title: string;
}


// Define the interface for props
declare interface StepsProps {
  steps?: Step[];          
  currentStep: number;    
  handleNext:() => void; 
  handlePrevious:() => void; 
}

declare interface PostRequestProps{
  setLoading:(arg:boolean) => void
  endpoint:string
  data:string
  toastSuccess:string
  toastError?:string
  reset:() => void
}
declare interface CreateAppointment{
  reason:string
  symptoms:string
  doctorId:string
  appointmentDate:Date
  appointmentTime:string
        
}

declare interface UserDataProps{
  email: string;
  password: string;
  confirmPassword: string;
  allergies?: string;
  medicalHistory?: string;
  medications?: string;
  firstName: string;
  lastName: string;
  occupation?: string;
  number: string;
  gender?: string;
  dob?:string;
  role:string
  specialization?: string;
  yearsOfExperience?: string;
  licenseNumber?: string;
  consultationFee?: string;
 
  
  imageUrl?:string
}
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
declare interface Appointment  {
  id: string;
  reason: string;
  symptoms?: string;
  doctorFullName: string;
  doctorEmail?: string;
  patientEmail:string;
  patientFullName?: string;
  doctorImageUrl:string | null;
  appointmentDate: Date;
  appointmentTime?: string;
  status: string;

    
  meetingLink?: string | null; // Allow null
  meetingId?: string | null; // Optional, for video call meeting ID
  meetingPassword?: string | null; // Optional, for video call password
  
  paymentStatus?: string | null; // Optional, e.g., "pending", "completed"
  amount?: number | null; // Optional, for the cost of the appointment
  createdAt?: Date; // Timestamp for creation
  updatedAt?: Date; // Timestamp for last update

  // Foreign keys
  patientId?: string;  
  doctorId?: string;      
}

declare interface AppointmentProps {
  appointments: Appointment[]  
}



declare interface ImageInput{
  label:string
  imageUrl:string
  setImageUrl:(arg:string) => void
  //
  className:string
 
}

interface ParamProps {
  params: {
    id: string; 
  };
}

interface IdString {
 
    id: string; 
 
}
