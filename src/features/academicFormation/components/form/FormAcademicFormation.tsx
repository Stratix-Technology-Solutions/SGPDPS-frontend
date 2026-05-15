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
  onCancel?: () => void
  onSubmit: (values: AcademicFormationDto) => void
  submitLabel?: string
  defaultValues?: Partial<AcademicFormationDto>
  isPending?: boolean
}

export const FormAcademicFormation = ({
  onCancel,
  onSubmit,
  submitLabel = 'Guardar',
  defaultValues,
  isPending,
}: Props) => {
  const form = useForm({
    defaultValues: { ...emptyValues, ...defaultValues },
    validators: { onSubmit: AcademicFormationSchema },
    onSubmit: ({ value }) => { onSubmit(value) },
  })

  return (
    <form onSubmit={async (e) => { e.preventDefault(); await form.handleSubmit() }} className="flex flex-col gap-4">
      <form.Field name="education_level" children={(field) => (
        <FormSelect
          label="Nivel academico *"
          field={field}
          options={[
            { value: 'primaria', label: 'Primaria' },
            { value: 'secundaria', label: 'Secundaria' },
            { value: 'bachillerato', label: 'Bachillerato' },
            { value: 'tecnico_medio', label: 'Tecnico medio' },
            { value: 'tecnico_superior', label: 'Tecnico superior' },
            { value: 'licenciatura', label: 'Licenciatura' },
            { value: 'maestria', label: 'Maestria' },
            { value: 'doctorado', label: 'Doctorado / PhD' },
          ]}
        />
      )} />

      <form.Field name="institution" children={(field) => (
        <FormField label="Institucion *" field={field} placeholder="Ingrese colegio, instituto o universidad" />
      )} />

      <form.Field name="degree_title" children={(field) => (
        <FormField label="Titulo o grado obtenido" field={field} placeholder="Ej. Bachiller, Licenciado, Tecnico Superior" />
      )} />

      <form.Field name="field_of_study" children={(field) => (
        <FormField label="Area de estudio" field={field} placeholder="Ej. Sistemas, Contabilidad, Enfermeria" />
      )} />

      <div className="grid grid-cols-2 gap-4">
        <form.Field name="start_date" children={(field) => (
          <FormField label="Inicio *" field={field} type="date" />
        )} />

        <form.Field name="end_date" children={(field) => (
          <FormField label="Fin" field={field} type="date" />
        )} />
      </div>

      <form.Field name="status" children={(field) => (
        <FormSelect
          label="Estado"
          field={field}
          options={[
            { value: 'completado', label: 'Completado' },
            { value: 'en_curso', label: 'En curso' },
            { value: 'abandonado', label: 'Abandonado' },
            { value: 'pausado', label: 'Pausado' },
          ]}
        />
      )} />

      <form.Field name="description" children={(field) => (
        <FormTextarea label="Descripcion" field={field} placeholder="Ingrese una descripcion" />
      )} />

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
