import { type FC, Suspense } from 'react'
import { Await } from 'react-router-dom'
import styles from './index.module.css'
import { loginApi } from '@/request/login'
import Form from '@/components/form/form'
import { Input } from '@/components/form'

interface Props {
}

const Login: FC<Props> = () => {
  const { loading, runAsync } = useRequest(loginApi, { manual: true })
  const [isLogin, setIsLogin] = useState(false)

  async function initial() {
    const data = await runAsync({ username: 'admin1', password: '111111' })
    console.log({ data, loading })
  }

  function submitHandle(...data: any) {
    console.log(data)
  }

  function signInHandle() {
    setIsLogin(!isLogin)
  }

  function transitionEndHandle() {}

  useEffect(() => {
    initial()
  }, [])

  return <div className='h-100vh w-100vw pt-45'>
    <div className='relative m-auto h-500px w-800px flex overflow-hidden rounded-10px bg-white text-black'>

      <div className='absolute bottom-0 left-50% top-0 w-50% flex flex-col items-center justify-center overflow-hidden transition-all transition-duration-1.5s transition-ease' style={{
        left: isLogin ? '50%' : 0,
      }}>
        <div className='h-full w-300% flex animate-duration-1.5s animate-forwards transition-all transition-duration-1.5s transition-ease' style={{
          transform: `translate3d(${!isLogin ? '-33.3%' : '33.3%'}, 0, 0)`,
        }}>
          <div className={` h-full w-33.3% flex flex-col items-center justify-center ${!isLogin ? styles.login : ''}`} >
            <h1 className='letter-spacing-10px mb-20px text-32px font-700'>创建账户</h1>
            <Form onSubmit={submitHandle} className='w-80%'>
              <Input field='username' placeholder='用户名' rules={{ required: true }} />
              <Input field='email' placeholder='邮箱' rules={{ required: true }} type='email' />
              <Input field='password' placeholder='密码' rules={{ required: true }} type='password' />
              <p className='mb-20px text-center'>
                <span className='cursor-pointer hover:text-blue-200'>忘记密码？</span>
              </p>
              <div className='flex justify-center'>
                <button type="submit" className='mr--10px rounded-50 bg-blue px-40px py-5px text-18px text-white hover:bg-blue-600'>
                  <span className='mr-10px'>注</span>
                  <span>册</span>
                </button>
              </div>
            </Form>
          </div>

          <div className='w-33.3%'></div>

          <div className={` h-full w-33.3% flex flex-col items-center justify-center ${isLogin ? styles.register : ''}`}>
            <h1 className='letter-spacing-10px mb-20px text-32px font-700'>登录</h1>
            <Form onSubmit={submitHandle} className='w-80%'>
              <Input field='username' placeholder='用户名' rules={{ required: true }} />
              <Input field='password' placeholder='密码' rules={{ required: true }} type='password' />
              <p className='mb-20px text-center'>
                <span className='cursor-pointer hover:text-blue-200'>忘记密码？</span>
              </p>
              <div className='flex justify-center'>
                <button type="submit" className='mr--10px rounded-50 bg-blue px-40px py-5px text-18px text-white hover:bg-blue-600'>
                  <span className='mr-10px'>登</span>
                  <span>录</span>
                </button>
              </div>
            </Form>
          </div>
        </div>
      </div>

      <div className='absolute bottom-0 left-50% top-0 z-1 w-50% overflow-hidden bg-blue text-white transition-all transition-duration-1.5s transition-ease' style={{
        left: !isLogin ? '50%' : 0,
      }}>
        <div className='h-full w-300% flex transition-all transition-duration-1.5s transition-ease' style={{
          transform: `translate3d(${isLogin ? 0 : '-66.6%'}, 0, 0)`,
        }}>

          <div className='h-full w-33.3% flex flex-col items-center justify-center'>
            <h1 className='mb-20px text-32px font-700 word-spacing-10px'>欢迎回来</h1>
            <p className='mb-20px'>使用账号登录</p>
            <div className='flex justify-center'>
              <button type="submit" className='mr--10px border border-white rounded-50 bg-blue px-40px py-5px text-18px hover:bg-blue-600' onClick={signInHandle}>
                <span className='mr-10px'>登</span>
                <span>录</span>
              </button>
            </div>
          </div>

          <div className='w-33.3%'></div>

          <div className='h-full w-33.3% flex flex-col items-center justify-center'>
            <h1 className='mb-20px text-32px font-700 word-spacing-10px'>Hello, Firend</h1>
            <p className='mb-20px'>没有账号？注册一个新账号</p>
            <div className='flex justify-center'>
              <button type="submit" className='mr--10px border border-white rounded-50 bg-blue px-40px py-5px text-18px hover:bg-blue-600' onClick={signInHandle}>
                <span className='mr-10px'>注</span>
                <span>册</span>
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
}

export default Login
