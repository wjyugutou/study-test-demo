import type { CSSProperties, ReactNode } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { formContext } from '.'

interface Props {
  onSubmit: (data: any) => void
  children: ReactNode | undefined
  className?: string
  style?: CSSProperties
}

function Form(props: Props) {
  const {
    children, className, style,
    onSubmit,
  } = props
  const { register, handleSubmit } = useForm()
  const [formState, setFormState] = useState({})

  const contextProvider = useRef({ formState, setFormState, register })

  return <form className={className} style={style} onSubmit={handleSubmit(onSubmit)}>
    <formContext.Provider value={contextProvider.current}>
      {children}
    </formContext.Provider>
  </form>
}

export default Form
