import type { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { useTheme } from '@/hooks/useTheme'
import Button from '@/components/Button'

interface Props {
}

const Layout: FC<Props> = () => {
  const { theme, toggleTheme } = useTheme()

  return <div className='mx-auto my-0 h-100vh w-100vw p-8 p-b-40px text-center dark:text-white'>
    <h1>Layout  </h1>
    <h1>{theme}</h1>

    <Outlet/>

    <nav className='fixed bottom-0 left-0 right-0 h-40px flex items-center justify-center gap-4'>
      <Link to='/home'>home</Link>
      <Button onClick={ toggleTheme}>toggleTheme</Button>

    </nav>
  </div>
}

export default Layout
