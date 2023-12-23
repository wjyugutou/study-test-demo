import type { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { useTheme } from '@/hooks/useTheme'
import Button from '@/components/Button'
import { useAuthStore } from '@/store'

interface Props {
}

const Layout: FC<Props> = () => {
  const { theme, toggleTheme } = useTheme()

  const authlist = useAuthStore(state => state.authlist)

  function toggle() {
    toggleTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return <div className='mx-auto my-0 p-8 text-center dark:text-white'>
    <h1>Layout</h1>
    <h1>{theme}</h1>
    {
      authlist.map(item => <Link key={item} to={`/${item}`}>
          <Button>{item}</Button>
        </Link>,
      )
    }

    <button onClick={toggle}>toggleTheme</button>
    <Outlet/>
  </div>
}

export default Layout
