'use client'

import { useEffect, useState } from 'react'

import { LoginModal } from '@/components/modals/LoginModal'
import { RegisterModal } from '@/components/modals/RegisterModal'
import { EditUserModal } from '@/components/modals/EditUserModal'

export const ModalProvider = () => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <>
      <LoginModal />
      <RegisterModal />
      <EditUserModal />
    </>
  )
}
