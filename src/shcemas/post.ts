import * as z from 'zod'

export const CreatePostSchema = z.object({
  userId: z.string().min(1, { message: 'User ID is required' }),
  body: z
    .string()
    .min(1, 'Post must be at least 1 character long')
    .max(280, 'Post must be at most 280 characters long'),
})
