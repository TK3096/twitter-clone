import React from 'react'
import dayjs from 'dayjs'
import { BiCalendar } from 'react-icons/bi'

import { Button } from '@/components/ui/button'

interface UserBioProps {
  isOwner: boolean
  name: string
  username: string
  bio: string
  createdAt: string
  followers: number
  follwoingIds: string[]
}

export const UserBio: React.FC<UserBioProps> = (props: UserBioProps) => {
  const { isOwner, name, username, bio, createdAt, followers, follwoingIds } =
    props

  return (
    <div className='border-b-[1px] border-neutral-800 pb-4'>
      <div className='flex justify-end p-2'>
        <Button className='rounded-full h-8 w-16 capitalize font-semibold'>
          {isOwner ? 'Edit' : 'Follow'}
        </Button>
      </div>
      <div className='mt-8 px-4'>
        <div className='flex flex-col'>
          <p className='text-white text-2xl font-semibold'>{name}</p>
          <p className='text-md text-muted-foreground'>@{username}</p>
        </div>
        <div className='flex flex-col mt-4'>
          <p className='text-white'>{bio}</p>
          <div className='flex items-center gap-2 mt- text-muted-foreground'>
            <BiCalendar size={24} />
            <p>Joined {dayjs(createdAt).format('MMM YYYY')}</p>
          </div>
        </div>
        <div className='flex items-center mt-4 gap-4'>
          <div className='flex items-center gap-1'>
            <p className='text-white'>{follwoingIds.length}</p>
            <p className='text-muted-foreground'>Following</p>
          </div>

          <div className='flex items-center gap-1'>
            <p className='text-white'>{followers}</p>
            <p className='text-muted-foreground'>Follower</p>
          </div>
        </div>
      </div>
    </div>
  )
}
