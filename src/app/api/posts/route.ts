import type { Post } from '@prisma/client'
import type { PostWithUserAndCommentInfo } from '@/types'
import type { APIResponse } from '@/types'

import { NextRequest, NextResponse } from 'next/server'

import { auth } from '@/auth'

import { CreatePostSchema } from '@/shcemas/post'

import { create, getPosts } from '@/data/post'

export const POST = async (req: NextRequest) => {
  const body = await req.json()
  const validateFields = CreatePostSchema.safeParse(body)

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

  const { userId, body: postBody } = validateFields.data
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

  const post = await create({ body: postBody, userId })

  if (!post) {
    return NextResponse.json<APIResponse>(
      {
        success: false,
        message: 'Failed to create post',
      },
      {
        status: 500,
      },
    )
  }

  return NextResponse.json<APIResponse<Post>>(
    {
      success: true,
      data: post,
    },
    { status: 201 },
  )
}

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url)
  const filter = {
    userId: searchParams.get('userId') as string,
  }

  const posts = await getPosts(filter)

  return NextResponse.json<APIResponse<PostWithUserAndCommentInfo[]>>(
    {
      success: true,
      data: posts,
    },
    { status: 200 },
  )
}
