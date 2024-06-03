import useSWR from 'swr'

import { fetcher } from '@/lib/utils'

export const usePosts = () => {
  const {
    data: fetchedPosts,
    isLoading,
    error,
    mutate,
  } = useSWR('/api/posts', fetcher)

  const data = fetchedPosts?.data || []

  return {
    data,
    isLoading,
    error,
    mutate,
  }
}
