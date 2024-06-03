import type { APIResponse } from '@/types'
import type { PostWithUserAndCommentInfo } from '@/types'

import { NextRequest, NextResponse } from 'next/server'

import { getPostById } from '@/data/post'

export const GET = async (
  req: NextRequest,
  { params }: { params: { postId: string } },
) => {
  const post = await getPostById(params.postId)

  return NextResponse.json<APIResponse<PostWithUserAndCommentInfo | null>>({
    success: true,
    data: post,
  })
}
