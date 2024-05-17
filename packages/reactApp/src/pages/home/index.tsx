import type { FC } from 'react'
import { useState } from 'react'
import { createRoot } from 'react-dom/client'
import reactLogo from '@/assets/react.svg'
import './index.css'
import Button from '@/components/Button'
import { useAuthStore } from '@/store'

function Tip({ msg }: { msg: string }) {
  const ref = useRef<HTMLDivElement>(null)

  return <div ref={ref}>{msg}</div>
}

Tip.show = function (msg: string) {
  const tipRoot = document.createElement('div')
  document.querySelector('.tipRoot')!.appendChild(tipRoot)
  createRoot(tipRoot).render(<Tip msg={msg} />)
}

const Test = forwardRef((props, ref) => {
  const [count, setCount] = useState(0)
  console.log('Test render')

  useImperativeHandle(ref, () => ({ setCount: () => setCount(count + 1) }), [count])

  return <div className="card">
  <button >count is {count}</button>
</div>
})

function Buttons() {
  console.log('Buttons render')
  const navigate = useNavigate()

  const setAuthlist = useAuthStore(state => state.setAuthlist)

  function goLoginHandle() {
    setAuthlist([])
    navigate('/login', { replace: true })
  }
  function goAdminHandle() {
    navigate('/admin')
  }

  return <>
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
  </>
}

const Home: FC = (props) => {
  console.log('Home render')

  const countComp = useRef()

  useEffect(() => {
    // Tip.show('nihao')
  }, [])
  console.log(countComp)

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

      <Buttons/>

      <div>
      <Button onClick={() => countComp.current?.setCount()}>++</Button>
      </div>
      <Test ref={countComp}></Test>
    </div>
  )
}

export default Home
