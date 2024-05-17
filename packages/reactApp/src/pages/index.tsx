import type { ReactNode } from 'react'

interface Props {
  children?: ReactNode
}

function App(props: Props) {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  useEffect(() => {
    if (pathname === '/')
      navigate('/home', { replace: true })
  }, [pathname])
  return <></>
}

export default App
