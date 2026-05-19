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
      onSubmit({
        ...value,
        start_date: null,
        end_date: null,
      })
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
            label="Nombre del proyecto *"
            field={field}
            placeholder="Ingrese el nombre del proyecto"
          />
        )}
      />

      <form.Field
        name="roles_ids" children={(field) => (
          <Picker
            label="Roles en el proyecto *"
            value={field.state.value ?? []}
            options={roles ?? []}
            isLoading={loadingRole}
            isEditing={false}
            placeholder="Buscar rol en el proyecto..."
            onChange={field.handleChange}
          />
        )}
      />

      <form.Field name="skill_ids" children={(field) => (
        <Picker
          label="Tecnologías utilizadas *"
          value={field.state.value ?? []}
          options={skills ?? []}
          isLoading={loadingSkill}
          isEditing={false}
          placeholder="Buscar tecnología utilizada..."
          onChange={field.handleChange}
        />
      )} />

      <form.Field name="links" children={(field) => (
        <FormTags label="Enlaces del proyecto" field={field} placeholder="https://github.com/..." />
      )} />

      <form.Field name="description" children={(field) => (
        <FormTextarea label="Descripción del proyecto" field={field} placeholder="Explica de qué trata el proyecto y qué problema resuelve" />
      )} />

      <div className="sticky bottom-0 -mx-6 flex justify-end gap-3 border-t border-neutral-light bg-white px-6 py-4">
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
    </form>
  )
}
