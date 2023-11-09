import { createContext } from 'react'
import type { FieldValues, UseFormRegister } from 'react-hook-form'
import Form from './form'
import Input from './input'

export interface FormContext {
  formState: Record<string, any>
  register: UseFormRegister<FieldValues>
  setFormState: (formState: FormContext['formState']) => void
}

export const formContext = createContext<FormContext | null>(null)

export {
  Input, Form,
}
