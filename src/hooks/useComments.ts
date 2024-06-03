import useSWR from 'swr'
import qs from 'query-string'

import { fetcher } from '@/lib/utils'

export const useComments = (filter?: { postId: string }) => {
  const url = qs.stringifyUrl({
    url: '/api/comments',
    query: filter,
  })

  const {
    data: fetchedComments,
    isLoading,
    error,
    mutate,
  } = useSWR(url, fetcher)

  const data = fetchedComments?.data || []

  return {
    data,
    isLoading,
    error,
    mutate,
  }
}
