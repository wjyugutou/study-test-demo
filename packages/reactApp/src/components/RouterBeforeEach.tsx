import Layout from '@/layout'
import { useAuthStore } from '@/store'
import lazyComponent from '@/utils/lazyComponent'

export function RouterBeforeEach() {
  const navigator = useNavigate()
  const location = useLocation()
  const authlist = useAuthStore(state => state.authlist)

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

  const Routes = useRoutes([
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
  ])

  return Routes
}
