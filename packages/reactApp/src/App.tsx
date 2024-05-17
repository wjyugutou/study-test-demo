import type { FC } from 'react'
import Layout from './layout'
import { RouterBeforeEach } from '@/components/RouterBeforeEach'

interface Props {
}

const App: FC<Props> = () => {
  return <Layout>
    <RouterBeforeEach></RouterBeforeEach>
  </Layout>
}

export default App
