import React from 'react'
import { BsPersonFill } from 'react-icons/bs'
import { cn } from '@/lib/utils'

import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'

interface UserAvatarProps {
  name: string
  src: string
  size?: 'small' | 'large'
  className?: string
}

export const UserAvatar: React.FC<UserAvatarProps> = (
  props: UserAvatarProps,
) => {
  const { name, src, size = 'small', className } = props

  let imageSize = 0

  switch (size) {
    case 'large':
      imageSize = 80
      break
    default:
      imageSize = 55
      break
  }

  return (
    <Avatar
      className={cn(className, 'w-10 h-10', size === 'large' && 'w-20 h-20')}
    >
      <AvatarImage src={src} alt={name} />
      <AvatarFallback className='bg-neutral-100'>
        <BsPersonFill size={imageSize} className='text-blue-200/40' />
      </AvatarFallback>
    </Avatar>
  )
}
