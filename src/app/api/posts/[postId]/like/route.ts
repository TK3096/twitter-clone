import type { APIResponse } from '@/types'
import type { Post } from '@prisma/client'

import { NextRequest, NextResponse } from 'next/server'

import { auth } from '@/auth'
import { updateLike } from '@/data/post'

export const PATCH = async (
  req: NextRequest,
  { params }: { params: { postId: string } },
) => {
  const body = (await req.json()) as { userId: string }
  const session = await auth()

  if (session?.user.id !== body.userId) {
    return NextResponse.json<APIResponse>(
      {
        success: false,
        message: 'Unauthorized',
      },
      { status: 401 },
    )
  }

  const updated = await updateLike(params.postId, body.userId)

  if (!updated) {
    return NextResponse.json<APIResponse>(
      {
        success: false,
        message: 'Failed to update like',
      },
      { status: 500 },
    )
  }

  return NextResponse.json<APIResponse<Post>>({
    success: true,
    data: updated,
  })
}
