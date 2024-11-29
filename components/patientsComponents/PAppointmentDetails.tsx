'use client'
import React, { useEffect, useState } from 'react'
import { Card } from '../ui/card'
import { Mail, MapPin, MapPinHouse, User, UserCircle } from 'lucide-react'
import Image from 'next/image'
import { CustomButton } from '../forms/TextInput'
import { Button } from '../ui/button'

import { Appointment, IdString, ParamProps } from '@/lib/types'
import { fetchAppDetails } from '@/_ACTIONS/fetchAppointments'
import { FormatDate } from '@/lib/dateCoverter'
import DetailAppointSkeleton from '../skeletons/DetailAppointSkeleton'
import Swal from 'sweetalert2'
import acceptAppointment from '@/_ACTIONS/updateAppointment'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function PAppointmentDetails({ id }: IdString) {
  const [appDetails, setAppDetails] = useState<Appointment | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const res = await fetchAppDetails({ id })

        setAppDetails(res)
        setLoading(false); // Data fetched, stop loading
      } catch (error) {
        console.error('Error:', error);
        setLoading(false); // Error occurred, stop loading
      }
    };
    fetchData();
  }, [id])


  async function acceptApp() {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ff0000",
      cancelButtonColor: "#808080",
      confirmButtonText: "Yes, accept!"


    }).then(async (result) => {
      if (result.isConfirmed) {



        const response = await acceptAppointment({ id })
        console.log(response)
        if (response.status === 200) {
          router.back()
          // setLoading(false);
          Swal.fire({
            title: "Success",
            text: `Event has been scheduled`,
            icon: "success"
          });


        } if (response.status === 500) {
          Swal.fire({
            title: "Error",
            text: `Ooop! An error occurred`,
            icon: "error"
          });

        }

      }
    });

  }
  return (
    <div className='w-full bg-slate-50 flex flex-col gap-2 px-3 shadow-md'>
      {loading ? (
        <DetailAppointSkeleton />
      ) : (
        <>
          <div >


            <Card className='text-slate-800  '>
              {/*  */}
              <div className='flex space-x-2 p-3 '>
                <div className='' >
                  <Image src={appDetails?.doctorImageUrl ?? ""} height={200} width={200}
                    className='rounded-full w-12 h-12 ' alt='dp' /></div>
                <div className='flex flex-col'>
                  <h3 className='text-base lg:text-lg '>{appDetails?.doctorFullName}</h3>
                  <span className='text-xs gap-1 flex text-slate-600 mb-1'><Mail size={14} /> {appDetails?.doctorEmail}</span>
                </div>


              </div>
              {/*  */}
              <div className=' px-5 p-3 '>
                <div className='bg-slate-100 rounded-sm '>
                  <p className='text-sm pb-2 font-semibold text-black px-2'>Reason:</p>
                  <p className='text-sm  text-black px-2'>{appDetails?.reason}</p>

                </div>


                <div className='flex w-full mt-3 gap-2 lg:flex-row flex-col'>

                  <div className='w-full lg:w-1/2 '>
                    <p className='text-sm pb-2 font-semibold text-slate-800 px-2'>Symptoms:</p>
                    <p className='text-sm  text-slate-800 px-2'>{appDetails?.symptoms}</p>


                  </div>
                  <div className='w-full lg:w-1/2 '>
                    <p className='text-sm pb-2 font-semibold text-slate-800 px-2'>Appointment Type</p>
                    <p className='text-sm flex text-slate-800 px-2'><MapPin size={18} /> Online</p>


                  </div>
                </div>
              </div>

            </Card>
          </div>

          <div>


            <Card>
              <div className='flex w-full mt-3 gap-2 lg:flex-row p-3 flex-col'>

                <div className='w-full lg:w-1/2 '>
                  <p className='text-sm pb-2 font-semibold text-slate-800 px-2'>Date:</p>
                  <p className='text-sm  text-slate-800 px-2'>
                    {FormatDate(new Date(appDetails?.appointmentDate ?? Date.now()))}
                  </p>


                </div>
                <div className='w-full lg:w-1/2 '>
                  <p className='text-sm pb-2 font-semibold text-slate-800 px-2'>Time</p>
                  <p className='text-sm flex text-slate-800 px-2'>{appDetails?.appointmentTime}</p>


                </div>
              </div>

              {appDetails?.status === 'SCHEDULED' && <div className='flex w-full mt-3 gap-2 lg:flex-row p-3 flex-col'>

                <div className='w-full lg:w-1/2 '>
                  <p className='text-sm pb-2 font-semibold text-slate-800 px-2'>Meeting Id:</p>
                  <p className='text-sm  text-slate-800 px-2'>{appDetails?.meetingId}</p>


                </div>
                <div className='w-full lg:w-1/2 '>
                  <p className='text-sm pb-2 font-semibold text-slate-800 px-2'>Meeting Password</p>
                  <p className='text-sm flex text-slate-800 px-2'>{appDetails?.meetingPassword}</p>


                </div>
              </div>}


            </Card>
          </div>

          {appDetails?.status === 'SCHEDULED' && <div className="flex justify-end whitespace-nowrap">
            <Link href={`../../../video`}>
              <CustomButton type='button' title='Start Event' /></Link>
          </div>}


        </>

      )}

    </div>
  )
}
