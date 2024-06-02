'use client'

import { useEffect, useState } from 'react'

import { LoginModal } from '@/components/modals/LoginModal'
import { RegisterModal } from '@/components/modals/RegisterModal'

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
    </>
  )
}
