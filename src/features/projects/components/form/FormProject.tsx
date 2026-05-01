import { useForm } from '@tanstack/react-form'
import { FormField } from '../field_form/FormField'
import { FormSelect } from '../field_form/FormSelect'
import { FormTextarea } from '../field_form/FormTextarea'
import { FormTags } from '../field_form/FormTags'
import { BannerMessageError } from '../../../../shared/components/BannerMessageError'
import { ProjectSchema, defaultValues as emptyValues } from '../../dtos/project.dto'
import type { ProjectDto } from '../../dtos/project.dto'

interface Props {
  onCancel?: () => void
  onSubmit: (values: ProjectDto) => void
  submitLabel?: string
  defaultValues?: Partial<ProjectDto>
  isPending?: boolean
  serverError?: string
}

export const FormProject = ({ onCancel, onSubmit, submitLabel = 'Guardar', defaultValues, isPending, serverError }: Props) => {
  const form = useForm({
    defaultValues: { ...emptyValues, ...defaultValues },
    validators: { onSubmit: ProjectSchema },
    onSubmit: ({ value }) => { onSubmit(value) },
  })

  return (
    <form onSubmit={async (e) => { e.preventDefault(); await form.handleSubmit() }} className="flex flex-col gap-4">
      <form.Field name="title" children={(field) => (
        <FormField label="Proyecto *" field={field} placeholder="Ingrese el título del proyecto" />
      )} />

      <form.Field name="description" children={(field) => (
        <FormTextarea label="Aportes realizados / Descripción *" field={field} placeholder="Describe tus aportes y el proyecto" />
      )} />

      <form.Field name="role" children={(field) => (
        <FormSelect
          label="Rol desempeñado *"
          field={field}
          placeholder="Selecciona tu rol"
          options={[
            { value: 'Líder', label: 'Líder' },
            { value: 'Colaborador', label: 'Colaborador' },
            { value: 'Freelance', label: 'Freelance' },
          ]}
        />
      )} />

      <form.Field name="technologies" children={(field) => (
        <FormTags label="Tecnologías utilizadas *" field={field} placeholder="Ej: React, Node.js, Python" />
      )} />

      <form.Field name="url" children={(field) => (
        <FormField label="Link o URL del proyecto (opcional)" field={field} placeholder="https://..." />
      )} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <form.Field name="start_date" children={(field) => (
          <FormField label="Fecha de inicio *" field={field} type="date" />
        )} />

        <form.Field name="end_date" children={(field) => (
          <FormField label="Fecha de finalización" field={field} type="date" />
        )} />
      </div>

      <form.Field name="status" children={(field) => (
        <FormSelect
          label="Estado del proyecto *"
          field={field}
          options={[
            { value: 'en curso', label: 'En curso' },
            { value: 'finalizado', label: 'Finalizado' },
            { value: 'pausado', label: 'Pausado' },
          ]}
        />
      )} />

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
    </form>
  )
}
