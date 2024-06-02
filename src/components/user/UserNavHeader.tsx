'use client'

import React from 'react'
import { NavHeader } from '@/components/navigation/NavHeader'

import { useUsers } from '@/hooks/useUser'

interface UserNavHeaderProps {
  userId: string
}

export const UserNavHeader: React.FC<UserNavHeaderProps> = (
  props: UserNavHeaderProps,
) => {
  const { userId } = props

  const { data } = useUsers(userId)

  const name = data.length > 0 ? data[0].name : ''

  return <NavHeader showBackArrow title={name} />
}
