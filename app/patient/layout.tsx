import Navbar from "@/components/patientsComponents/Navbar";
import Sidebar from "@/components/patientsComponents/Sidebar";

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
    
    <Sidebar/>
    


    <div className="lg:w-[79.4%] gap-2 md:w-[94.4%] flex flex-col w-full ">
      {/* navbar */}
      <Navbar/>
      
      <div className="mt-12 p-3 ">
      {children}
        </div>
      
       </div>
   
   </div>
  );
}
