'use client'
import { store } from '@/redux/store';
import React from 'react'
// import { ToastContainer } from 'react-toastify';
import { Toaster } from "@/components/ui/toaster"
import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react";



export default function Providers({children}: Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    
    <Provider store={store}>
        <SessionProvider>{children}</SessionProvider>
         <Toaster /> 
       
        </Provider>
    
  )
}
