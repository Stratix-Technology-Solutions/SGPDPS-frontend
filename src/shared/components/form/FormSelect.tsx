import { useEffect, useRef, useState } from 'react'
import type { AnyFieldApi } from '@tanstack/react-form'
import { InputMessageError } from '../InputMessageError'
import type { Option } from './form.types'
import { LuArrowDown } from 'react-icons/lu'

interface Props<T extends string> {
  label: string
  field: AnyFieldApi
  customField?: AnyFieldApi
  options: Option<T>[]
  disabled?: boolean
  allowOther?: boolean
  placeholder?: string
  otherLabel?: string
  hasPlaceholder?: boolean
  otherPlaceholder?: string
  maxDropdownHeight?: string
  required?: boolean
}

const OTHER_VALUE = '__other__'

export const FormSelect = <T extends string,>({
  label,
  field,
  customField,
  options,
  disabled = false,
  allowOther = false,
  placeholder = 'Seleccione una opción',
  otherLabel = 'Otro',
  hasPlaceholder = true,
  otherPlaceholder = 'Ingrese un valor',
  maxDropdownHeight = '240px',
  required = false,
}: Props<T>) => {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const errors = field.state.meta.errors

  const errorMessage =
    errors.length > 0
      ? errors.map(
        (e: unknown) => typeof e === 'string'
          ? e
          : (e as { message?: string })?.message,
        ).join(', ')
      : undefined

  const isOtherSelected = field.state.value === OTHER_VALUE
  const selectedOption = options.find((option) =>
    option.value === field.state.value,
  )

  useEffect(() => {
    const handleClickOutside = (
      event: MouseEvent,
    ) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(
          event.target as Node,
        )
      ) {
        setOpen(false)
        field.handleBlur()
      }
    }

    document.addEventListener(
      'mousedown',
      handleClickOutside,
    )

    return () => {
      document.removeEventListener(
        'mousedown',
        handleClickOutside,
      )
    }
  }, [field])

  return (
    <div
      ref={containerRef}
      className="space-y-2"
    >
      <label className="block font-semibold text-background-dark">
        {label} {required && '*'}
      </label>

      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between rounded-xl border border-neutral-light bg-neutral-50 px-4 py-3 text-left text-background-dark outline-none transition-colors focus:border-primary disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:opacity-50 cursor-pointer">
        <span>
          {selectedOption?.label ??
            (hasPlaceholder
              ? placeholder
              : options[0]?.label)}
        </span>

        <span
          className={`
            transition-transform
            ${open ? 'rotate-180' : ''}
          `}
        >
          <LuArrowDown />
        </span>
      </button>

      {open && (
        <div
          style={{
            maxHeight: maxDropdownHeight,
          }}
          className="absolute left-0 right-0 z-50 overflow-y-auto rounded-xl border border-neutral-light bg-white shadow-lg box-border mx-4"
        >
          {hasPlaceholder && (
            <button
              type="button"
              onClick={() => {
                field.handleChange('')
                setOpen(false)
              }}
              className="w-full px-4 py-3 text-left transition-colors hover:bg-neutral-100 cursor-pointer opacity-60"
            >
              {placeholder}
            </button>
          )}

          {options.map((option) => {
            const isSelected = field.state.value === option.value

            return (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  field.handleChange(option.value)
                  setOpen(false)
                }}
                className={`w-full px-4 py-3 text-left transition-colors hover:bg-neutral-100 cursor-pointer
                  ${isSelected
                    ? 'bg-primary/10 font-medium'
                    : ''
                  }`
                }
              >
                {option.label}
              </button>
            )
          })}

          {allowOther && (
            <button
              type="button"
              onClick={() => {
                field.handleChange(OTHER_VALUE as T)
                setOpen(false)
              }}
              className={`w-full px-4 py-3 text-left transition-colors hover:bg-neutral-100 cursor-pointer
                ${isOtherSelected
                  ? 'bg-primary/10 font-medium'
                  : ''
                }`
              }
            >
              {otherLabel}
            </button>
          )}
        </div>
      )}

      {allowOther && isOtherSelected && customField && (
        <input
          type="text"
          value={customField.state.value ?? ''}
          onChange={(e) => customField.handleChange(e.target.value)}
          onBlur={() => {
            const value = customField.state.value

            if (!value) return

            const normalizedValue = value.trim().toLowerCase()
            const matchedOption = options.find((option) =>
              option.label.trim().toLowerCase() === normalizedValue ||
              option.value.trim().toLowerCase() === normalizedValue,
            )

            if (!matchedOption) return

            field.handleChange(matchedOption.value)
            customField.handleChange('')
          }}
          placeholder={otherPlaceholder}
          className="w-full rounded-xl border border-neutral-light bg-white px-4 py-3 outline-none transition-colors focus:border-primary"
        />
      )}

      {errorMessage && (
        <InputMessageError
          message={errorMessage}
        />
      )}
    </div>
  )
}
