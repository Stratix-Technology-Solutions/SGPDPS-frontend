import { useEffect, useState } from 'react'
import { useForm } from '@tanstack/react-form'
import { BannerMessageError } from '../../../../shared/components/BannerMessageError'
import { FormTextarea } from '../field_form/FormTextarea'
import { ProjectLinksEditor, type ProjectLinkInput } from '../field_form/ProjectLinksEditor'
import { ProjectUpdateSchema, projectUpdateDefaultValues } from '../../dtos/project.dto'
import type { ProjectUpdateDto } from '../../dtos/project.dto'
import { Picker } from '../field_form/Picker'
import { useGetProjectSkill, useGetProjectsRole } from '../../hooks/useProjects'

interface Props {
  onCancel?: () => void
  onSubmit: (values: ProjectUpdateDto) => void
  submitLabel?: string
  defaultValues?: Partial<ProjectUpdateDto>
  title?: string
  isPending?: boolean
  serverError?: string
}

const normalizeLinks = (links: ProjectUpdateDto['links']): ProjectLinkInput[] => {
  return (links ?? []).map((link) => ({
    id: link.id,
    url: link.url,
  }))
}

export const FormProjectEdit = ({
  onCancel,
  onSubmit,
  submitLabel = 'Guardar cambios',
  defaultValues,
  title,
  isPending,
  serverError,
}: Props) => {
  const [projectStatus, setProjectStatus] = useState<'in_progress' | 'completed'>(
    defaultValues?.end_date ? 'completed' : 'in_progress',
  )

  useEffect(() => {
    setProjectStatus(defaultValues?.end_date ? 'completed' : 'in_progress')
  }, [defaultValues?.end_date])

  const form = useForm({
    defaultValues: { ...projectUpdateDefaultValues, ...defaultValues },
    validators: { onSubmit: ProjectUpdateSchema },
    onSubmit: ({ value }) => {
      const today = new Date().toISOString().slice(0, 10)

      onSubmit({
        ...value,
        start_date: projectStatus === 'completed' ? (value.start_date || today) : null,
        end_date: projectStatus === 'completed' ? (value.end_date || today) : null,
      })
    },
  })

  const { data: rolesOptions, isLoading: loadingRole } = useGetProjectsRole()
  const { data: skillsOptions, isLoading: loadingSkill } = useGetProjectSkill()

  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault()
        await form.handleSubmit()
      }}
      className="flex flex-col gap-4"
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

      {serverError && <BannerMessageError message={serverError} />}

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
