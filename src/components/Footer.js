import React from 'react'
//import logo from "../assets/img/logo.png"
import logo from "../assets/img/logo3.png"

export const Footer = () => {
  return (
    <div className='absolute bg-[#278cee] flex justify-center h-12 w-full bottom-0  items-center'>
        <img className=' h-6' src={logo} alt='NotarID'></img>
        <h2 className='ml-6 text-white text-sm'>All rights reserved - 2023</h2>
        
    </div>
  )
}
