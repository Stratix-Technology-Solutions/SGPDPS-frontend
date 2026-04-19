import { InputMessageError } from '../../../../shared/components/InputMessageError'
import type { FieldApi } from '@tanstack/react-form'

interface Props {
  label: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: FieldApi<any, any, any, any>
  type?: React.HTMLInputTypeAttribute
  placeholder?: string
}

export const FormField = ({ label, field, type = 'text', placeholder }: Props) => {
  const errors = field.state.meta.errors
  const errorMessage = errors.length > 0
    ? errors.map((e: unknown) => typeof e === 'string' ? e : (e as { message?: string })?.message).join(', ')
    : undefined

  return (
    <div>
      <label className="block font-semibold text-background-dark mb-1.5">{label}</label>
      <input
        type={type}
        value={field.state.value ?? ''}
        onChange={(e) => field.handleChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-2.5 rounded-xl border border-neutral-light bg-neutral-50 text-background-dark outline-none focus:border-primary transition-colors"
      />
      {errorMessage && <InputMessageError message={errorMessage} />}
    </div>
  )
}
