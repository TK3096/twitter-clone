'use client'

import React from 'react'

import { useUser } from '@/hooks/useUser'
import { usePosts } from '@/hooks/usePosts'

import { UserHero } from '@/components/user/UserHero'
import { UserBio } from '@/components/user/UserBio'
import { PostFeed } from '@/components/post/PostFeed'

interface ContentContainerProps {
  userId: string
}

export const ContentContainer: React.FC<ContentContainerProps> = (
  props: ContentContainerProps,
) => {
  const { userId } = props

  const fetchedUser = useUser(userId)
  const fetchedPosts = usePosts({ userId })

  if (fetchedUser.isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <UserHero
        profileImage={fetchedUser.data?.profileImage || ''}
        coverImage={fetchedUser.data?.coverImage || ''}
        name={fetchedUser.data.name}
      />
      <UserBio user={fetchedUser.data} mutate={fetchedUser.mutate} />
      <PostFeed data={fetchedPosts.data} cb={fetchedPosts.mutate} />
    </div>
  )
}
