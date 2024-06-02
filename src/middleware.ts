import NextAuth from 'next-auth'

import authConfig from '@/auth.config'

import { apiAuthPrefix } from '@/routes'

const { auth } = NextAuth(authConfig)

export default auth((req) => {
  const { nextUrl } = req

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)

  if (isApiAuthRoute) {
    return
  }

  // handle other routes logic here

  return
})

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
