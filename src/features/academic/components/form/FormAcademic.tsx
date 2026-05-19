import { useForm } from '@tanstack/react-form'
import { FormField } from '../field_form/FormField'
import { FormSelect } from '../field_form/FormSelect'
import { FormTextarea } from '../field_form/FormTextarea'
import { BannerMessageError } from '../../../../shared/components/BannerMessageError'
import { AcademicSchema, defaultValues as emptyValues } from '../../dtos/academic.dto'
import type { AcademicDto } from '../../dtos/academic.dto'

interface Props {
  onCancel?: () => void
  onSubmit: (values: AcademicDto) => void
  submitLabel?: string
  defaultValues?: Partial<AcademicDto>
  isPending?: boolean
  serverError?: string
  lockIdentityFields?: boolean
}

export const FormAcademic = ({ onCancel, onSubmit, submitLabel, defaultValues, isPending, serverError, lockIdentityFields }: Props) => {
  const form = useForm({
    defaultValues: { ...emptyValues, ...defaultValues },
    validators: { onSubmit: AcademicSchema },
    onSubmit: ({ value }) => {
      onSubmit({
        ...value,
        end_date: value.end_date || null,
      })
    },
  })

  return (
    <form onSubmit={async (e) => { e.preventDefault(); await form.handleSubmit() }} className="flex flex-col gap-4">
      <form.Field name="title" children={(field) => (
        <FormField
          label="Nombre de la actividad *"
          field={field}
          placeholder="Ej. Curso de programación web"
          disabled={lockIdentityFields}
        />
      )} />

      <form.Field name="institution" children={(field) => (
        <FormField
          label="Institución u organización *"
          field={field}
          placeholder="Ej. Instituto, universidad u organización"
          disabled={lockIdentityFields}
        />
      )} />

      <form.Field name="type" children={(field) => (
        <FormSelect
          label="Tipo de actividad *"
          field={field}
          options={[
            { value: 'educación', label: 'Curso, taller o capacitación' },
            { value: 'certificado', label: 'Certificado o charla certificada' },
          ]}
        />
      )} />

      <div className="grid grid-cols-2 gap-4">
        <form.Field name="start_date" children={(field) => (
          <FormField label="Fecha de inicio *" field={field} type="date" />
        )} />

        <form.Field name="end_date" children={(field) => (
          <FormField label="Fecha de fin" field={field} type="date" />
        )} />
      </div>

      <form.Field name="description" children={(field) => (
        <FormTextarea label="Descripción o logro obtenido" field={field} placeholder="Ej. Participación, horas cursadas, tema aprendido o certificado obtenido" />
      )} />

      {/*
      <form.Field name="is_visible" children={(field) => (
        <FormCheckbox
          label="Visible"
          field={field}
          description="Elige si esta experiencia académica será visible para quienes revisen tu portafolio."
        />
      )} />
      */}
      {serverError && <BannerMessageError message={serverError} />}
      <div className="flex justify-end gap-3 pt-1">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded-md border cursor-pointer hover:bg-neutral-light"
          >
            Cancelar
          </button>
        )}
        <button
          type="submit"
          disabled={isPending}
          className="px-4 py-2 rounded-md bg-primary hover:bg-primary-soft text-white cursor-pointer disabled:bg-neutral-medium disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  )
}
