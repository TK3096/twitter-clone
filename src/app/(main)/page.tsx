import { Button } from '@/components/ui/button'
import { NavHeader } from '@/components/navigation/NavHeader'

const HomePage = () => {
  return (
    <div>
      <NavHeader title='Home' />
      <h1>HomePage</h1>
      <Button variant='primary'>Click Me</Button>
    </div>
  )
}

export default HomePage
