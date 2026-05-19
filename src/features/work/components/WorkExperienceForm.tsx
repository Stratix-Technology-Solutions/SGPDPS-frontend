import { BannerMessageError } from '../../../shared/components/BannerMessageError'
import { InputMessageError } from '../../../shared/components/InputMessageError'
import { FormField } from '../components/FormField'
import { WorkExperienceSchema, defaultValues } from '../dtos/workExperience'
import { useForm } from '@tanstack/react-form'
import type { WorkExperienceFormValues } from '../dtos/workExperience'

interface Props {
  initialValues?: WorkExperienceFormValues
  onSubmit: (values: WorkExperienceFormValues) => void
  onCancel: () => void
  isPending: boolean
  isError: boolean
  errorMessage?: string
}

export const WorkExperienceForm = ({
  initialValues,
  onSubmit,
  onCancel,
  isPending,
  isError,
  errorMessage,
}: Props) => {
  const form = useForm({
    defaultValues: initialValues ?? defaultValues,
    validators: { onSubmit: WorkExperienceSchema },
    onSubmit: ({ value }) => onSubmit(value),
  })

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={async (e) => {
        e.preventDefault()
        await form.handleSubmit()
      }}
    >
      <form.Field
        name="company"
        children={(field) => (
          <FormField
            label="Empresa *"
            placeholder="Ingrese el nombre de la empresa"
            field={field}
            disabled={initialValues !== undefined}
          />
        )}
      />

      <form.Field
        name="position"
        children={(field) => (
          <FormField
            label="Cargo *"
            placeholder="Ingrese su cargo o posición"
            field={field}
          />
        )}
      />

      <div className="grid grid-cols-2 gap-4">
        <form.Field
          name="start_date"
          children={(field) => (
            <FormField label="Fecha de inicio *" type="date" field={field} />
          )}
        />
        <form.Field
          name="end_date"
          children={(field) => (
            <FormField label="Fecha de fin" type="date" field={field} />
          )}
        />
      </div>

      <form.Field
        name="description"
        children={(field) => (
          <div>
            <label className="block font-semibold text-background-dark mb-1.5">
              Descripción
            </label>
            <textarea
              id={field.name}
              name={field.name}
              placeholder="Describe brevemente tus responsabilidades y logros"
              value={field.state.value ?? ''}
              onChange={(e) => field.handleChange(e.target.value || null)}
              rows={3}
              className="w-full px-4 py-2.5 rounded-xl border border-neutral-light bg-neutral-50 text-background-dark outline-none focus:border-primary transition-colors resize-none"
            />
            {!field.state.meta.isValid && (
              <InputMessageError
                message={field.state.meta.errors
                  .map((e) => e?.message)
                  .join(', ')}
              />
            )}
          </div>
        )}
      />

      {isError && (
        <BannerMessageError
          message={
            errorMessage ?? 'Surgió un error al guardar la experiencia laboral.'
          }
        />
      )}

      <div className="flex justify-end gap-4 pt-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded-md border cursor-pointer hover:bg-neutral-light"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={isPending}
          className="px-4 py-2 rounded-md bg-primary hover:bg-primary-soft text-white disabled:bg-neutral-medium disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
        >
          Guardar
        </button>
      </div>
    </form>
  )
}
