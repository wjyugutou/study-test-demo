import type { CSSProperties, DetailedHTMLProps, HTMLInputTypeAttribute, MouseEvent, ReactNode } from 'react'
import type { FieldValues, RegisterOptions } from 'react-hook-form'
import { formContext } from '.'

interface Props extends DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  children?: ReactNode
  type?: HTMLInputTypeAttribute
  label?: string
  labelWidth?: number
  labelPos?: 'top' | 'left'
  field: string
  rules?: RegisterOptions<FieldValues, string>
}

function Input(props: Props) {
  const {
    type = 'text',
    label,
    labelWidth = 85,
    labelPos = 'left',
    field,
    rules,
    className,
    style,
    value,
    onChange,
    onBlur,
    onFocus,
  } = props

  const register = useContext(formContext)?.register

  const [showPassword, setShowPassword] = useState(false)

  function toggleShowPwd(e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) {
    console.log(1)

    e.preventDefault()
    e.stopPropagation()
    setShowPassword(!showPassword)
  }

  const id = useId()

  const _style: CSSProperties = useMemo(() => (Object.assign(style || {}, {
    width: `calc(100% - ${(!label || labelPos === 'top') ? 0 : labelWidth}px)`,
  })), [style])

  const labelStyle = useMemo(() => ({
    width: labelWidth,
    display: labelPos === 'left' ? 'inline-block' : 'block',
  }), [label, labelPos])

  const _className = useMemo(() => `${className} relative inline-block input border border-black hover:border-blue-600 bg-transparent outline-none w-full h-32px`, [className])

  return <div className='input-wrapper mb-14px w-full'>
    <div className='block w-full' >
      {label && <label className='label' style={labelStyle} htmlFor={id}>{rules?.required && <span className='text-red'>*</span>} {label}</label>}

      <div className={_className} style={_style}>
        <input id={id} className='h-full w-full px-4px' autoComplete='off'
          type={showPassword ? 'text' : type}
          {...register?.(field, rules)}
          value={register ? undefined : value}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
        />
        {type === 'password' && (showPassword
          ? <div className='i-carbon-view-off absolute right-4px top-50% transform-translate-y--50% cursor-pointer text-black' onClick={toggleShowPwd}></div>
          : <div className='i-carbon-view absolute right-4px top-50% transform-translate-y--50% cursor-pointer text-black' onClick={toggleShowPwd}> </div>)}
      </div>
    </div>
  </div>
}

export default Input
