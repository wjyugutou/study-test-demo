import type { ReactNode } from 'react'
import { useAuthStore } from '@/store'
import Button from '@/components/Button'

interface Props {
  children?: ReactNode
}

function AuthPage(props: Props) {
  const authlist = useAuthStore(state => state.authlist)

  return <>
    {
      authlist.map(item => <Link key={`${item}-link`} to={`/${item}`}>
          <Button>{item}</Button>
        </Link>,
      )
    }
   </>
}

export default AuthPage
