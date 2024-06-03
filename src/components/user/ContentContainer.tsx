'use client'

import React from 'react'

import { useUser } from '@/hooks/useUser'

import { UserHero } from '@/components/user/UserHero'
import { UserBio } from '@/components/user/UserBio'

interface ContentContainerProps {
  userId: string
}

export const ContentContainer: React.FC<ContentContainerProps> = (
  props: ContentContainerProps,
) => {
  const { userId } = props

  const { data, isLoading, mutate } = useUser(userId)

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <UserHero
        profileImage={data?.profileImage || ''}
        coverImage={data?.coverImage || ''}
        name={data.name}
      />
      <UserBio user={data} mutate={mutate} />
    </div>
  )
}
