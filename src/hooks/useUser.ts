import type { User } from '@prisma/client'
import useSWR from 'swr'
import qs from 'query-string'

import { fetcher } from '@/lib/utils'

export const useUsers = (id?: string) => {
  const url = qs.stringifyUrl({
    url: `/api/users`,
    query: {
      userId: id,
    },
  })
  const { data: fetchedUsers, error, isLoading, mutate } = useSWR(url, fetcher)

  const data: User[] = fetchedUsers?.data || []

  return {
    data,
    error,
    isLoading,
    mutate,
  }
}
