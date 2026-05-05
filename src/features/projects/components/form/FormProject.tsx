import { useForm } from '@tanstack/react-form'
import { FormField } from '../field_form/FormField'
import { FormTextarea } from '../field_form/FormTextarea'
import { FormTags } from '../field_form/FormTags'
import { ProjectCreateSchema, defaultValues } from '../../dtos/project.dto'
import type { ProjectCreateDto } from '../../dtos/project.dto'
import { ProjectSkillsPicker } from '../field_form/ProjectSkillsPicker'

interface Props {
  onCancel: () => void
  onSubmit: (values: ProjectCreateDto) => void
  submitLabel: string
  isPending: boolean
}

export const FormProject = ({ onCancel, onSubmit, submitLabel, isPending }: Props) => {
  const form = useForm({
    defaultValues,
    validators: { onSubmit: ProjectCreateSchema },
    onSubmit: ({ value }) => {
      onSubmit(value)
    },
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        form.handleSubmit(e)
      }}
      className="flex flex-col gap-4"
    >
      <form.Field
        name="title"
        children={(field) => (
          <FormField label="Proyecto *" field={field} placeholder="Ingrese el título del proyecto" />
        )}
      />

      <form.Field name="description" children={(field) => (
        <FormTextarea label="Aportes realizados / Descripción *" field={field} placeholder="Describe tus aportes y el proyecto" />
      )} />

      <form.Field name="skill_ids" children={(field) => (
        <ProjectSkillsPicker
          label="Tecnologías utilizadas"
          value={field.state.value ?? []}
          onChange={field.handleChange}
        />
      )} />

      <form.Field name="links" children={(field) => (
        <FormTags label="Enlaces del proyecto" field={field} placeholder="https://github.com/..." />
      )} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <form.Field name="start_date" children={(field) => (
          <FormField label="Fecha de inicio *" field={field} type="date" />
        )} />

        <form.Field name="end_date" children={(field) => (
          <FormField label="Fecha de finalización *" field={field} type="date" />
        )} />
      </div>

      <div className="flex justify-end gap-3 pt-4">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={isPending}
            className="px-5 py-2.5 rounded-xl border border-neutral-medium text-background-dark cursor-pointer hover:bg-neutral-light transition-colors disabled:opacity-50"
          >
            Cancelar
          </button>
        )}
        <button
          type="submit"
          disabled={isPending}
          className="px-5 py-2.5 rounded-xl bg-primary text-white cursor-pointer hover:bg-primary-soft transition-colors disabled:opacity-50"
        >
          {isPending ? 'Guardando...' : submitLabel}
        </button>
      </div>
    </form>
  )
}
