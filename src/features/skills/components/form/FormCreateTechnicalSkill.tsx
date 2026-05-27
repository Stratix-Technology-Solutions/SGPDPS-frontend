import { useForm } from '@tanstack/react-form'
import { DOMAIN_LEVELS, TechnicalSchema, defaultValues, type DomainLevel, type TechnicalDto } from '../../dtos/technical.dto'
import { useGetTechnicalSkillsSystem } from '../../hooks/useGetTechnicalSkillsSystem'
import { InputMessageError } from '../../../../shared/components/InputMessageError'
import { AutocompleteInput } from '../AutoCompleteInput'

interface Props {
  formId: string
  success: (value: TechnicalDto) => void
}

export const FormCreateTechnicalSkill = ({ formId, success }: Props) => {
  const { data } = useGetTechnicalSkillsSystem()

  const form = useForm({
    defaultValues,
    validators: { onSubmit: TechnicalSchema },
    onSubmit: ({ value }) => { success(value) },
  })

  return (
    <form
      id={formId}
      className="flex flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault()
        form.handleSubmit(e)
      }}
    >
      <form.Field
        name="name"
        children={(field) => (
          <div>
            <label className="block font-semibold text-background-dark mb-1.5">
              Habilidad técnica
            </label>

            <AutocompleteInput
              value={field.state.value}
              onChange={field.handleChange}
              options={data?.map(item => item.name) ?? []}
              placeholder="Ingrese su habilidad técnica"
            />

            {!field.state.meta.isValid && (
              <InputMessageError
                message={field.state.meta.errors
                  .map(e => e?.message)
                  .join(', ')}
              />
            )}
          </div>
        )}
      />

      <form.Field
        name="domain_level"
        children={(field) => (
          <div>
            <label className="block font-semibold text-background-dark mb-1.5">
              Nivel de dominio
            </label>

            <select
              id={field.name}
              value={field.state.value}
              className="w-full px-4 py-2.5 rounded-xl border border-neutral-light bg-neutral-50 text-background-dark outline-none focus:border-primary transition-colors"
              onChange={(e) =>
                field.handleChange(
                  e.target.value as DomainLevel,
                )
              }
            >
              {DOMAIN_LEVELS.map((level) => (
                <option
                  key={level}
                  value={level}
                >
                  {level}
                </option>
              ))}
            </select>

            {!field.state.meta.isValid && (
              <InputMessageError
                message={field.state.meta.errors
                  .map(e => e?.message)
                  .join(', ')}
              />
            )}
          </div>
        )}
      />
    </form>
  )
}
