'use client'

import React from 'react'
import { NavHeader } from '@/components/navigation/NavHeader'

import { useUser } from '@/hooks/useUser'

interface UserNavHeaderProps {
  userId: string
}

export const UserNavHeader: React.FC<UserNavHeaderProps> = (
  props: UserNavHeaderProps,
) => {
  const { userId } = props

  const { data } = useUser(userId)

  const name = data?.name ?? ''

  return <NavHeader showBackArrow title={name} />
}
