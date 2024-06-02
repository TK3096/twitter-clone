'use client'

import React from 'react'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { useModal } from '@/hooks/useModal'

import { RegisterSchema } from '@/shcemas/auth'

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

export const RegisterModal: React.FC = () => {
  const { open, type, onClose, onOpen } = useModal()

  const form = useForm({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      username: '',
      name: '',
      email: '',
      password: '',
    },
  })

  const isOpen = type === 'register' && open
  const isDirty = form.formState.isDirty

  const handleOpenLoginModal = () => {
    onOpen('login')
  }

  const handleSubmitForm = async (values: z.infer<typeof RegisterSchema>) => {}

  const handleClose = () => {
    form.reset()
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader className='pb-8'>
          <DialogTitle className='text-3xl font-bold'>
            Create an account
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
                name='username'
                control={form.control}
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormControl>
                      <FloatingInput
                        id='username'
                        type='text'
                        label='Username'
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
                disabled={!isDirty}
              >
                Create an account
              </Button>
              <p className='text-center text-sm text-muted-foreground'>
                Already have an account?{' '}
                <span
                  className='font-semibold text-white cursor-pointer'
                  onClick={handleOpenLoginModal}
                >
                  Sign in
                </span>
              </p>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
