import { signOut } from '@/auth'

export const POST = async () => {
  await signOut()
}
