import { useForm } from '@tanstack/react-form'
import { FormField } from '../field_form/FormField'
import { FormTextarea } from '../field_form/FormTextarea'
import { FormTags } from '../field_form/FormTags'
import { ProjectCreateSchema, defaultValues } from '../../dtos/project.dto'
import type { ProjectCreateDto } from '../../dtos/project.dto'
import { Picker } from '../field_form/Picker'
import { useGetProjectsRole, useGetProjectSkill } from '../../hooks/useProjects'

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

  const { data: roles, isLoading: loadingRole } = useGetProjectsRole()

  const { data: skills, isLoading: loadingSkill } = useGetProjectSkill()


  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        form.handleSubmit(e)
      }} className="flex flex-col gap-4" >
      <form.Field
        name="title"
        children={(field) => (
          <FormField
            label="Proyecto *"
            field={field}
            placeholder="Ingrese el título del proyecto"
          />
        )}
      />

      <form.Field
        name="roles_ids" children={(field) => (
          <Picker
            label="Roles"
            value={field.state.value ?? []}
            options={roles ?? []}
            isLoading={loadingRole}
            onChange={field.handleChange}
          />
        )}
      />

      < form.Field name="skill_ids" children={(field) => (
        <Picker
          label="Tecnologías utilizadas"
          value={field.state.value ?? []}
          options={skills ?? []}
          isLoading={loadingSkill}
          onChange={field.handleChange}
        />
      )} />

      < form.Field name="links" children={(field) => (
        <FormTags label="Enlaces del proyecto" field={field} placeholder="https://github.com/..." />
      )} />

      < div className="grid grid-cols-1 sm:grid-cols-2 gap-4" >
        <form.Field name="start_date" children={(field) => (
          <FormField label="Fecha de inicio *" field={field} type="date" />
        )} />

        <form.Field name="end_date" children={(field) => (
          <FormField label="Fecha de finalización *" field={field} type="date" />
        )} />
      </div >

      < form.Field name="description" children={(field) => (
        <FormTextarea label="Descripción" field={field} placeholder="Agrega una descripción sobre el proyecto realizado" />
      )} />

      <div className="flex justify-end gap-3 pt-4">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={isPending}
            className="px-4 py-2 rounded-md border cursor-pointer hover:bg-neutral-light"
          >
            Cancelar
          </button>
        )}
        <button
          type="submit"
          disabled={isPending}
          className="px-4 py-2 rounded-md bg-primary hover:bg-primary-soft text-white disabled:bg-neutral-medium disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
        >
          {submitLabel}
        </button>
      </div>
    </form >
  )
}
