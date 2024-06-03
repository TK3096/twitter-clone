'use client'

import type { APIResponse } from '@/types'
import type { Post } from '@prisma/client'

import React from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { CreatePostSchema } from '@/shcemas/post'

import { useCurrentUser } from '@/hooks/useCurrentUser'
import { useUser } from '@/hooks/useUser'

import { toast } from 'sonner'
import { UserAvatar } from '@/components/user/UserAvatar'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Form, FormField, FormItem, FormControl } from '@/components/ui/form'

interface PostFormProps {
  cb?: () => void
}

export const PostForm: React.FC<PostFormProps> = (props: PostFormProps) => {
  const { cb } = props

  const user = useCurrentUser()
  const { data } = useUser(user?.id || '')

  const form = useForm({
    resolver: zodResolver(CreatePostSchema),
    defaultValues: {
      userId: user?.id || '',
      body: '',
    },
  })

  const isDirty = form.formState.isDirty

  const handleSubmitForm = async (values: z.infer<typeof CreatePostSchema>) => {
    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })

      const resBody = (await res.json()) as APIResponse<Post>

      if (res.ok && resBody.success) {
        form.reset()
        toast.success('Post created successfully')

        if (cb) {
          cb()
        }
      } else {
        toast.error(!resBody.success && resBody.message)
      }
    } catch (error) {
      toast.error('Something went wrong, please try again')
    }
  }

  if (!user) {
    return null
  }

  return (
    <div className='px-4 py-3 flex gap-3 border-b-[1px]'>
      <UserAvatar src={data?.profileImage || ''} name={data?.name || ''} />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmitForm)} className='w-full'>
          <FormField
            name='body'
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    rows={2}
                    placeholder='What&#39;s happening?'
                    className='border-none focus-visible:ring-0 focus-visible:ring-offset-0'
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <div className='flex justify-end'>
            <Button
              type='submit'
              variant='primary'
              className='rounded-full w-16 h-8'
              disabled={!isDirty}
            >
              Tweet
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
