import type { FieldApi } from '@tanstack/react-form'

interface Props {
  label: string
  description?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: FieldApi<any, any, any, any>
}

export const FormCheckbox = ({ label, description, field }: Props) => (
  <div className="flex items-start gap-3 p-3 rounded-xl bg-neutral-50 border border-neutral-light">
    <input
      type="checkbox"
      checked={field.state.value}
      onChange={(e) => field.handleChange(e.target.checked)}
      className="mt-1 accent-primary cursor-pointer"
    />
    <div>
      <span className="font-semibold text-background-dark">{label}</span>
      {description && <p className="text-sm text-neutral-medium/70">{description}</p>}
    </div>
  </div>
)
