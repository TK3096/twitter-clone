import type { Post } from '@prisma/client'

import { db } from '@/lib/db'

export const create = async (data: Pick<Post, 'userId' | 'body'>) => {
  try {
    const post = await db.post.create({
      data,
    })

    return post
  } catch {
    return null
  }
}

export const getPosts = async () => {
  try {
    const posts = await db.post.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        user: {
          select: {
            id: true,
            profileImage: true,
            username: true,
            name: true,
          },
        },
      },
    })

    return posts
  } catch {
    return []
  }
}
