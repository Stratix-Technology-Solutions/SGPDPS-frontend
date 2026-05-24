import { useEffect, useState } from 'react'
import { useForm } from '@tanstack/react-form'
import { FormTextarea } from '../field_form/FormTextarea'
import { ProjectLinksEditor, type ProjectLinkInput } from '../field_form/ProjectLinksEditor'
import { ProjectUpdateSchema, projectUpdateDefaultValues } from '../../dtos/project.dto'
import type { ProjectUpdateDto } from '../../dtos/project.dto'
import { Picker } from '../field_form/Picker'
import { useGetProjectSkill, useGetProjectsRole } from '../../hooks/useProjects'

interface Props {
  formId: string
  submit: (values: ProjectUpdateDto) => void
  defaultValues?: Partial<ProjectUpdateDto>
  title?: string
}

const normalizeLinks = (links: ProjectUpdateDto['links']): ProjectLinkInput[] => {
  return (links ?? []).map((link) => ({
    id: link.id,
    url: link.url,
  }))
}

export const FormProjectEdit = ({ formId, submit, defaultValues, title }: Props) => {
  const [projectStatus, setProjectStatus] = useState<'in_progress' | 'completed'>(
    defaultValues?.end_date ? 'completed' : 'in_progress',
  )
  const { data: rolesOptions, isLoading: loadingRole } = useGetProjectsRole()
  const { data: skillsOptions, isLoading: loadingSkill } = useGetProjectSkill()

  useEffect(() => {
    setProjectStatus(defaultValues?.end_date ? 'completed' : 'in_progress')
  }, [defaultValues?.end_date])

  const form = useForm({
    defaultValues: { ...projectUpdateDefaultValues, ...defaultValues },
    validators: { onSubmit: ProjectUpdateSchema },
    onSubmit: ({ value }) => {
      const today = new Date().toISOString().slice(0, 10)

      submit({
        ...value,
        start_date: projectStatus === 'completed' ? (value.start_date || today) : null,
        end_date: projectStatus === 'completed' ? (value.end_date || today) : null,
      })
    },
  })

  return (
    <form
      id={formId}
      className="flex flex-col gap-4"
      onSubmit={async (event) => {
        event.preventDefault()
        await form.handleSubmit()
      }}
    >
      <div className="grid grid-cols-1 gap-2">
        <div>
          <label className="block font-semibold text-background-dark mb-1.5">Nombre del proyecto</label>
          <input
            type="text"
            value={title ?? ''}
            disabled
            readOnly
            className="w-full px-4 py-2.5 rounded-xl border border-neutral-light bg-gray-100 text-background-dark outline-none cursor-not-allowed"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <form.Field
          name="roles_ids"
          children={(field) => (
            <Picker
              label="Roles en el proyecto *"
              value={field.state.value ?? []}
              options={rolesOptions ?? []}
              isLoading={loadingRole}
              isEditing={false}
              placeholder="Buscar rol en el proyecto..."
              disabled
              onChange={field.handleChange}
            />
          )}
        />

        <form.Field
          name="skill_ids"
          children={(field) => (
            <Picker
              label="Tecnologías utilizadas *"
              value={field.state.value ?? []}
              options={skillsOptions ?? []}
              isLoading={loadingSkill}
              isEditing={false}
              placeholder="Buscar tecnología utilizada..."
              disabled
              onChange={field.handleChange}
            />
          )}
        />
      </div>

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

      <form.Field
        name="links"
        children={(field) => (
          <ProjectLinksEditor
            label="Enlaces del proyecto"
            value={normalizeLinks(field.state.value)}
            onChange={field.handleChange}
          />
        )}
      />

      <form.Field
        name="description"
        children={(field) => (
          <FormTextarea label="Descripción del proyecto" field={field} placeholder="Explica de qué trata el proyecto y qué problema resuelve" />
        )}
      />
    </form>
  )
}
