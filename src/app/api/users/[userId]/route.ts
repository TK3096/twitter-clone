import type { APIResponse } from '@/types'
import type { UserWithFollower } from '@/types'
import type { User } from '@prisma/client'

import { NextRequest, NextResponse } from 'next/server'

import { EditUserSchema } from '@/shcemas/user'

import { getUserByEmail, getUserById, update } from '@/data/user'

export const GET = async (
  req: NextRequest,
  { params }: { params: { userId: string } },
) => {
  const { userId } = params
  const user = await getUserById(userId)

  return NextResponse.json<APIResponse<UserWithFollower | null>>({
    success: true,
    data: user,
  })
}

export const PATCH = async (
  req: NextRequest,
  { params }: { params: { userId: string } },
) => {
  const { userId } = params
  const body = await req.json()
  const validateFields = EditUserSchema.safeParse(body)

  if (!validateFields.success) {
    return NextResponse.json<APIResponse>(
      {
        success: false,
        message: 'Invalid fields',
      },
      { status: 400 },
    )
  }

  const { name, email, bio, profileImage, coverImage } = validateFields.data

  const existingUser = await getUserByEmail(email)

  if (existingUser && existingUser.id !== userId) {
    return NextResponse.json<APIResponse>(
      {
        success: false,
        message: 'Email already in use',
      },
      { status: 400 },
    )
  }

  const updated = await update(userId, {
    name,
    email,
    bio,
    profileImage,
    coverImage,
  })

  if (!updated) {
    return NextResponse.json<APIResponse>(
      {
        success: false,
        message: 'Failed to update user',
      },
      { status: 500 },
    )
  }

  return NextResponse.json<APIResponse<User>>(
    {
      success: true,
      data: updated,
    },
    { status: 200 },
  )
}
