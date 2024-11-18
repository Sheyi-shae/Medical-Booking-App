import Image from "next/image";
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
    
      <div className="flex justify-center items-center  mx-auto  flex-col md:flex-row w-full ">
      <div className={cn(
      "min-h-screen bg-background font-sans antialiased w-full p-8 md:p-1 mt-36 lg:mt-14  md:w-1/2 lg:w-[45%] px-2 md:px-2",
      fontSans.variable
    )}>{children}</div>
      <div className="hidden md:flex md:w-1/2 lg:w-[50%] px-1 relative h-screen bg-blue-200 blending-mask">
      <Image src={'/images/main.webp'} className="  md:h-[62vh] lg:h-[79vh]   flex  items-center  px-3 absolute " unoptimized height={1000} width={1000} alt="sign"/></div>

</div>
   
  );
}
