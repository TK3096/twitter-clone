'use client'

import type { APIResponse, UserWithFollower } from '@/types'
import type { User } from 'next-auth'

import React from 'react'
import dayjs from 'dayjs'
import { BiCalendar } from 'react-icons/bi'
import { FaCheck } from 'react-icons/fa'

import { useCurrentUser } from '@/hooks/useCurrentUser'
import { useModal } from '@/hooks/useModal'

import { toast } from 'sonner'
import { Button } from '@/components/ui/button'

interface UserBioProps {
  user: UserWithFollower
  mutate: () => void
}

export const UserBio: React.FC<UserBioProps> = (props: UserBioProps) => {
  const { user, mutate } = props

  const { name, username, bio, createdAt, followers, followingIds } = user
  const currentUser = useCurrentUser()

  const isOwner = currentUser?.id === user.id
  const isFollow = user.followers.includes(currentUser?.id as string)

  const { onOpen } = useModal()

  const handleFollow = async () => {
    try {
      const res = await fetch(`/api/users/${currentUser?.id}/follow`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          followId: user.id,
        }),
      })

      const resBody = (await res.json()) as APIResponse<User>

      if (res.ok && resBody.success) {
        mutate()
      } else {
        toast.error(!resBody.success && resBody.message)
      }
    } catch {
      toast.error('Something went wrong, please try again')
    }
  }

  const handleClick = () => {
    if (!currentUser) {
      onOpen('login')
      return
    }

    if (isOwner) {
      onOpen(
        'edit-user',
        {
          user,
        },
        mutate,
      )
    } else {
      handleFollow()
    }
  }

  return (
    <div className='border-b-[1px] border-neutral-800 pb-4'>
      <div className='flex justify-end p-2'>
        <Button
          className='rounded-full h-8 px-3 w-fit capitalize font-semibold'
          onClick={handleClick}
        >
          {isFollow && <FaCheck className='mr-2' />}
          {isOwner ? 'Edit' : isFollow ? 'Unfollow' : 'Follow'}
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
            <p className='text-white'>{followers.length}</p>
            <p className='text-muted-foreground'>Followers</p>
          </div>
        </div>
      </div>
    </div>
  )
}
