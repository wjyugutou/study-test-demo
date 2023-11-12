import type { ChangeEvent, ChangeEventHandler, DetailedHTMLProps, FocusEvent, FocusEventHandler, HTMLInputTypeAttribute, MouseEvent, ReactNode, Ref } from 'react'
import type { RefCallBack } from 'react-hook-form'

interface Props extends DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  children?: ReactNode
  type?: HTMLInputTypeAttribute
  labelForId?: string
  _ref?: RefCallBack
  _onChange?: ChangeEventHandler<HTMLInputElement>
  _onBlur?: FocusEventHandler<HTMLInputElement>
  _onFocus?: FocusEventHandler<HTMLInputElement>
}

function Input(props: Props, ref: Ref<any>) {
  const {
    type = 'text',
    name,
    value = '',
    style,
    _ref,
    className,
    labelForId,
    placeholder,
    onChange,
    onBlur,
    onFocus,
    _onChange,
    _onBlur,
    _onFocus,
  } = props

  const [showPassword, setShowPassword] = useState(false)
  const inputEle = useRef()

  function toggleShowPwd(e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) {
    e.preventDefault()
    e.stopPropagation()
    setShowPassword(!showPassword)
  }

  const _className = useMemo(() => `input inline-block border border-black w-full h-full px-4px hover:border-blue-600
   focus:border-blue-600 bg-transparent outline-none ${className ?? ''}
  `,
  [className])

  function refFn(ele: HTMLInputElement) {
    _ref?.(ele)
    if (ref)
      typeof ref === 'function' ? ref(ele) : (ref = { current: ele })
  }

  function onBlurHandle(e: FocusEvent<HTMLInputElement>) {
    _onBlur?.(e)
    onBlur?.(e)
  }

  function onFocusHandle(e: FocusEvent<HTMLInputElement>) {
    _onFocus?.(e)
    onFocus?.(e)
  }

  function onChangeHandle(e: ChangeEvent<HTMLInputElement>) {
    _onChange?.(e)
    onChange?.(e)
  }

  useImperativeHandle(ref, () => inputEle.current, [])

  return <div className='input-wrapper relative h-32px w-full'>
    <input
      style={style} className={_className} autoComplete='off'
      ref={refFn}
      name={name}
      value={value}
      id={labelForId}
      placeholder={placeholder}
      type={showPassword ? 'text' : type}
      onBlur={onBlurHandle}
      onFocus={onFocusHandle}
      onChange={onChangeHandle}
    />
    {type === 'password' && (showPassword
      ? <div className='i-carbon-view-off absolute right-4px top-50% transform-translate-y--50% cursor-pointer text-black' onClick={toggleShowPwd}></div>
      : <div className='i-carbon-view absolute right-4px top-50% transform-translate-y--50% cursor-pointer text-black' onClick={toggleShowPwd}> </div>)}
  </div>
}

const ForwardInput = forwardRef(Input)

export default ForwardInput
