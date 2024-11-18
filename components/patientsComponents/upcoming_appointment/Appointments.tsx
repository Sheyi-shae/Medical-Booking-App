import { CustomButton } from '@/components/forms/TextInput';
import { FormatDate } from '@/lib/dateCoverter';
import { AppointmentProps } from '@/lib/types';
import { LocateIcon, MapPinCheck, TimerIcon, User2, Users } from 'lucide-react';
import React from 'react';

export default function ScheduledAppointments({ appointments }: AppointmentProps) {
  return (
    <div className="w-full ">
      {appointments.map((appointment) => (
        <div key={appointment.id} className="ring-1 ring-slate-200  rounded-sm shadow-sm w-full gap-2 flex p-4 my-2">
          <div className='border-r-2 px-2'>{FormatDate(new Date(appointment.appointmentDate))}</div>

          <div className='flex flex-col text-xs gap-2 p-2'>
            <div className='flex gap-1'><TimerIcon size={16}/>{appointment.appointmentTime}</div>
            <div className='flex gap-1'> <MapPinCheck  size={16}/> Online</div>
            </div>

            
          <div className=' mr-8 ml-3 text-sm md:text-base flex flex-col gap-1 line-clamp-1 w-[50%]'>
            <div className='text-left capitalize text-cyan-700'>{appointment.reason}</div>
            <div className='text-center text-xs text-slate-600 flex gap-1 capitalize'><Users  size={18}/>-Dr.{appointment.doctorFullName}</div>
            </div>
          <div className="flex justify-end">
            <CustomButton type='button' title='details'/>
          </div>
        </div>
      ))}
    </div>
  );
}
