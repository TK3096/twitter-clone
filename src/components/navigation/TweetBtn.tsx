'use client'

import React from 'react'
import { FaFeather } from 'react-icons/fa'

import { useModal } from '@/hooks/useModal'

import { Button } from '@/components/ui/button'

export const TweeetBtn: React.FC = () => {
  const { onOpen } = useModal()

  const handleTweet = () => {
    onOpen('login')
  }

  return (
    <Button
      variant='primary'
      className='rounded-full w-full'
      onClick={handleTweet}
    >
      <FaFeather size={24} color='white' />
      <span className='hidden lg:block text-center pl-2 text-white font-semibold'>
        Tweet
      </span>
    </Button>
  )
}
