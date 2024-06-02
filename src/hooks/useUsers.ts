import type { User } from '@prisma/client'
import useSWR from 'swr'

import { fetcher } from '@/lib/utils'

export const useUsers = () => {
  const {
    data: fetchedUsers,
    error,
    isLoading,
    mutate,
  } = useSWR('/api/users', fetcher)

  const data: User[] = fetchedUsers?.data || []

  return {
    data,
    error,
    isLoading,
    mutate,
  }
}
