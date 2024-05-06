import { createBrowserRouter } from 'react-router-dom'
import Layout from '@/layout'
import { useAuthStore } from '@/store'
import lazyComponent from '@/utils/lazyComponent'

export function RouterBeforeEach() {
  const navigator = useNavigate()
  const location = useLocation()
  const authlist = useAuthStore(state => state.authlist)

  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    console.log('location.pathname:', location.pathname)

    if (authlist.length === 0 && location.pathname !== '/login')
      navigator('/login', { replace: true })
    else if (location.pathname === '/' && authlist.length !== 0)
      navigator('/home', { replace: true })
  }, [location.pathname, authlist])

  const authRoutes = authlist.map(item => ({
    path: `${item}`,
    element: lazyComponent(`@/pages/authpages/${item}`),
  }))

  function getRoutes(...args) {
    console.log('getRoutes', args)

    return [
      {
        path: '/login',
        element: lazyComponent('@/pages/login'),
      }, {
        path: '/',
        element: <Layout/>,
        children: [
          {
            path: 'home/:id?',
            element: lazyComponent('@/pages/home'),
          }, {
            path: '/admin',
            element: lazyComponent('@/pages/admin'),
          },
        ].concat(authRoutes, [{
          path: '/*',
          element: lazyComponent('@/pages/404'),
        }]),

      }, {
        path: '*',
        element: lazyComponent('@/pages/404'),
      },
    ]
  }

  const Routes = useRoutes(getRoutes())
  return Routes
}
