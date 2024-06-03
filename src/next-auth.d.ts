import { type DefaultSession } from 'next-auth'

export type ExtendedUser = DefaultSession['user'] & {
  followingIds: string[]
}

declare module 'next-auth' {
  interface Session {
    user: ExtendedUser
  }
}
