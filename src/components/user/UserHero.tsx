import React from 'react'
import Image from 'next/image'
import { UserAvart } from './UserAvatar'

interface UserHeroProps {
  profileImage: string
  coverImage: string
  name: string
}

export const UserHero: React.FC<UserHeroProps> = (props: UserHeroProps) => {
  const { profileImage, coverImage, name } = props

  return (
    <div>
      <div className='bg-neutral-700 h-44 relative'>
        {coverImage && (
          <Image
            src={coverImage}
            fill
            alt='cover image'
            className='object-cover'
          />
        )}
        <div className='absolute -bottom-10 left-4'>
          <UserAvart
            src={profileImage}
            name={name}
            size='large'
            className='border-2'
          />
        </div>
      </div>
    </div>
  )
}
