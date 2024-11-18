'use client';
import { BadgeInfo, BookOpenCheck, FilePieChart, LayoutDashboard, LogOut, Mail, Nfc, Pill, SquareUserRound, UserCog } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { Button } from '../ui/button';

export default function DoctorSidebar() {
  const baseUrl = '/doctor';
  
  const sideLinks = [
    { id: 1, title: 'dashboard', icon: <LayoutDashboard />, url: '' },
    { id: 2, title: 'Appointments', icon: <BookOpenCheck />, url: '/appointments' },
    { id: 3, title: 'patients', icon: <SquareUserRound />, url: '/patients' },
    { id: 4, title: 'Prescriptions', icon: <Pill />, url: '/prescriptions' },
    { id: 5, title: 'medical records', icon: <FilePieChart />, url: '/medical-records' },
    { id: 6, title: 'messages', icon: <Mail />, url: '/messages' },
    { id: 7, title: 'Billing & Payments', icon: <Nfc />, url: '/billing' },
    { id: 8, title: 'profile', icon: <UserCog />, url: '/profile' },
    { id: 9, title: 'support', icon: <BadgeInfo />, url: '/support' },
  ];

  const pathName = usePathname();

  return (
    <div className='text-sm'>
      <div className='lg:w-[20%] hidden md:flex md:w-[5%] h-screen fixed glassmorphism2'>
        <div className='flex flex-col lg:gap-1 md:gap-2 md:p-2 lg:py-8 lg:px-2 mt-10'>
          {sideLinks.map((link) => {
            const fullUrl = `${baseUrl}${link.url}`;
            
            return (
              <Link
                href={fullUrl}
                key={link.id}
                className={`flex text-slate-700 lg:gap-2 md:gap-3 md:p-1 md:px-1 lg:p-3 lg:px-8 ${
                  (pathName === fullUrl || (link.url !== '' && pathName.includes(link.url)))
                    ? 'bg-white md:w-8 lg:w-full rounded-sm'
                    : ''
                }`}
              >
                <span className='text-sm'>{link.icon}</span>
                <span className='capitalize md:hidden lg:block'>{link.title}</span>
              </Link>
            );
          })}

          <div className='bottom-0 flex lg:justify-center lg:items-center w-full md:px-0 lg:px-3 md:mt-16 lg:mt-8'>
            <Button className='text-slate-50 bottom-0 bg-red-600 md:px-1 lg:px-10'>
              <LogOut /> <p className='md:hidden lg:flex'>Sign out</p>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
