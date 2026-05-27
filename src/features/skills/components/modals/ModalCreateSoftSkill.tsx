import { useForm } from '@tanstack/react-form'
import { SoftFormSchema, defaultValues } from '../../dtos/soft.dto'
import { BannerMessageError } from '../../../../shared/components/BannerMessageError'
import { Modal, ModalBody, ModalFooter, ModalHeader } from '../../../../shared/components/modal'
import { useCreateSoftSKill } from '../../hooks/useCreateSoftSkill'
import { FormSelect } from '../../../../shared/components/form'
import { useGetSoftSkillsSystem } from '../../hooks/useGetSoftSkillsSystem'
import { objectToOptions } from '../../../../shared/components/form/form.utils'

interface Props {
  isOpen: boolean
  onClose: () => void
}

export const ModalCreateSoftSkill = ({ isOpen, onClose }: Props) => {
  const { data } = useGetSoftSkillsSystem()
  const { mutate: create, error, isPending, isError } = useCreateSoftSKill()

  const form = useForm({
    defaultValues,
    validators: { onSubmit: SoftFormSchema },
    onSubmit: ({ value }) => {
      const finalName = value.name === '__other__'
        ? value.custom_name
        : value.name

      create({ name: finalName }, { onSuccess: onClose })
    },
  })

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader
        title="Crear Habilidad Blanda"
        subtitle="Aquí podrás agregar la habilidad blanda que te caracterice."
      />

      <ModalBody>
        <div className="flex flex-col gap-4 py-2">
          {isError && (
            <BannerMessageError
              message={error.response?.data?.message
                || 'Surgió un error durante el registro de la habilidad blanda'
              }
            />
          )}

          <form
            id="soft-skill-form"
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
                      label="Habilidad blanda"
                      field={field}
                      customField={customField}
                      options={data ? objectToOptions(data, 'name', 'name') : []}
                      allowOther
                      required
                    />
                  )}
                />
              )}
            />
          </form>
        </div>
      </ModalBody>

      <ModalFooter
        formId="soft-skill-form"
        disabled={isPending}
        loading={isPending}
      />
    </Modal>
  )
}
