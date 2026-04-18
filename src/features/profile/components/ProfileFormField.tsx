import { useRef, useState } from 'react'
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
  const [dateInputError, setDateInputError] = useState('')
  const [isDateBadInput, setIsDateBadInput] = useState(false)
  const [allowDatePlaceholderStyle, setAllowDatePlaceholderStyle] = useState(false)
  const dateKeyboardInteractionRef = useRef(false)
  const isDateInput = inputProps.type === 'date'
  const isEmptyDate = isDateInput && !field.state.value && !dateInputError && !isDateBadInput && (allowDatePlaceholderStyle || !isFocused)
  const today = new Date()
  const todayIsoDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`
  const resolvedMax = isDateInput
    ? (inputProps.max ?? todayIsoDate)
    : inputProps.max

  return (
    <div>
      <label className="block text-sm font-medium text-background-dark mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        {...inputProps}
        max={resolvedMax}
        value={field.state.value as string}
        onInput={(e) => {
          if (isDateInput) {
            const hasBadInput = e.currentTarget.validity.badInput
            setIsDateBadInput(hasBadInput)

            if (hasBadInput) {
              setAllowDatePlaceholderStyle(false)
            }
          }

          inputProps.onInput?.(e)
        }}
        onChange={(e) => {
          field.handleChange(e.target.value)

          if (isDateInput) {
            const hasBadInput = e.currentTarget.validity.badInput
            setIsDateBadInput(hasBadInput)

            if (e.target.value === '') {
              setAllowDatePlaceholderStyle(!dateKeyboardInteractionRef.current && !hasBadInput)
            } else {
              setAllowDatePlaceholderStyle(false)
            }

            if (dateInputError) {
              setDateInputError('')
            }
          }

          inputProps.onChange?.(e)
        }}
        onKeyDown={(e) => {
          if (isDateInput) {
            dateKeyboardInteractionRef.current = e.key === 'Backspace' || e.key === 'Delete'
          }

          inputProps.onKeyDown?.(e)
        }}
        onFocus={(e) => {
          setIsFocused(true)

          if (isDateInput) {
            if (dateInputError) {
              setDateInputError('')
            }

            if (!field.state.value) {
              setAllowDatePlaceholderStyle(false)
            }
          }

          inputProps.onFocus?.(e)
        }}
        onBlur={(e) => {
          setIsFocused(false)

          if (isDateInput) {
            if (e.currentTarget.validity.badInput) {
              setIsDateBadInput(true)
              setDateInputError('Ingresa una fecha válida.')
            } else if (e.currentTarget.validity.rangeOverflow) {
              setIsDateBadInput(false)
              setDateInputError('La fecha no puede ser futura.')
            } else {
              setIsDateBadInput(false)
              setDateInputError('')
            }

            dateKeyboardInteractionRef.current = false
            setAllowDatePlaceholderStyle(false)
          }

          inputProps.onBlur?.(e)
        }}
        className={`w-full px-4 py-2.5 rounded-xl border border-neutral-light bg-neutral-50 text-sm outline-none focus:border-primary hover:border-primary/60 transition-colors ${isDateInput ? 'date-calendar-hover' : ''} ${isEmptyDate ? 'text-neutral-400' : 'text-background-dark'}`}
      />
      {dateInputError && <InputMessageError message={dateInputError} />}
      {!dateInputError && !field.state.meta.isValid && field.state.meta.errors.length > 0 && (
        <InputMessageError message={field.state.meta.errors[0]?.message || ''} />
      )}
    </div>
  )
}
