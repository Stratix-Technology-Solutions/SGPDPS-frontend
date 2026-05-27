import type { AnyFieldApi } from '@tanstack/react-form'
import { InputMessageError } from '../InputMessageError'

interface Option {
  value: string
  label: string
}

interface Props {
  label: string
  field: AnyFieldApi
  customField?: AnyFieldApi
  options: Option[]
  disabled?: boolean
  allowOther?: boolean
  placeholder?: string
  otherLabel?: string
  otherPlaceholder?: string
}

const OTHER_VALUE = '__other__'

export const FormSelect = ({
  label,
  field,
  customField,
  options,
  disabled = false,
  allowOther = false,
  placeholder = 'Seleccione una opción',
  otherLabel = 'Otro',
  otherPlaceholder = 'Ingrese un valor',
}: Props) => {
  const errors = field.state.meta.errors

  const errorMessage =
    errors.length > 0
      ? errors
      .map((e: unknown) => typeof e === 'string'
        ? e
        : (e as { message?: string })?.message,
      ).join(', ')
      : undefined

  const isOtherSelected = field.state.value === OTHER_VALUE

  return (
    <div className="space-y-2">
      <label className="block font-semibold text-background-dark">
        {label}
      </label>

      <select
        value={field.state.value ?? ''}
        onChange={(e) =>
          field.handleChange(e.target.value)
        }
        disabled={disabled}
        className="w-full rounded-xl border border-neutral-light bg-neutral-50 px-4 py-3 text-background-dark outline-none transition-colors focus:border-primary disabled:cursor-not-allowed disabled:bg-neutral-100"
      >
        <option value="">
          {placeholder}
        </option>

        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}

        {allowOther && (
          <option value={OTHER_VALUE}>
            {otherLabel}
          </option>
        )}
      </select>

      {allowOther && isOtherSelected && customField && (
        <input
          type="text"
          value={
            customField.state.value ?? ''
          }
          onChange={(e) =>
            customField.handleChange(
              e.target.value,
            )
          }
          onBlur={() => {
            const value = customField.state.value
            if (!value) return
            const normalizedValue = value.trim().toLowerCase()
            const matchedOption = options.find(
              (option) => option.label.trim().toLowerCase() === normalizedValue ||
                option.value.trim().toLowerCase() === normalizedValue,
            )
            if (!matchedOption) return
            field.handleChange(
              matchedOption.value,
            )
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
