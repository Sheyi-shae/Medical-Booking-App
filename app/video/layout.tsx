import Navbar from "@/components/patientsComponents/Navbar";
import Sidebar from "@/components/patientsComponents/Sidebar";

import { Inter as FontSans } from "next/font/google"
import { cn } from "@/lib/utils"
import VideoCall from "@/components/videocallComponent/VideoRoom";



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
      "w-full bg-background font-sans antialiased",
      fontSans.variable
    )}>
     
   
      <div className="mt-12 p-3 ">
      {children}
        </div>
      
      
   
   </div>
  );
}
