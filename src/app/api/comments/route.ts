import type { Comment } from '@prisma/client'
import type { APIResponse, CommentWithUser } from '@/types'

import { NextRequest, NextResponse } from 'next/server'

import { auth } from '@/auth'

import { CreateCommentSchema } from '@/shcemas/comment'

import { create, getComments } from '@/data/comment'

export const POST = async (req: NextRequest) => {
  const body = await req.json()
  const validateFields = CreateCommentSchema.safeParse(body)

  if (!validateFields.success) {
    return NextResponse.json<APIResponse>(
      {
        success: false,
        message: 'Invalid fields',
      },
      {
        status: 400,
      },
    )
  }

  const { userId, body: commentBody, postId } = validateFields.data
  const session = await auth()

  if (session?.user?.id !== userId) {
    return NextResponse.json<APIResponse>(
      {
        success: false,
        message: 'Unauthorized',
      },
      {
        status: 403,
      },
    )
  }

  const comment = await create({ body: commentBody, userId, postId })

  if (!comment) {
    return NextResponse.json<APIResponse>(
      {
        success: false,
        message: 'Failed to create comment',
      },
      {
        status: 500,
      },
    )
  }

  return NextResponse.json<APIResponse<Comment>>(
    {
      success: true,
      data: comment,
    },
    { status: 201 },
  )
}

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url)
  const filter = {
    postId: searchParams.get('postId') as string,
  }

  const comments = await getComments(filter)

  return NextResponse.json<APIResponse<CommentWithUser[]>>(
    {
      success: true,
      data: comments,
    },
    { status: 200 },
  )
}
