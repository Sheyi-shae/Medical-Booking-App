import React from 'react'
interface HeaderProps{
    title:string
}
export default function PatientHeader({title}:HeaderProps) {
  return (
    <div><h2 className='capitalize font-bold'>{title}</h2></div>
  )
}
