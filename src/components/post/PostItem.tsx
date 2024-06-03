import type { PostWithUserAndCommentInfo } from '@/types'

import React from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { AiOutlineHeart, AiOutlineMessage } from 'react-icons/ai'

dayjs.extend(relativeTime)

import { UserAvatar } from '@/components/user/UserAvatar'

interface PostItemProps {
  post: PostWithUserAndCommentInfo
}

export const PostItem: React.FC<PostItemProps> = (props: PostItemProps) => {
  const { post } = props

  const { body, user, createdAt, comments } = post
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
        <div className='mt-4 flex gap-5'>
          <div className='text-muted-foreground flex items-center gap-2 cursor-pointer'>
            <AiOutlineMessage size={16} />
            <span>{comments.length}</span>
          </div>
          <div className='text-muted-foreground flex items-center gap-2 cursor-pointer'>
            <AiOutlineHeart size={16} />
            <span>{post.likedIds.length}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
