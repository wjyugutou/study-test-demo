import { createContext } from 'react'
import type { Control, FieldValues } from 'react-hook-form'
import Form from './form'
import Input from './input'

export interface FormContext {
  formState: Record<string, any>
  control: Control<FieldValues, any>
  setFormState: (formState: FormContext['formState']) => void
}

export const formContext = createContext<FormContext | null>(null)

export {
  Input, Form,
}
