import { ChartBar, Check, MessageCircle, MessageCircleX, X } from 'lucide-react'
import React from 'react'

function DashboardCard() {
  return (
    <div className='grid p-2 grid-cols-2 px-3 lg:px-6 lg:grid-cols-4 gap-4'>
        <div className='p-2  ring-1 ring-slate-100 shadow-sm rounded-sm flex gap-1'>
            <span><ChartBar size={30}/></span>
            <span><h5 className='text-slate-800 text-sm text-center'>Total Appointments</h5>

            <p className='text-slate-800 text-center'>5</p>
            </span>
            
        </div>
        <div className='p-2 ring-1 ring-slate-100 shadow-sm rounded-sm flex gap-1'>
            <span><Check  size={30}/></span>
            <span><h5 className='text-slate-800 text-sm text-center shrink '>Successfull Appointments</h5>

            <p className='text-slate-800 text-center'>5</p>
            </span>
            
        </div>
        <div className='p-2  ring-1 ring-slate-100 shadow-sm rounded-sm flex gap-1'>
            <span><MessageCircleX  /></span>
            <span><h5 className='text-slate-800 text-sm text-center  shrink'>Cancelled Appointments</h5>

            <p className='text-slate-800 text-center'>0</p>
            </span>
            
        </div>

        <div className='p-2 py-3 ring-1 ring-slate-100 shadow-sm rounded-sm flex gap-1'>
            <span><ChartBar size={30}/></span>
            <span><h5 className='text-slate-800 text-center'>Total Appointments</h5>

            <p className='text-slate-800 text-center'>5</p>
            </span>
            
        </div>


    </div>
  )
}

export default DashboardCard