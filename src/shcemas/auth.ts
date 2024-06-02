import * as z from 'zod'

export const LoginSchema = z.object({
  email: z.string().email({ message: 'Invalid email' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' }),
})

export const RegisterSchema = z.object({
  email: z.string().email({ message: 'Invalid email' }),
  name: z.string().min(3, { message: 'Name must be at least 3 characters' }),
  username: z
    .string()
    .min(3, { message: 'Username must be at least 3 characters' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' }),
})
