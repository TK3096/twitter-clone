'use client'

import type { UserWithFolloers } from '@/types'

import React from 'react'
import dayjs from 'dayjs'
import { BiCalendar } from 'react-icons/bi'

import { useModal } from '@/hooks/useModal'

import { Button } from '@/components/ui/button'

interface UserBioProps {
  isOwner: boolean
  user: UserWithFolloers
  mutate: () => void
}

export const UserBio: React.FC<UserBioProps> = (props: UserBioProps) => {
  const { isOwner, user, mutate } = props

  const { name, username, bio, createdAt, followers, followingIds } = user

  const { onOpen } = useModal()

  const handleClick = () => {
    if (isOwner) {
      onOpen(
        'edit-user',
        {
          user,
        },
        mutate,
      )
    }
  }

  return (
    <div className='border-b-[1px] border-neutral-800 pb-4'>
      <div className='flex justify-end p-2'>
        <Button
          className='rounded-full h-8 w-16 capitalize font-semibold'
          onClick={handleClick}
        >
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
          <div className='flex items-center gap-2 mt-4 text-muted-foreground'>
            <BiCalendar size={24} />
            <p>Joined {dayjs(createdAt).format('MMM YYYY')}</p>
          </div>
        </div>
        <div className='flex items-center mt-4 gap-4'>
          <div className='flex items-center gap-1'>
            <p className='text-white'>{followingIds.length}</p>
            <p className='text-muted-foreground'>Following</p>
          </div>

          <div className='flex items-center gap-1'>
            <p className='text-white'>{followers}</p>
            <p className='text-muted-foreground'>Followers</p>
          </div>
        </div>
      </div>
    </div>
  )
}
