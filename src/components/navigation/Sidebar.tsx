'use client'

import React from 'react'
import Link from 'next/link'
import { FaHome, FaUser } from 'react-icons/fa'
import { BsBellFill } from 'react-icons/bs'
import { BiLogOut } from 'react-icons/bi'

import { SidebarLogo } from '@/components/navigation/SidebarLogo'
import { SidebarItem } from '@/components/navigation/SidebarItem'
import { TweeetBtn } from '@/components/navigation/TweetBtn'

export const Sidebar: React.FC = () => {
  const MENU = [
    {
      label: 'Home',
      href: '/',
      icon: FaHome,
    },
    {
      label: 'Notificaitons',
      href: '/notifications',
      icon: BsBellFill,
    },
    {
      label: 'Profile',
      href: '/users/123',
      icon: FaUser,
    },
  ]

  return (
    <div className='h-full pr-4 md:pr-6'>
      <nav className='flex flex-col items-end'>
        <div className='space-y-2 lg:w-[230px]'>
          <Link href='/'>
            <SidebarLogo />
          </Link>
          {MENU.map((menu) => (
            <SidebarItem
              key={menu.label}
              label={menu.label}
              href={menu.href}
              icon={menu.icon}
            />
          ))}
          <SidebarItem label='Logout' href='/logout' icon={BiLogOut} />
          <TweeetBtn />
        </div>
      </nav>
    </div>
  )
}
