import { useState } from 'react'
import { useForm } from '@tanstack/react-form'
import { FormField } from '../field_form/FormField'
import { FormTextarea } from '../field_form/FormTextarea'
import { FormTags } from '../field_form/FormTags'
import { ProjectCreateSchema, defaultValues } from '../../dtos/project.dto'
import type { ProjectCreateDto } from '../../dtos/project.dto'
import { Picker } from '../field_form/Picker'
import { useGetProjectsRole, useGetProjectSkill } from '../../hooks/useProjects'

interface Props {
  formId: string
  submit: (values: ProjectCreateDto) => void
}

export const FormProject = ({ formId, submit }: Props) => {
  const [projectStatus, setProjectStatus] = useState<'in_progress' | 'completed'>('in_progress')
  const { data: roles, isLoading: loadingRole } = useGetProjectsRole()
  const { data: skills, isLoading: loadingSkill } = useGetProjectSkill()

  const form = useForm({
    defaultValues,
    validators: { onSubmit: ProjectCreateSchema },
    onSubmit: ({ value }) => {
      const today = new Date().toISOString().slice(0, 10)

      submit({
        ...value,
        start_date: projectStatus === 'completed' ? today : null,
        end_date: projectStatus === 'completed' ? today : null,
      })
    },
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

      <div>
        <label className="block font-semibold text-background-dark mb-1.5">Estado del proyecto *</label>
        <select
          value={projectStatus}
          onChange={(event) => setProjectStatus(event.target.value as 'in_progress' | 'completed')}
          className="w-full px-4 py-2.5 rounded-xl border border-neutral-light bg-neutral-50 text-background-dark outline-none focus:border-primary transition-colors"
        >
          <option value="in_progress">En curso</option>
          <option value="completed">Completado</option>
        </select>
      </div>

      <form.Field name="links" children={(field) => (
        <FormTags label="Enlaces del proyecto" field={field} placeholder="https://github.com/..." />
      )} />

      <form.Field name="description" children={(field) => (
        <FormTextarea label="Descripción del proyecto" field={field} placeholder="Explica de qué trata el proyecto y qué problema resuelve" />
      )} />
    </form>
  )
}
