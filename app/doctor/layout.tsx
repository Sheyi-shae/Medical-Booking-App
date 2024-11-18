import DoctorNavbar from "@/components/doctorsComponent/DoctorNavbar";
import DoctorSidebar from "@/components/doctorsComponent/DoctorSidebar";

import { Inter as FontSans } from "next/font/google"
import { cn } from "@/lib/utils"



// const inter = Inter({ subsets: ["latin"] });
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})



export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <div  className={cn(
      "w-full  flex justify-between min-h-screen bg-background font-sans antialiased",
      fontSans.variable
    )}>
      {/* sidebar */}
    
    <DoctorSidebar/>
    


    <div className="lg:w-[79.4%] gap-2 md:w-[94.4%] flex flex-col w-full ">
      {/* navbar */}
     <DoctorNavbar/>
      
      <div className="mt-12 p-3 ">
      {children}
        </div>
      
       </div>
   
   </div>
  );
}
