import { Modal, ModalBody, ModalFooter, ModalHeader } from '../../../shared/components/modal'
import { BannerMessageError } from '../../../shared/components/BannerMessageError'
import { useCreateTechnicalSkill } from '../hooks/useCreateTechnicalSkill'
import { FormCreateTechnicalSkill } from './form/FormCreateTechnicalSkill'

interface Props {
  isOpen: boolean
  onClose: () => void
}

export const ModalCreateTechnicalSkill = ({ isOpen, onClose }: Props) => {
  const { mutate: create, error, isPending, isError } = useCreateTechnicalSkill()

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader
        title="Crear Habilidad Técnica"
        subtitle="Aquí podrás agregar tecnologías y tu nivel."
      />

      <ModalBody>
        <div className="flex flex-col gap-4 py-2">
          {isError && (
            <BannerMessageError
              message={error.response?.data?.message ||
                'Surgió un error durante el registro de la habilidad técnica'
              }
            />
          )}

          <FormCreateTechnicalSkill
            formId="technical-skill-form"
            success={(value) => {
              create(value, { onSuccess: onClose })
            }}
          />
        </div>
      </ModalBody>

      <ModalFooter
        formId="technical-skill-form"
        disabled={isPending}
        loading={isPending}
      />
    </Modal>
  )
}
