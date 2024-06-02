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
  const { data, error, isLoading, mutate } = useSWR(url, fetcher)

  return {
    data,
    error,
    isLoading,
    mutate,
  }
}
