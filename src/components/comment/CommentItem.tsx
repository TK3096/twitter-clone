'use client'

import type { Post } from '@prisma/client'
import type { APIResponse, CommentWithUser } from '@/types'

import React from 'react'
import { useRouter } from 'next/navigation'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { AiOutlineHeart, AiOutlineMessage, AiFillHeart } from 'react-icons/ai'

import { useCurrentUser } from '@/hooks/useCurrentUser'

import { toast } from 'sonner'
import { UserAvatar } from '@/components/user/UserAvatar'

dayjs.extend(relativeTime)
interface CommentItemProps {
  comment: CommentWithUser
  cb?: () => void
}

export const CommentItem: React.FC<CommentItemProps> = (
  props: CommentItemProps,
) => {
  const { comment, cb } = props

  const { body, user, createdAt } = comment
  const { profileImage, name, username } = user

  const duration = dayjs(createdAt).fromNow(true)

  return (
    <div className='px-4 py-5 flex gap-3 border-b-[1px]'>
      <UserAvatar src={profileImage || ''} name={name} />
      <div className='flex flex-col'>
        <div className='flex items-center gap-2'>
          <p className='text-white font-bold'>{name}</p>
          <span className='text-muted-foreground text-sm'>@{username}</span>
          <span className='text-muted-foreground text-sm'>{duration}</span>
        </div>
        <p>{body}</p>
      </div>
    </div>
  )
}
