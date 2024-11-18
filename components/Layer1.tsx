import { ArrowRight } from 'lucide-react'
import React from 'react'

export default function Layer1() {
  return (
    <div className='p-3 px-4 md:px-6 mx-auto '>
        <h1 className='text-blue-500 md:text-3xl lg:text-5xl text-center  capitalize font-serif  text-2xl '>Telehealth appointments for online urgent care and mental health</h1>
        <p className='p-2 text-sm text-center'>Doctor On Demand offers 24/7 urgent and everyday care wherever you are. Get matched with a top therapist 
            or psychiatrist for your mental health visits. We accept most insurance, which means your visit could be free.</p>



<div className='grid px-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full mt-2 gap-4 md:gap-6'>

<div className='bg-slate-50 shadow-md rounded-xl p-3 px-7 ' >
  <h1 className='capitalize text-slate-950 font-semibold'>everyday care</h1>
  <ul className='text-sm text-slate-900 list-disc'>
    <li>Skin care, rashes</li>
    <li>Acne</li>
    <li>Hair loss</li>
    <li>Eczema</li>
<li>Asthma</li>
 <li>Sexual health</li>
<li>And more</li>
  </ul>
  <p className='capitalize text-blue-500 gap-5 flex font-normal p-1 pt-4 '> Everyday care <ArrowRight/></p>
</div>


<div className='bg-slate-50 shadow-md rounded-xl p-3 px-7 ' >
  <h1 className='capitalize text-slate-950 font-semibold'>urgent care</h1>
  <ul className='text-sm text-slate-900 list-disc'>
    <li>Skin care, rashes</li>
    <li>Acne</li>
    <li>Hair loss</li>
    <li>Eczema</li>
<li>Asthma</li>
 <li>Sexual health</li>
<li>And more</li>
  </ul>
  <p className='capitalize text-blue-500 gap-5 flex font-normal p-1 pt-4 '> urgent care <ArrowRight/></p>
</div>

<div className='bg-slate-50 shadow-md rounded-xl p-3 px-7 ' >
  <h1 className='capitalize text-slate-950 font-semibold'>online therapy</h1>
  <ul className='text-sm text-slate-900 list-disc'>
    <li>Skin care, rashes</li>
    <li>Acne</li>
    <li>Hair loss</li>
    <li>Eczema</li>
<li>Asthma</li>
 <li>Sexual health</li>
<li>And more</li>
  </ul>
  <p className='capitalize text-blue-500 gap-5 flex font-normal p-1 pt-4 '>Online therapy <ArrowRight/></p>
</div>


<div className='bg-slate-50 shadow-md rounded-xl p-3 px-7 ' >
  <h1 className='capitalize text-slate-950 font-semibold'>Online psychiatry</h1>
  <ul className='text-sm text-slate-900 list-disc'>
    <li>Skin care, rashes</li>
    <li>Acne</li>
    <li>Hair loss</li>
    <li>Eczema</li>
<li>Asthma</li>
 <li>Sexual health</li>
<li>And more</li>
  </ul>
  <p className='capitalize text-blue-500 gap-5 flex font-normal p-1 pt-4 '>Online therapy  <ArrowRight/></p>
</div>

</div>
    </div>
  )
}
