'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { FaArrowLeft } from 'react-icons/fa'

import { Button } from '@/components/ui/button'

interface NavHeaderProps {
  title: string
  showBackArrow?: boolean
}

export const NavHeader: React.FC<NavHeaderProps> = (props: NavHeaderProps) => {
  const { title, showBackArrow } = props

  const router = useRouter()

  const handleBack = () => {
    router.back()
  }

  return (
    <div className='flex items-center gap-3 px-4 py-3 border-b-[1px] border-neutral-800'>
      {showBackArrow && (
        <Button
          onClick={handleBack}
          variant='ghost'
          size='icon'
          className='h-18 w-18'
        >
          <FaArrowLeft size={18} color='white' />
        </Button>
      )}
      <p>{title}</p>
    </div>
  )
}
