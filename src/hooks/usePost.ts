import useSWR from 'swr'

import { fetcher } from '@/lib/utils'

export const usePost = (postId: string) => {
  const {
    data: fetchedPost,
    mutate,
    isLoading,
    error,
  } = useSWR(`/api/posts/${postId}`, fetcher)

  const data = fetchedPost?.data || null

  return {
    data,
    mutate,
    isLoading,
    error,
  }
}
