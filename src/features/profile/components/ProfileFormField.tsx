import { useState } from 'react'
import type { AnyFieldApi } from '@tanstack/react-form'
import { InputMessageError } from '../../../shared/components/InputMessageError'

export function ProfileFormField({
  label,
  required,
  field,
  ...inputProps
}: {
  label: string
  required?: boolean
  field: AnyFieldApi
} & React.InputHTMLAttributes<HTMLInputElement>) {
  const [isFocused, setIsFocused] = useState(false)
  const isEmptyDate = inputProps.type === 'date' && !field.state.value && !isFocused

  return (
    <div>
      <label className="block text-sm font-medium text-background-dark mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        {...inputProps}
        value={field.state.value as string}
        onChange={(e) => field.handleChange(e.target.value)}
        onFocus={(e) => {
          setIsFocused(true)
          inputProps.onFocus?.(e)
        }}
        onBlur={(e) => {
          setIsFocused(false)
          inputProps.onBlur?.(e)
        }}
        className={`w-full px-4 py-2.5 rounded-xl border border-neutral-light bg-neutral-50 text-sm outline-none focus:border-primary transition-colors ${isEmptyDate ? 'text-neutral-400' : 'text-background-dark'}`}
      />
      {!field.state.meta.isValid && field.state.meta.errors.length > 0 && (
        <InputMessageError message={field.state.meta.errors[0]?.message || ''} />
      )}
    </div>
  )
}
