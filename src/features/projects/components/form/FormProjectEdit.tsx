import { useForm } from '@tanstack/react-form'
import { BannerMessageError } from '../../../../shared/components/BannerMessageError'
import { FormField } from '../field_form/FormField'
import { FormTextarea } from '../field_form/FormTextarea'
import { ProjectLinksEditor, type ProjectLinkInput } from '../field_form/ProjectLinksEditor'
import { ProjectUpdateSchema, projectUpdateDefaultValues } from '../../dtos/project.dto'
import type { ProjectUpdateDto } from '../../dtos/project.dto'
import type { ProjectSkillResponse } from '../../interfaces/project.interface'

interface Props {
  onCancel?: () => void
  onSubmit: (values: ProjectUpdateDto) => void
  submitLabel?: string
  defaultValues?: Partial<ProjectUpdateDto>
  title?: string
  role?: string
  skills?: ProjectSkillResponse[]
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
  role,
  skills = [],
  isPending,
  serverError,
}: Props) => {
  const form = useForm({
    defaultValues: { ...projectUpdateDefaultValues, ...defaultValues },
    validators: { onSubmit: ProjectUpdateSchema },
    onSubmit: ({ value }) => {
      onSubmit(value)
    },
  })

  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault()
        await form.handleSubmit()
      }}
      className="flex flex-col gap-4"
    >
      <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
        <div>
          <label className="block font-semibold text-background-dark mb-1.5">Proyecto</label>
          <input
            type="text"
            value={title ?? ''}
            disabled
            readOnly
            className="w-full px-4 py-2.5 rounded-xl border border-neutral-light bg-gray-100 text-background-dark outline-none cursor-not-allowed"
          />
        </div>

        <div>
          <label className="block font-semibold text-background-dark mb-1.5">Rol</label>
          <input
            type="text"
            value={role ?? ''}
            disabled
            readOnly
            className="w-full px-4 py-2.5 rounded-xl border border-neutral-light bg-gray-100 text-background-dark outline-none cursor-not-allowed"
          />
        </div>
      </div>

      <form.Field
        name="description"
        children={(field) => (
          <FormTextarea label="Descripción *" field={field} placeholder="Describe el proyecto" />
        )}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <form.Field
          name="start_date"
          children={(field) => <FormField label="Fecha de inicio" field={field} type="date" />}
        />

        <form.Field
          name="end_date"
          children={(field) => <FormField label="Fecha de finalización" field={field} type="date" />}
        />
      </div>

      <div>
        <label className="block font-semibold text-background-dark mb-1.5">Habilidades seleccionadas</label>
        <div className="flex flex-wrap gap-2 rounded-xl border border-neutral-light bg-neutral-50 p-3 min-h-11.5">
          {skills.length ? (
            skills.map((skill) => (
              <span
                key={skill.id}
                className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary capitalize"
              >
                {skill.name}
              </span>
            ))
          ) : (
            <p className="text-sm text-neutral-medium/70">No hay habilidades asociadas a este proyecto.</p>
          )}
        </div>
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

      {serverError && <BannerMessageError message={serverError} />}

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
    </form >
  )
}
