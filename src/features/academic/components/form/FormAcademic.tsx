import { useForm } from '@tanstack/react-form'
import { FormField } from '../field_form/FormField'
import { FormSelect } from '../field_form/FormSelect'
import { FormTextarea } from '../field_form/FormTextarea'
// import { FormCheckbox } from '../field_form/FormCheckbox'
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
}

export const FormAcademic = ({ onCancel, onSubmit, submitLabel, defaultValues, isPending, serverError }: Props) => {
  const form = useForm({
    defaultValues: { ...emptyValues, ...defaultValues },
    validators: { onSubmit: AcademicSchema},
    onSubmit: ({ value }) => {onSubmit(value)},
  })

  return (
    <form onSubmit={async (e) => { e.preventDefault();await form.handleSubmit() }} className="flex flex-col gap-4">
      <form.Field name="title" children={(field) => (
        <FormField label="Curso, taller o capacitación *" field={field} placeholder="Ingrese el nombre de la actividad" />
      )} />

      <form.Field name="institution" children={(field) => (
        <FormField label="Institución u organización *" field={field} placeholder="Ingrese quien la dictó" />
      )} />

      <div className="grid grid-cols-2 gap-4">
        <form.Field name="start_date" children={(field) => (
          <FormField label="Inicio *" field={field} type="date" />
        )} />

        <form.Field name="end_date" children={(field) => (
          <FormField label="Fin" field={field} type="date" />
        )} />
      </div>

      <form.Field name="type" children={(field) => (
        <FormSelect
          label="Tipo de experiencia"
          field={field}
          options={[
            { value: 'educación', label: 'Curso o capacitación' },
            { value: 'certificado', label: 'Certificado' },
          ]}
        />
      )} />

      <form.Field name="description" children={(field) => (
        <FormTextarea label="Descripción" field={field} placeholder="Ingrese una descripción" />
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
