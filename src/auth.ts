import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'

import authConfig from '@/auth.config'

import { db } from '@/lib/db'

import { getUserById } from '@/data/user'

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth({
  callbacks: {
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub
      }

      return session
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  ...authConfig,
})
