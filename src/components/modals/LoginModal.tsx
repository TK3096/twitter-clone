'use client'

import type { APIResponse } from '@/types'

import React from 'react'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { useModal } from '@/hooks/useModal'

import { LoginSchema } from '@/shcemas/auth'

import { toast } from 'sonner'
import {
  Form,
  FormField,
  FormControl,
  FormMessage,
  FormItem,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { FloatingInput } from '@/components/common/FloatingInput'

export const LoginModal: React.FC = () => {
  const { open, type, onClose, onOpen } = useModal()

  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const isOpen = type === 'login' && open
  const isDirty = form.formState.isDirty
  const loading = form.formState.isSubmitting

  const handleOpenRegisterModal = () => {
    form.reset()
    onOpen('register')
  }

  const handleSubmitForm = async (values: z.infer<typeof LoginSchema>) => {
    try {
      const res = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const resBody = (await res.json()) as APIResponse

      if (res.ok && resBody.success) {
        window.location.reload()
        handleClose()
      } else {
        toast.error(!resBody.success && resBody.message)
      }
    } catch (error) {
      console.log(error)
      toast.error('Something went wrong, please try again')
    }
  }

  const handleClose = () => {
    form.reset()
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader className='pb-8'>
          <DialogTitle className='text-3xl font-bold'>Login</DialogTitle>
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
                        disabled={loading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name='password'
                control={form.control}
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormControl>
                      <FloatingInput
                        id='password'
                        type='password'
                        label='Password'
                        error={fieldState.error?.message}
                        disabled={loading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='space-y-4'>
              <Button
                type='submit'
                className='w-full rounded-full font-bold text-md'
                disabled={!isDirty || loading}
              >
                Login
              </Button>
              <p className='text-center text-sm text-muted-foreground'>
                First time using Twitter?{' '}
                <span
                  className='font-semibold text-white cursor-pointer'
                  onClick={handleOpenRegisterModal}
                >
                  Create an account
                </span>
              </p>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
