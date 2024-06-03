'use client'

import type { APIResponse } from '@/types'
import type { User } from '@prisma/client'

import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

import { EditUserSchema } from '@/shcemas/user'

import { useModal } from '@/hooks/useModal'

import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { FloatingInput } from '@/components/common/FloatingInput'
import { Textarea } from '@/components/ui/textarea'
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormMessage,
} from '@/components/ui/form'

export const EditUserModal: React.FC = () => {
  const { type, open, onClose, data, cb } = useModal()

  const form = useForm({
    resolver: zodResolver(EditUserSchema),
    defaultValues: {
      email: '',
      name: '',
      bio: '',
    },
  })

  const isOpen = type === 'edit-user' && open
  const isDirty = form.formState.isDirty

  const handleSubmitForm = async (values: z.infer<typeof EditUserSchema>) => {
    try {
      const res = await fetch(`/api/users/${data?.user?.id!}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })

      const resBody = (await res.json()) as APIResponse<User>

      if (res.ok && resBody.success) {
        if (cb) {
          cb()
        }
        toast.success('Profile updated successfully')
        handleClose()
      } else {
        toast.error(!resBody.success && resBody.message)
      }
    } catch {
      toast.error('Something went wrong. Please try again')
    }
  }

  const handleClose = () => {
    form.reset()
    onClose()
  }

  useEffect(() => {
    if (data?.user) {
      form.setValue('email', data.user.email)
      form.setValue('name', data.user.name)
      form.setValue('bio', data.user.bio || '')
    }
  }, [data?.user, form])

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader className='pb-8'>
          <DialogTitle className='text-3xl font-bold'>
            Edit your profile
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmitForm)}
            className='space-y-20'
          >
            <div className='space-y-3'>
              <FormField
                name='email'
                control={form.control}
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormControl>
                      <FloatingInput
                        id='email'
                        type='email'
                        label='Email'
                        error={fieldState.error?.message}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name='name'
                control={form.control}
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormControl>
                      <FloatingInput
                        id='name'
                        type='text'
                        label='Name'
                        error={fieldState.error?.message}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name='bio'
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        rows={6}
                        placeholder='Tell us about yourself'
                        className='border-2'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div>
              <Button
                type='submit'
                className='w-full rounded-full font-bold text-md'
                disabled={!isDirty}
              >
                Save
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
