'use client'

import type { PostWithUserAndCommentInfo } from '@/types'

import React from 'react'

import { PostItem } from '@/components/post/PostItem'

interface PostFeedProps {
  data: PostWithUserAndCommentInfo[]
  cb?: () => void
}

export const PostFeed: React.FC<PostFeedProps> = (props: PostFeedProps) => {
  const { data, cb } = props

  return (
    <div>
      {data.map((post) => (
        <PostItem key={post.id} post={post} cb={cb} />
      ))}
    </div>
  )
}
