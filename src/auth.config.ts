import type { NextAuthConfig } from 'next-auth'

import Credentials from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'

import { LoginSchema } from '@/shcemas/auth'

import { getUserByEmail } from '@/data/user'

export default {
  providers: [
    Credentials({
      authorize: async (credentials) => {
        const validateFields = LoginSchema.safeParse(credentials)

        if (!validateFields.success) {
          return null
        }

        const { email, password } = validateFields.data
        const user = await getUserByEmail(email)

        if (!user || !user.password) {
          return null
        }

        const isValidPassword = await bcrypt.compare(password, user.password)

        if (!isValidPassword) {
          return null
        }

        return user
      },
    }),
  ],
} satisfies NextAuthConfig
