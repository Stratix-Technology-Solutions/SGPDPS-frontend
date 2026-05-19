import { InputMessageError } from '../../../../shared/components/InputMessageError'
import type { AnyFieldApi } from '@tanstack/react-form'

interface Option {
  value: string
  label: string
}

interface Props {
  label: string
  field: AnyFieldApi
  options: Option[]
  disabled?: boolean
}

export const FormSelect = ({ label, field, options, disabled }: Props) => {
  const errors = field.state.meta.errors
  const errorMessage = errors.length > 0
    ? errors.map((e: unknown) => typeof e === 'string' ? e : (e as { message?: string })?.message).join(', ')
    : undefined

  return (
    <div>
      <label className="block font-semibold text-background-dark mb-1.5">{label}</label>
      <select
        value={field.state.value ?? ''}
        onChange={(e) => field.handleChange(e.target.value)}
        disabled={disabled}
        className="w-full px-4 py-2.5 rounded-xl border border-neutral-light bg-neutral-50 text-background-dark outline-none focus:border-primary transition-colors disabled:bg-neutral-100 disabled:text-neutral-medium disabled:cursor-not-allowed"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
      {errorMessage && <InputMessageError message={errorMessage} />}
    </div>
  )
}
