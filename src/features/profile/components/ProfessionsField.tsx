import type { AnyFieldApi } from '@tanstack/react-form'
import { InputMessageError } from '../../../shared/components/InputMessageError'

interface Props {
  field: AnyFieldApi
}

export function ProfessionsField({ field }: Props) {
  const professions = field.state.value as string[]

  return (
    <div className="flex flex-col gap-2">
      {professions.map((profession, index) => (
        <div key={index} className="flex gap-2 items-center">
          <input
            type="text"
            placeholder={`Profesión ${index + 1}`}
            value={profession}
            onChange={(e) => {
              const updated = [...professions]
              updated[index] = e.target.value
              field.handleChange(updated)
            }}
            className="flex-1 px-4 py-2.5 rounded-xl border border-neutral-light bg-neutral-50 text-sm text-background-dark outline-none focus:border-primary transition-colors"
          />
          <button
            type="button"
            onClick={() => field.handleChange(professions.filter((_, i) => i !== index))}
            className="text-neutral-medium hover:text-red-500 transition-colors cursor-pointer p-1"
            aria-label={`Eliminar profesión ${index + 1}`}
          >
            ✕
          </button>
        </div>
      ))}

      {professions.length < 5 && (
        <button
          type="button"
          onClick={() => field.handleChange([...professions, ''])}
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
