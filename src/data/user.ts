import type { User } from '@prisma/client'
import type { UserWithFollower } from '@/types'

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

export const update = async (
  id: string,
  data: Pick<User, 'name' | 'bio' | 'email' | 'profileImage' | 'coverImage'>,
) => {
  try {
    const upated = await db.user.update({
      where: {
        id,
      },
      data,
    })

    return upated
  } catch {
    return null
  }
}

export const follow = async (userId: string, followId: string) => {
  try {
    const user = await getUserById(userId)
    const prev = user?.followingIds || []
    const existing = prev.includes(followId)

    let followingIds: string[] = []

    if (existing) {
      followingIds = prev.filter((id) => id !== followId)
    } else {
      followingIds = [...prev, followId]
    }

    const upated = await db.user.update({
      where: {
        id: userId,
      },
      data: {
        followingIds: followingIds,
      },
    })

    return upated
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
    const r = await db.user.findMany({
      where: {
        followingIds: {
          has: id,
        },
      },
      select: {
        id: true,
      },
    })
    const followers = r.map((u) => u.id)

    return { ...user, followers: followers } as UserWithFollower
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
    return []
  }
}
