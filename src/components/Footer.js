import React from 'react'
import logo from "../assets/img/logo.png"

export const Footer = () => {
  return (
    <div className='absolute bg-[#278cee] flex justify-center h-12 w-full bottom-0 items-center'>
        <img className=' h-6' src={logo} alt='NotarID'></img>
        
    </div>
  )
}
