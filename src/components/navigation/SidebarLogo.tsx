import React from 'react'
import { BsTwitter } from 'react-icons/bs'

export const SidebarLogo: React.FC = () => {
  return (
    <div className='h-14 w-14 p-4 flex items-center rounded-full hover:bg-blue-300 hover:bg-opacity-10 transition-colors duration-200'>
      <BsTwitter size={28} color='white' />
    </div>
  )
}
