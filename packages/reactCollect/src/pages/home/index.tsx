import type { FC } from 'react'
import { useState } from 'react'

import { useNavigate } from 'react-router-dom'
import reactLogo from '@/assets/react.svg'
import './index.css'

const Home: FC = () => {
  const [count, setCount] = useState(0)
  const navigate = useNavigate()
  function goLoginHandle() {
    navigate('/login')
  }
  function goAdminHandle() {
    navigate('/admin')
  }

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <h1 onClick={goLoginHandle} className='text-red apply' >Go Login</h1>
      <h1 onClick={goAdminHandle} className='text-pink'>Go Admin</h1>
      <div className="card">
        <button onClick={() => setCount(count => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default Home
