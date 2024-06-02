import type { User } from '@prisma/client'

export type APIResponse<T = object> =
  | { success: true; data: T }
  | { success: false; message: string }

export type UserWithFolloers = User & { followers: number }
