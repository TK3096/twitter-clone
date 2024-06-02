'use client'

import { NavHeader } from '@/components/navigation/NavHeader'
import { useCurrentUser } from '@/hooks/useCurrentUser'

const HomePage = () => {
  const user = useCurrentUser()

  return (
    <div>
      <NavHeader title='Home' />
      <h1>HomePage</h1>
      {user?.name}
    </div>
  )
}

export default HomePage
