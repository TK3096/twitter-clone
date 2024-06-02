import { ContentContainer } from '@/components/user/ContentContainer'
import { UserNavHeader } from '@/components/user/UserNavHeader'

const UserIdPage = ({ params }: { params: { userId: string } }) => {
  const { userId } = params

  return (
    <div>
      <UserNavHeader userId={userId} />
      <ContentContainer userId={userId} />
    </div>
  )
}

export default UserIdPage
