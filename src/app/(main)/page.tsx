import { NavHeader } from '@/components/navigation/NavHeader'
import { PostForm } from '@/components/post/PostForm'
import { PostWrapper } from '@/components/post/PostWrapper'

const HomePage = () => {
  return (
    <div className='h-full'>
      <NavHeader title='Home' />
      <PostWrapper />
    </div>
  )
}

export default HomePage
