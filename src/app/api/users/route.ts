import type { APIResponse } from '@/types'

import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'

import { RegisterSchema } from '@/shcemas/auth'

import { getUserByEmail, create, getUserByUsername } from '@/data/user'

export const POST = async (req: NextRequest) => {
  const body = await req.json()
  const validateFields = RegisterSchema.safeParse(body)

  if (!validateFields.success) {
    return NextResponse.json<APIResponse>(
      {
        success: false,
        message: 'Invalid fields',
      },
      { status: 400 },
    )
  }

  const { email, password, username, name } = validateFields.data
  const existingEmail = await getUserByEmail(email)
  const existingUsername = await getUserByUsername(username)

  if (existingEmail) {
    return NextResponse.json<APIResponse>(
      {
        success: false,
        message: 'Email already exists',
      },
      { status: 400 },
    )
  }

  if (existingUsername) {
    return NextResponse.json<APIResponse>(
      {
        success: false,
        message: 'Username already exists',
      },
      { status: 400 },
    )
  }

  const hashedpassowrd = await bcrypt.hash(password, 10)
  const user = await create({
    email,
    password: hashedpassowrd,
    username,
    name,
  })

  if (!user) {
    return NextResponse.json<APIResponse>(
      {
        success: false,
        message: 'Failed to create user',
      },
      { status: 500 },
    )
  }

  return NextResponse.json<APIResponse<{ id: string }>>(
    {
      success: true,
      data: { id: user.id },
    },
    { status: 201 },
  )
}
