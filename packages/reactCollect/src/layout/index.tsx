import type { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { useTheme } from '@/hooks/useTheme'

interface Props {
}

const Layout: FC<Props> = () => {
  const { theme, toggleTheme } = useTheme()

  function toggle() {
    toggleTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return <>
    <h1>Layout</h1>
    <h1>{theme}</h1>
    <button onClick={toggle}>toggleTheme</button>
    <Outlet/>
  </>
}

export default Layout
