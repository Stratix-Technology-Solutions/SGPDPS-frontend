import type { AnyFieldApi } from '@tanstack/react-form'
import { InputMessageError } from './InputMessageError'

export function ProfessionsField({ field }: { field: AnyFieldApi }) {
  return (
    <div className="flex flex-col gap-2">
      {(field.state.value as string[]).map((_, index) => (
        <div key={index} className="flex gap-2 items-center">
          <input
            type="text"
            placeholder={`Profesión ${index + 1}`}
            value={(field.state.value as string[])[index]}
            onChange={(e) => {
              const updated = [...(field.state.value as string[])]
              updated[index] = e.target.value
              field.handleChange(updated)
            }}
            className="flex-1 px-4 py-2.5 rounded-xl border border-neutral-light bg-neutral-50 text-sm text-background-dark outline-none focus:border-primary transition-colors"
          />
          <button
            type="button"
            onClick={() => field.handleChange((field.state.value as string[]).filter((_, i) => i !== index))}
            className="text-neutral-medium hover:text-red-500 transition-colors cursor-pointer p-1"
          >
            ✕
          </button>
        </div>
      ))}
      {(field.state.value as string[]).length < 5 && (
        <button
          type="button"
          onClick={() => field.handleChange([...(field.state.value as string[]), ''])}
          className="text-sm text-primary-soft hover:text-primary font-medium text-left mt-1 cursor-pointer transition-colors"
        >
          + Agregar profesión
        </button>
      )}
      {!field.state.meta.isValid && field.state.meta.errors.length > 0 && (
        <InputMessageError message={field.state.meta.errors[0]?.message ?? ''} />
      )}
    </div>
  )
}
