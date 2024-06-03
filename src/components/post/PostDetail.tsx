'use client'

import React from 'react'

import { usePost } from '@/hooks/usePost'
import { useComments } from '@/hooks/useComments'

import { PostItem } from '@/components/post/PostItem'
import { CommentForm } from '@/components/comment/CommentForm'
import { CommentFeed } from '@/components/comment/CommentFeed'

interface PostDetailProps {
  postId: string
}

export const PostDetail: React.FC<PostDetailProps> = (
  props: PostDetailProps,
) => {
  const { postId } = props

  const fetchedPost = usePost(postId)
  const fetchedComments = useComments({ postId })

  if (fetchedPost.isLoading || fetchedComments.isLoading) {
    return <div>Loading...</div>
  }

  const handleAfterComment = () => {
    fetchedPost.mutate()
    fetchedComments.mutate()
  }

  return (
    <div>
      <PostItem post={fetchedPost.data} cb={fetchedPost.mutate} />
      <CommentForm postId={postId} cb={handleAfterComment} />
      <CommentFeed data={fetchedComments.data} cb={handleAfterComment} />
    </div>
  )
}
