import React from 'react'
import { BsPersonFill } from 'react-icons/bs'

import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'

interface UserAvartProps {
  name: string
  src: string
}

export const UserAvart: React.FC<UserAvartProps> = (props: UserAvartProps) => {
  const { name, src } = props

  return (
    <Avatar>
      <AvatarImage src={src} alt={name} />
      <AvatarFallback className='bg-neutral-100'>
        <BsPersonFill size={55} className='text-blue-200/40' />
      </AvatarFallback>
    </Avatar>
  )
}
