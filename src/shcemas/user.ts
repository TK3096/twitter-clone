import * as z from 'zod'

export const EditUserSchema = z.object({
  email: z.string().email({ message: 'Invalid email' }),
  name: z
    .string()
    .min(3, { message: 'Name must be at least 3 characters long' }),
  bio: z.string(),
  profileImage: z.string(),
  coverImage: z.string(),
})
