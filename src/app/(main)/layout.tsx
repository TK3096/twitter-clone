import { Sidebar } from '@/components/navigation/Sidebar'

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='h-full container mx-auto'>
      <div className='h-full grid grid-cols-4'>
        <Sidebar />
        <main className='col-span-3 lg:col-span-2 border-l-[1px] border-neutral-800'>
          {children}
        </main>
        <div className='hidden lg:block lg:border-l-[1px] lg:border-neutral-800'>
          right
        </div>
      </div>
    </div>
  )
}

export default MainLayout
