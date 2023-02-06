import type { FC } from 'react'
import { useEffect } from 'react'
import { useLocation, useNavigate, useRoutes } from 'react-router-dom'
import Layout from './layout'
import lazyComponent from '@/components/lazyComponent'
interface Props {
}

const App: FC<Props> = () => {
  const navgate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (location.pathname === '/') {
      navgate({
        pathname: '/home',
      })
    }
    console.log('App mount', location)

    return () => { }
  }, [location])

  const Routes = useRoutes([
    {
      path: '/',
      element: <Layout/>,
      children: [
        {
          path: '/home/:id',
          element: lazyComponent('@/pages/home'),
        }, {
          path: '/home',
          element: lazyComponent('@/pages/home'),
        }, {
          path: '/admin',
          element: lazyComponent('@/pages/admin'),
        },
      ],

    }, {
      path: '/login',
      element: lazyComponent('@/pages/login'),

    },
  ])

  return Routes
}

export default App
