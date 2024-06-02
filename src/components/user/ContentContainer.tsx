'use client'

import React from 'react'

import { useUsers } from '@/hooks/useUser'
import { useCurrentUser } from '@/hooks/useCurrentUser'

import { UserHero } from '@/components/user/UserHero'
import { UserBio } from '@/components/user/UserBio'

interface ContentContainerProps {
  userId: string
}

export const ContentContainer: React.FC<ContentContainerProps> = (
  props: ContentContainerProps,
) => {
  const { userId } = props

  const currentUser = useCurrentUser()
  const { data, isLoading } = useUsers(userId)
  const user = data[0]

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <UserHero
        profileImage={user?.profileImage || ''}
        coverImage={user?.coverImage || ''}
        name={user.name}
      />
      <UserBio
        isOwner={currentUser?.id === userId}
        name={user.name}
        username={user.username}
        bio={user.bio || ''}
        createdAt={user.createdAt.toString()}
        follwoingIds={user.followingIds}
        followers={0}
      />
    </div>
  )
}
