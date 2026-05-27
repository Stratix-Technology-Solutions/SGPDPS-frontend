import { useForm } from '@tanstack/react-form'
import { DOMAIN_LEVELS, TechnicalFormSchema, defaultValues, type TechnicalDto, type TechnicalFormValues } from '../../dtos/technical.dto'
import { useGetTechnicalSkillsSystem } from '../../hooks/useGetTechnicalSkillsSystem'
import { FormSelect } from '../../../../shared/components/form'
import { objectToOptions, toOptions } from '../../../../shared/components/form/form.utils'

interface Props {
  formId: string
  success: (value: TechnicalDto) => void
  initialValues?: Partial<TechnicalFormValues>
  disabledFields?: boolean
}

export const FormTechnicalSkill = ({
  formId,
  success,
  initialValues,
  disabledFields,
}: Props) => {
  const { data } = useGetTechnicalSkillsSystem()

  const form = useForm({
    defaultValues: { ...defaultValues, ...initialValues },
    validators: { onSubmit: TechnicalFormSchema },
    onSubmit: ({ value }) => {
      const finalName = value.name === '__other__'
        ? value.custom_name
        : value.name

      success({
        name: finalName,
        domain_level: value.domain_level,
      })
    },
  })

  return (
    <form
      id={formId}
      className="flex flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault()
        form.handleSubmit(e)
      }}
    >
      <form.Field
        name="name"
        children={(field) => (
          <form.Field
            name="custom_name"
            children={(customField) => (
              <FormSelect
                label="Habilidad técnica"
                field={field}
                customField={customField}
                allowOther
                options={data ? objectToOptions(data, 'name', 'name') : []}
                disabled={disabledFields}
              />
            )}
          />
        )}
      />

      <form.Field
        name="domain_level"
        children={(field) => (
          <FormSelect
            label="Nivel de dominio"
            field={field}
            options={toOptions(DOMAIN_LEVELS)}
            hasPlaceholder={false}
          />
        )}
      />
    </form>
  )
}
