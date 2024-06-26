import type { UserWithFollower } from '@/types'
import useSWR from 'swr'

import { fetcher } from '@/lib/utils'

export const useUser = (id: string) => {
  const {
    data: fetchedUser,
    error,
    isLoading,
    mutate,
  } = useSWR(`/api/users/${id}`, fetcher)

  const data: UserWithFollower = fetchedUser?.data || null

  return {
    data,
    error,
    isLoading,
    mutate,
  }
}
