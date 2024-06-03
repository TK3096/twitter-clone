import type { Post, User, Comment } from '@prisma/client'

export type APIResponse<T = object> =
  | { success: true; data: T }
  | { success: false; message: string }

export type UserWithFollower = User & { followers: string[] }

export type PostWithUserAndCommentInfo = Post & {
  user: Pick<User, 'id' | 'profileImage' | 'name' | 'username'>
  comments: Pick<Comment, 'id'>[]
}
