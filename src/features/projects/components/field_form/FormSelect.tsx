import { InputMessageError } from '../../../../shared/components/InputMessageError'
import type { AnyFieldApi } from '@tanstack/react-form'

interface Props {
  label: string
  field: AnyFieldApi
  options: { label: string; value: string }[]
  placeholder?: string
}


export const FormSelect = ({ label, field, options, placeholder }: Props) => {
  const errors = field.state.meta.errors
  const errorMessage = errors.length > 0
    ? errors.map((e: unknown) => typeof e === 'string' ? e : (e as { message?: string })?.message).join(', ')
    : undefined

  return (
    <div>
      <label className="block font-semibold text-background-dark mb-1.5">{label}</label>
      <select
        value={(field.state.value as string) ?? ''}
        onChange={(e) => field.handleChange(e.target.value)}
        className="w-full px-4 py-2.5 rounded-xl border border-neutral-light bg-neutral-50 text-background-dark outline-none focus:border-primary transition-colors"
      >
        {placeholder && (
          <option value="" disabled hidden>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {errorMessage && <InputMessageError message={errorMessage} />}
    </div>
  )
}
