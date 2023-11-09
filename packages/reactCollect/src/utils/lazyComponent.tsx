import loadable from '@loadable/component'
import type { FC } from 'react'

interface Props {
  path: string
}

const Loading: FC = () => {
  return <h1>loading...</h1>
}

function LazyComponent(path: string) {
  const Component = loadable(() => import(/* @vite-ignore */ path.replace('@', '..')))
  return <Component />
}

export default LazyComponent
