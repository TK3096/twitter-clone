import type { APIResponse } from '@/types'

import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'

import { signIn } from '@/auth'

import { LoginSchema } from '@/shcemas/auth'

import { getUserByEmail } from '@/data/user'

export const POST = async (req: NextRequest) => {
  const body = await req.json()
  const validateFields = LoginSchema.safeParse(body)

  if (!validateFields.success) {
    return NextResponse.json<APIResponse>(
      {
        success: false,
        message: 'Invalid fields',
      },
      { status: 400 },
    )
  }

  const { email, password } = validateFields.data
  const user = await getUserByEmail(email)

  if (!user || !user.password) {
    return NextResponse.json<APIResponse>(
      {
        success: false,
        message: 'Invalid email',
      },
      { status: 400 },
    )
  }

  const isValidPassword = await bcrypt.compare(password, user.password)

  if (!isValidPassword) {
    return NextResponse.json<APIResponse>(
      {
        success: false,
        message: 'Invalid password',
      },
      { status: 400 },
    )
  }

  await signIn('credentials', { ...body, redirect: false })

  return NextResponse.json<APIResponse<string>>(
    { success: true, data: '' },
    { status: 200 },
  )
}
