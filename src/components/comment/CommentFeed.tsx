'use client'

import type { CommentWithUser } from '@/types'

import React from 'react'

import { CommentItem } from '@/components/comment/CommentItem'

interface PostFeedProps {
  data: CommentWithUser[]
  cb?: () => void
}

export const CommentFeed: React.FC<PostFeedProps> = (props: PostFeedProps) => {
  const { data, cb } = props

  return (
    <div>
      {data.map((comment) => (
        <CommentItem key={comment.id} comment={comment} cb={cb} />
      ))}
    </div>
  )
}
