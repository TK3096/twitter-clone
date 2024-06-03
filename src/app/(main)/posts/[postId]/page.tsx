import { NavHeader } from '@/components/navigation/NavHeader'
import { PostDetail } from '@/components/post/PostDetail'

const PostIdPage = ({ params }: { params: { postId: string } }) => {
  const { postId } = params

  return (
    <div>
      <NavHeader title='Tweet' showBackArrow />
      <PostDetail postId={postId} />
    </div>
  )
}

export default PostIdPage
