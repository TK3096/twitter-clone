'use client'

import React from 'react'

import { usePosts } from '@/hooks/usePosts'

import { PostForm } from '@/components/post/PostForm'
import { PostFeed } from '@/components/post/PostFeed'

export const PostWrapper: React.FC = () => {
  const { mutate, data } = usePosts()

  return (
    <div>
      <PostForm cb={mutate} />
      <PostFeed data={data} />
    </div>
  )
}
