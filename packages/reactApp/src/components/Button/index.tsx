import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from 'react'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode
  mode?: 'primary'
  className?: string
  style?: CSSProperties
  rounded?: boolean
}

function button(props: Props) {
  const { type, mode = 'primary', children, className, style, rounded = true } = props

  const _className = useMemo(() => {
    const modeClassName = {
      primary: 'bg-blue-400 hover:bg-blue-300 text-white py-2px px-5px min-w-68px',
    }
    const sizeClassName = {}
    const roundedClassName = rounded ? 'rounded-15px' : ''
    return `${modeClassName[mode]} ${roundedClassName} ${className}`.replaceAll('undefined', '')
  }, [className])

  return <button {...props}>{children}</button>
}

export default button
