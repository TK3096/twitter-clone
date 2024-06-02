'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { FaHome, FaUser } from 'react-icons/fa'
import { BsBellFill } from 'react-icons/bs'
import { BiLogOut } from 'react-icons/bi'

import { useModal } from '@/hooks/useModal'
import { useCurrentUser } from '@/hooks/useCurrentUser'

import { toast } from 'sonner'
import { SidebarLogo } from '@/components/navigation/SidebarLogo'
import { SidebarItem } from '@/components/navigation/SidebarItem'
import { TweeetBtn } from '@/components/navigation/TweetBtn'

export const Sidebar: React.FC = () => {
  const router = useRouter()

  const user = useCurrentUser()
  const { onOpen } = useModal()

  const MENU = [
    {
      label: 'Home',
      href: '/',
      icon: FaHome,
      requireAuth: false,
    },
    {
      label: 'Notificaitons',
      href: '/notifications',
      icon: BsBellFill,
      requireAuth: true,
    },
    {
      label: 'Profile',
      href: `/users/${user?.id || 'undefined'}`,
      icon: FaUser,
      requireAuth: true,
    },
  ]

  const handleClickMenu = (url: string, requireAuth: boolean) => {
    if (!user && requireAuth) {
      onOpen('login')
    } else {
      router.push(url)
    }
  }

  const handleLogout = async (url: string) => {
    try {
      await fetch(url, {
        method: 'POST',
      })

      window.location.reload()
    } catch {
      toast.error('Something went wrong, please try again')
    }
  }

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
              requireAuth={menu.requireAuth}
              onClick={handleClickMenu}
            />
          ))}
          {user && (
            <SidebarItem
              label='Logout'
              href='/api/users/logout'
              icon={BiLogOut}
              onClick={handleLogout}
            />
          )}
          <TweeetBtn />
        </div>
      </nav>
    </div>
  )
}
