import loadable from '@loadable/component'

interface Props {
  path: string
}

const Loading = () => {
  return <h1>loading...</h1>
}

const LazyComponent = (path: string) => {
  const Component = loadable(() => import(path.replace('@', '..')))
  return <Component />
}

export default LazyComponent
