import { useForm } from '@tanstack/react-form'
import { FormField } from '../field_form/FormField'
import { FormSelect } from '../field_form/FormSelect'
import { FormTextarea } from '../field_form/FormTextarea'
import { AcademicSchema, defaultValues as emptyValues } from '../../dtos/academic.dto'
import type { AcademicDto } from '../../dtos/academic.dto'

interface Props {
  formId?: string
  submit: (values: AcademicDto) => void
  defaultValues?: Partial<AcademicDto>
  lockIdentityFields?: boolean
}

export const FormAcademic = ({ formId, submit, defaultValues, lockIdentityFields }: Props) => {
  const form = useForm({
    defaultValues: { ...emptyValues, ...defaultValues },
    validators: { onSubmit: AcademicSchema },
    onSubmit: ({ value }) => {
      submit({
        ...value,
        end_date: value.end_date || null,
      })
    },
  })

  return (
    <form
      id={formId}
      onSubmit={(e) => {
        e.preventDefault()
        form.handleSubmit()
      }}
      className="flex flex-col gap-4"
    >
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
          disabled={lockIdentityFields}
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
    </form>
  )
}
