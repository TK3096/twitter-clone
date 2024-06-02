'use client'

import React from 'react'

import { useUsers } from '@/hooks/useUser'

interface ContentContainerProps {
  userId: string
}

export const ContentContainer: React.FC<ContentContainerProps> = (
  props: ContentContainerProps,
) => {
  const { userId } = props

  const { data } = useUsers(userId)

  return (
    <div>
      <h1>ContentCo</h1>
    </div>
  )
}
