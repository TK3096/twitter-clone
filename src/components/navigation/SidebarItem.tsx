'use client'

import type { IconType } from 'react-icons'

import React from 'react'
import { useRouter } from 'next/navigation'

interface SidebarItemProps {
  label: string
  href: string
  icon: IconType
}

export const SidebarItem: React.FC<SidebarItemProps> = (
  props: SidebarItemProps,
) => {
  const { label, href, icon: Icon } = props

  const router = useRouter()

  const handleClick = () => {
    router.push(href)
  }

  return (
    <div
      className='flex gap-1 items-center rounded-full hover:bg-blue-300 hover:bg-opacity-10 transition-colors duration-300 cursor-pointer'
      onClick={handleClick}
    >
      <div className='h-14 w-14 p-4'>
        <Icon size={28} color='white' />
      </div>
      <h2 className='hidden md:inline'>{label}</h2>
    </div>
  )
}
