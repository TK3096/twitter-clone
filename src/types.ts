import type { Post, User } from '@prisma/client'

export type APIResponse<T = object> =
  | { success: true; data: T }
  | { success: false; message: string }

export type UserWithFollower = User & { followers: string[] }

export type PostWithUserInfo = Post & {
  user: Pick<User, 'id' | 'profileImage' | 'name' | 'username'>
}
