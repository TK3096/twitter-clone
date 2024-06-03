import React from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

import { UserAvatar } from '@/components/user/UserAvatar'

interface PostItemProps {
  body: string
  userImage: string
  name: string
  username: string
  createdAt: string
}

export const PostItem: React.FC<PostItemProps> = (props: PostItemProps) => {
  const { body, userImage, name, username, createdAt } = props

  const duration = dayjs(createdAt).fromNow(true)

  return (
    <div className='px-4 py-5 flex items-center gap-3 border-b-[1px]'>
      <UserAvatar src={userImage} name={name} />
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
