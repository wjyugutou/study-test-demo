import { Suspense } from 'react'
import Layout from '@/layout'
import { useAuthStore } from '@/store'
import pages from '~react-pages'

export function RouterBeforeEach() {
  const navigator = useNavigate()
  const location = useLocation()
  const authlist = useAuthStore(state => state.authlist)

  // useEffect(() => {
  //   if (authlist.length === 0 && location.pathname !== '/login')
  //     navigator('/login', { replace: true })
  //   else if (location.pathname === '/' && authlist.length !== 0)
  //     navigator('/home', { replace: true })
  // }, [location.pathname, authlist])

  return <Suspense fallback={<p>Loading...</p>}>
    {useRoutes(pages)}
  </Suspense>
}
