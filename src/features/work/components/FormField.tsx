import { InputMessageError } from '../../../shared/components/InputMessageError'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyFieldApi = any

interface Props {
  label: string
  placeholder?: string
  type?: string
  field: AnyFieldApi
}

export const FormField = ({
  label,
  placeholder,
  type = 'text',
  field,
}: Props) => (
  <div>
    <label className="block font-semibold text-background-dark mb-1.5">
      {label}
    </label>
    <input
      id={field.name}
      name={field.name}
      type={type}
      placeholder={placeholder}
      value={field.state.value ?? ''}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        field.handleChange(e.target.value || null)
      }
      className="w-full px-4 py-2.5 rounded-xl border border-neutral-light bg-neutral-50 text-background-dark outline-none focus:border-primary transition-colors"
    />
    {!field.state.meta.isValid && (
      <InputMessageError
        message={field.state.meta.errors
          .map((e: { message?: string }) => e?.message)
          .join(', ')}
      />
    )}
  </div>
)
