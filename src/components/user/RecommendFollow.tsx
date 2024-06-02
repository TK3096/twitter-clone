'use client'

import React from 'react'
import Link from 'next/link'

import { useUsers } from '@/hooks/useUser'
import { UserAvart } from './UserAvatar'

export const ReccomendFollow: React.FC = () => {
  const { data } = useUsers()

  return (
    <div className='h-full px-4 py-3'>
      <div className='bg-neutral-600 rounded-md p-3'>
        <h3 className='text-white font-bold text-md'>Who to follow</h3>
        <div className='flex flex-col gap-3 mt-3'>
          {data.map((u) => (
            <Link key={u.username} href={`/users/${u.id}`}>
              <div className='flex items-center gap-3'>
                <UserAvart src={u.profileImage || ''} name={u.name} />
                <div>
                  <p className='text-white font-bold text-md'>{u.name}</p>
                  <p className='text-muted-foreground text-sm'>@{u.username}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
