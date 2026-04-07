import type { AnyFieldApi } from '@tanstack/react-form'
import { InputMessageError } from './InputMessageError'

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
  return (
    <div>
      <label className="block text-sm font-medium text-background-dark mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        {...inputProps}
        value={field.state.value as string}
        onChange={(e) => field.handleChange(e.target.value)}
        className="w-full px-4 py-2.5 rounded-xl border border-neutral-light bg-neutral-50 text-sm text-background-dark outline-none focus:border-primary transition-colors"
      />
      {!field.state.meta.isValid && field.state.meta.errors.length > 0 && (
        <InputMessageError message={field.state.meta.errors[0]?.message || ''} />
      )}
    </div>
  )
}
