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

export const updateLike = async (postId: string, userId: string) => {
  try {
    const post = await getPostById(postId)
    const prev = post?.likedIds || []
    const existing = prev.find((id) => id === userId)

    let likedIds: string[] = []

    if (existing) {
      likedIds = prev.filter((id) => id !== userId)
    } else {
      likedIds = [...prev, userId]
    }

    const updated = await db.post.update({
      where: {
        id: postId,
      },
      data: {
        likedIds: likedIds,
      },
    })

    return updated
  } catch {
    return null
  }
}

export const getPostById = async (id: string) => {
  try {
    const post = await db.post.findUnique({
      where: {
        id,
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
        comments: {
          select: {
            id: true,
            body: true,
            createdAt: true,
            userId: true,
          },
        },
      },
    })

    return post
  } catch {
    return null
  }
}

export const getPosts = async (filter?: { userId: string }) => {
  try {
    let condition = {}

    if (filter?.userId) {
      condition = { ...condition, userId: filter.userId }
    }

    const posts = await db.post.findMany({
      where: condition,
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
        comments: {
          select: {
            id: true,
          },
        },
      },
    })

    return posts
  } catch {
    return []
  }
}
