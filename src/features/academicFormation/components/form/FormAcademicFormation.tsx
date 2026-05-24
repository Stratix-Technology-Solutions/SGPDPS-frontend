import { useForm } from '@tanstack/react-form'
import { FormField } from '../../../academic/components/field_form/FormField'
import { FormSelect } from '../../../academic/components/field_form/FormSelect'
import { FormTextarea } from '../../../academic/components/field_form/FormTextarea'
import {
  AcademicFormationSchema,
  defaultValues as emptyValues,
} from '../../dtos/academicFormation.dto'
import type { AcademicFormationDto } from '../../dtos/academicFormation.dto'

interface Props {
  formId: string
  submit: (values: AcademicFormationDto) => void
  defaultValues?: Partial<AcademicFormationDto>
  lockIdentityFields?: boolean
  lockCompletedStatus?: boolean
}

export const FormAcademicFormation = ({
  formId,
  submit,
  defaultValues,
  lockIdentityFields,
  lockCompletedStatus,
}: Props) => {
  const form = useForm({
    defaultValues: { ...emptyValues, ...defaultValues },
    validators: { onSubmit: AcademicFormationSchema },
    onSubmit: ({ value }) => {
      submit({
        ...value,
        field_of_study: value.education_level === 'bachillerato' ? null : value.field_of_study,
        emission_date: value.status === 'completado' ? value.emission_date : null,
      })
    },
  })

  return (
    <form
      id={formId}
      className="flex flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault()
        form.handleSubmit()
      }}
    >
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
          disabled={lockIdentityFields}
        />
      )} />

      <form.Field name="institution" children={(field) => (
        <FormField
          label="Institución *"
          field={field}
          placeholder="Ingrese colegio, instituto o universidad"
          disabled={lockIdentityFields}
        />
      )} />

      <form.Field name="education_level" children={(levelField) => (
        <form.Field name="field_of_study" children={(field) => (
          <FormField
            label={levelField.state.value === 'bachillerato' ? 'Carrera o especialidad' : 'Carrera o especialidad *'}
            field={field}
            placeholder={levelField.state.value === 'bachillerato' ? 'No aplica' : 'Ej. Ingeniería de Sistemas, Medicina, Gestión de Proyectos'}
            disabled={levelField.state.value === 'bachillerato' || lockIdentityFields}
          />
        )} />
      )} />

      <form.Field name="status" children={(field) => (
        <>
          <FormSelect
            label="Estado *"
            field={field}
            options={[
              { value: 'en_curso', label: 'En curso' },
              { value: 'completado', label: 'Completado' },
            ]}
            disabled={lockCompletedStatus}
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
    </form>
  )
}
