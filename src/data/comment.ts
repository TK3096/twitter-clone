import type { Comment } from '@prisma/client'

import { db } from '@/lib/db'

export const create = async (
  data: Pick<Comment, 'userId' | 'body' | 'postId'>,
) => {
  try {
    const comment = await db.comment.create({
      data,
    })

    return comment
  } catch {
    return null
  }
}

export const getComments = async (filter?: { postId: string }) => {
  try {
    let condition = {}

    if (filter?.postId) {
      condition = { ...condition, postId: filter.postId }
    }

    const comments = await db.comment.findMany({
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
      },
    })

    return comments
  } catch {
    return []
  }
}
