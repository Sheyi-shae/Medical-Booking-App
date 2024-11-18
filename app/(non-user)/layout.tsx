import Navbar from "@/components/Navbar";
import { cn } from "@/lib/utils"
import { Inter as FontSans } from "next/font/google"


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
    
    <div 
    className={cn(
      "min-h-screen bg-background font-sans antialiased",
      fontSans.variable
    )}
 >
    
      <Navbar/>
{children}
  </div>
   
  );
}
