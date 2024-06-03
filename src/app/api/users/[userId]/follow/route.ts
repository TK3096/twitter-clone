import type { APIResponse } from '@/types'

import { NextResponse, NextRequest } from 'next/server'

import { auth } from '@/auth'

import { follow } from '@/data/user'

export const PATCH = async (
  req: NextRequest,
  { params }: { params: { userId: string } },
) => {
  const { userId } = params
  const session = await auth()
  const body = (await req.json()) as { followId: string }

  if (session?.user?.id !== userId) {
    return NextResponse.json<APIResponse>(
      {
        success: false,
        message: 'Unauthorized',
      },
      { status: 401 },
    )
  }

  const updated = await follow(userId, body.followId)

  if (!updated) {
    return NextResponse.json<APIResponse>(
      {
        success: false,
        message: 'Failed to follow/unfollow user',
      },
      { status: 400 },
    )
  }

  return NextResponse.json<APIResponse>(
    {
      success: true,
      data: updated,
    },
    { status: 200 },
  )
}
