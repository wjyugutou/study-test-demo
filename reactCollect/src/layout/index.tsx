import type { FC } from 'react'
import { Outlet } from 'react-router-dom'

interface Props {
}

const Layout: FC<Props> = () => {
  return <>
    <h1>Layout</h1>
    <Outlet/>
  </>
}

export default Layout
