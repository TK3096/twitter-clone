import type { User } from '@prisma/client'

import { db } from '@/lib/db'

export const create = async (
  data: Pick<User, 'email' | 'username' | 'password' | 'name'>,
) => {
  try {
    const user = await db.user.create({
      data,
    })

    return user
  } catch {
    return null
  }
}

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    })

    return user
  } catch {
    return null
  }
}

export const getUserByUsername = async (username: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        username,
      },
    })

    return user
  } catch {
    return null
  }
}

export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        id,
      },
    })

    return user
  } catch {
    return null
  }
}

export const getUsers = async (excludeId?: string) => {
  try {
    const users = await db.user.findMany({
      where: {
        NOT: {
          id: excludeId,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return users
  } catch {
    return null
  }
}
