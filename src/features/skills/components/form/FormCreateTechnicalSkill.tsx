import { useForm } from '@tanstack/react-form'
import { DOMAIN_LEVELS, TechnicalFormSchema, defaultValues, type TechnicalDto } from '../../dtos/technical.dto'
import { useGetTechnicalSkillsSystem } from '../../hooks/useGetTechnicalSkillsSystem'
import { FormSelect } from '../../../../shared/components/form'
import { objectToOptions, toOptions } from '../../../../shared/components/form/form.utils'

interface Props {
  formId: string
  success: (value: TechnicalDto) => void
}

export const FormCreateTechnicalSkill = ({ formId, success }: Props) => {
  const { data } = useGetTechnicalSkillsSystem()

  const form = useForm({
    defaultValues,
    validators: { onSubmit: TechnicalFormSchema},
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
