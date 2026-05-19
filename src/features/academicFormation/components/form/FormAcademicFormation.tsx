import { useForm } from '@tanstack/react-form'
import { FormField } from '../../../academic/components/field_form/FormField'
import { FormSelect } from '../../../academic/components/field_form/FormSelect'
import { FormTextarea } from '../../../academic/components/field_form/FormTextarea'
import { BannerMessageError } from '../../../../shared/components/BannerMessageError'
import {
  AcademicFormationSchema,
  defaultValues as emptyValues,
} from '../../dtos/academicFormation.dto'
import type { AcademicFormationDto } from '../../dtos/academicFormation.dto'

interface Props {
  onCancel?: () => void
  onSubmit: (values: AcademicFormationDto) => void
  submitLabel?: string
  defaultValues?: Partial<AcademicFormationDto>
  isPending?: boolean
  serverError?: string
}

export const FormAcademicFormation = ({
  onCancel,
  onSubmit,
  submitLabel = 'Guardar',
  defaultValues,
  isPending,
  serverError,
}: Props) => {
  const form = useForm({
    defaultValues: { ...emptyValues, ...defaultValues },
    validators: { onSubmit: AcademicFormationSchema },
    onSubmit: ({ value }) => {
      onSubmit({
        ...value,
        field_of_study: value.education_level === 'bachillerato' ? null : value.field_of_study,
        emission_date: value.status === 'completado' ? value.emission_date : null,
      })
    },
  })

  return (
    <form onSubmit={async (e) => { e.preventDefault(); await form.handleSubmit() }} className="flex flex-col gap-4">
      <form.Field name="education_level" children={(field) => (
        <FormSelect
          label="Grado académico *"
          field={field}
          options={[
            { value: 'bachillerato', label: 'Bachillerato' },
            { value: 'tecnico_medio', label: 'Técnico medio' },
            { value: 'tecnico_superior', label: 'Técnico superior' },
            { value: 'licenciatura', label: 'Licenciatura' },
            { value: 'maestria', label: 'Maestría' },
            { value: 'doctorado', label: 'Doctorado / PhD' },
          ]}
        />
      )} />

      <form.Field name="institution" children={(field) => (
        <FormField label="Institución *" field={field} placeholder="Ingrese colegio, instituto o universidad" />
      )} />

      <form.Field name="education_level" children={(levelField) => (
        <form.Field name="field_of_study" children={(field) => (
          <FormField
            label={levelField.state.value === 'bachillerato' ? 'Carrera o especialidad' : 'Carrera o especialidad *'}
            field={field}
            placeholder={levelField.state.value === 'bachillerato' ? 'No aplica' : 'Ej. Ingeniería de Sistemas, Medicina, Gestión de Proyectos'}
            disabled={levelField.state.value === 'bachillerato'}
          />
        )} />
      )} />

      <form.Field name="status" children={(field) => (
        <>
          <FormSelect
            label="Estado *"
            field={field}
            options={[
              { value: 'completado', label: 'Completado' },
              { value: 'en_curso', label: 'En curso' },
            ]}
          />

          {field.state.value === 'completado' && (
            <div className="mt-2">
              <form.Field name="emission_date" children={(dateField) => (
                <FormField label="Fecha de emisión del título *" field={dateField} type="date" />
              )} />
            </div>
          )}
        </>
      )} />

      <form.Field name="description" children={(field) => (
        <FormTextarea label="Descripción" field={field} placeholder="Ingrese una descripción" />
      )} />

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
