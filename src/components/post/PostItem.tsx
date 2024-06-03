'use client'

import type { Post } from '@prisma/client'
import type { APIResponse, PostWithUserAndCommentInfo } from '@/types'

import React from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { AiOutlineHeart, AiOutlineMessage } from 'react-icons/ai'

import { useCurrentUser } from '@/hooks/useCurrentUser'

import { toast } from 'sonner'
import { UserAvatar } from '@/components/user/UserAvatar'

dayjs.extend(relativeTime)
interface PostItemProps {
  post: PostWithUserAndCommentInfo
  cb?: () => void
}

export const PostItem: React.FC<PostItemProps> = (props: PostItemProps) => {
  const { post, cb } = props

  const currentUser = useCurrentUser()

  const { body, user, createdAt, comments } = post
  const { profileImage, name, username } = user

  const duration = dayjs(createdAt).fromNow(true)

  const handleLike = async () => {
    try {
      const res = await fetch(`/api/posts/${post.id}/like`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: currentUser?.id,
        }),
      })

      const resBody = (await res.json()) as APIResponse<Post>

      if (res.ok && resBody.success) {
        toast.success('Post liked')
        if (cb) {
          cb()
        }
      } else {
        toast.error(!resBody.success && resBody.message)
      }
    } catch {
      toast.error('Something went wrong, please try again later')
    }
  }

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
        <div className='mt-4 flex gap-5'>
          <div className='text-muted-foreground flex items-center gap-2 cursor-pointer'>
            <AiOutlineMessage size={16} />
            <span>{comments.length}</span>
          </div>
          <div
            className='text-muted-foreground flex items-center gap-2 cursor-pointer'
            onClick={handleLike}
          >
            <AiOutlineHeart size={16} />
            <span>{post.likedIds.length}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
