import { cloneElement } from 'react'
import type { CSSProperties, ReactElement } from 'react'
import { Controller, type FieldValues, type RegisterOptions } from 'react-hook-form'
import { formContext } from '.'

interface Props {
  children?: ReactElement
  style?: CSSProperties
  className?: string
  rules?: RegisterOptions<FieldValues, string>
  name?: string
  label?: string
  labelWidth?: number
  labelPos?: 'top' | 'left'
}

function FormItem(props: Props) {
  const {
    children, label,
    labelWidth = 85,
    labelPos = 'left', rules, name,
    style,
    className,
  } = props

  const labelForId = useId()

  const { control } = useContext(formContext)!

  const _className = useMemo(() => `form-item mb-14px block w-full w-full flex items-center ${className ?? ''}`, [className])

  const labelStyle = useMemo(() => ({
    width: labelWidth,
    display: labelPos === 'left' ? 'inline-block' : 'block',
  }), [labelWidth, labelPos])

  return <div className={_className} style={style}>
      {label && <label className='label' style={labelStyle} htmlFor={labelForId}>{rules?.required && <span className='text-red'>*</span>} {label}</label>}

      <div className='h-full w-full flex-1'>
        {name
          ? <Controller
          name={name}
          disabled
          rules={rules}
          control={control}
          render={({ field: { name, ref, onChange, onBlur, value, disabled } }) => cloneElement(children as any, {
            name,
            rules,
            value,
            disabled,
            labelForId,
            onBlur: children?.props.onBlur ?? onBlur,
            onChange: children?.props.onChange ?? onChange,
            _ref: ref,
            _onBlur: onBlur,
            _onChange: onChange,
          })} />
          : children}
      </div>
   </div>
}

export default FormItem
