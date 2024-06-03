import useSWR from 'swr'
import qs from 'query-string'

import { fetcher } from '@/lib/utils'

export const usePosts = (filter?: { userId: string }) => {
  const url = qs.stringifyUrl({
    url: '/api/posts',
    query: filter,
  })

  const { data: fetchedPosts, isLoading, error, mutate } = useSWR(url, fetcher)

  const data = fetchedPosts?.data || []

  return {
    data,
    isLoading,
    error,
    mutate,
  }
}
