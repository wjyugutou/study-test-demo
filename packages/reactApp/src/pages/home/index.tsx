import type { FC } from 'react'
import { useState } from 'react'

import { useNavigate } from 'react-router-dom'
import reactLogo from '@/assets/react.svg'
import './index.css'
import Button from '@/components/Button'
import { useAuthStore } from '@/store'

const Home: FC = () => {
  const [count, setCount] = useState(0)
  const navigate = useNavigate()

  const setAuthlist = useAuthStore(state => state.setAuthlist)

  function goLoginHandle() {
    setAuthlist([])
    navigate('/login', { replace: true })
  }
  function goAdminHandle() {
    navigate('/admin')
  }

  return (
    <div className="App">
      <div>
        <a className="inline-block" href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a className="inline-block" href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <Button>
        <h1 onClick={goLoginHandle} className="apply">
          Go Login
        </h1>
      </Button>
      <Button>
        <h1 onClick={goAdminHandle} className="">
          Go Admin
        </h1>
      </Button>
      <div className="card">
        <button onClick={() => setCount(count => count + 1)}>count is {count}</button>
      </div>
    </div>
  )
}

export default Home
