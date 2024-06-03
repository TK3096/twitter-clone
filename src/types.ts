import type { Post, User } from '@prisma/client'

export type APIResponse<T = object> =
  | { success: true; data: T }
  | { success: false; message: string }

export type UserWithFolloers = User & { followers: number }

export type PostWithUserInfo = Post & {
  user: Pick<User, 'id' | 'profileImage' | 'name' | 'username'>
}
