import type { CSSProperties, ReactNode } from 'react'
import type { UseFormProps } from 'react-hook-form'
import { SubmitHandler, useForm } from 'react-hook-form'
import { formContext } from '.'

interface Props {
  onSubmit: (data: any, err?: Record<string, string>) => void
  children: ReactNode | undefined
  className?: string
  style?: CSSProperties
  validteMode?: UseFormProps['mode']
}

function Form(props: Props) {
  const {
    children, className, style, validteMode = 'all',
    onSubmit,
  } = props
  const { control, handleSubmit, getValues } = useForm({
    mode: validteMode,
  })
  const [formState, setFormState] = useState({})

  const contextProvider = useRef({ formState, setFormState, control })

  const _className = useMemo(() => `form ${className ?? ''}`, [className])

  function onValidate(values: any) {
    onSubmit(values, undefined)
  }
  function onValidateFail(err: any) {
    const values = getValues()
    onSubmit(values, err)
  }

  return <form className={_className} style={style} onSubmit={handleSubmit(onValidate, onValidateFail)}>
    <formContext.Provider value={contextProvider.current}>
      {children}
    </formContext.Provider>
  </form>
}

export default Form
