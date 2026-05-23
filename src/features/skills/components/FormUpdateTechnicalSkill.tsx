import { useForm } from '@tanstack/react-form'
import { InputMessageError } from '../../../shared/components/InputMessageError'
import { TechnicalSchema, type TechnicalDto } from '../dtos/technical.dto'
import type { TechnicalSkillResponse } from '../interfaces/technical.interface'

interface Props {
  technology: TechnicalSkillResponse
  update: (value: { id: number, data: TechnicalDto }) => void
}

export const FormUpdateTechnicalSkill = ({ technology, update }: Props) => {
  const form = useForm({
    defaultValues: {
      name: technology.name,
      domain_level: technology.domain_level,
    },
    validators: { onSubmit: TechnicalSchema },
    onSubmit: ({ value }) => {
      update({
        id: technology.id,
        data: {
          ...value,
          domain_level: value.domain_level as 'Básico' | 'Intermedio' | 'Avanzado',
        },
      })
    },
  })

  return (
    <form
      id="technical-skill-form-update"
      className="flex flex-col gap-2"
      onSubmit={(e) => {
        e.preventDefault()
        form.handleSubmit(e)
      }}
    >
      <form.Field
        name="name"
        children={(field) => (
          <div>
            <label className="block font-semibold text-background-dark mb-1.5">Habilidad técnica</label>
            <input
              id={field.name}
              name={field.name}
              type="text"
              placeholder="Ingrese su habilidad técnica"
              value={field.state.value}
              className="w-full px-4 py-2.5 rounded-xl border border-neutral-light bg-neutral-50 text-background-dark outline-none focus:border-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled
            />
            {!field.state.meta.isValid && (
              <InputMessageError message={field.state.meta.errors.map(e => e?.message).join(', ')} />
            )}
          </div>
        )}
      />

      <form.Field
        name="domain_level"
        children={(field) => (
          <div>
            <label className="block font-semibold text-background-dark mb-1.5">NIvel de dominio</label>
            <select
              id={field.name}
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-neutral-light bg-neutral-50 text-background-dark outline-none focus:border-primary transition-colors"
            >
              <option>Seleccionar</option>
              <option value="Básico">Básico</option>
              <option value="Intermedio">Intermedio</option>
              <option value="Avanzado">Avanzado</option>
            </select>
            {!field.state.meta.isValid && (
              <InputMessageError message={field.state.meta.errors.map(e => e?.message).join(', ')} />
            )}
          </div>
        )}
      />
    </form>
  )
}
