'use client'

import type { PostWithUserInfo } from '@/types'

import React from 'react'

import { PostItem } from '@/components/post/PostItem'

interface PostFeedProps {
  data: PostWithUserInfo[]
}

export const PostFeed: React.FC<PostFeedProps> = (props: PostFeedProps) => {
  const { data } = props

  return (
    <div>
      {data.map((post) => (
        <PostItem
          key={post.id}
          userImage={post.user.profileImage || ''}
          body={post.body}
          name={post.user.name}
          username={post.user.username}
          createdAt={post.createdAt.toString()}
        />
      ))}
    </div>
  )
}
