import { Modal, ModalBody, ModalFooter, ModalHeader } from '../../../../shared/components/modal'
import { FormAcademicFormation } from '../form/FormAcademicFormation'
import { useAcademicFormation } from '../../hooks/useAcademicFormation'
import type { AcademicFormationDto } from '../../dtos/academicFormation.dto'
import { BannerMessageError } from '../../../../shared/components/BannerMessageError'

interface Props {
  isOpen: boolean
  onClose: () => void
}

export const ModalAddAcademicFormation = ({ isOpen, onClose }: Props) => {
  const { create } = useAcademicFormation()

  const handleSubmit = (values: AcademicFormationDto) => {
    create.mutate(values, {
      onSuccess: onClose,
    })
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader
        title="Agregar formación académica"
        subtitle="Registra estudios formales como bachillerato, técnico, universidad o posgrado."
      />

      <ModalBody>
        <div className="flex flex-col gap-4 py-2">
          {create.isError && (
            <BannerMessageError
              message={create.error?.response?.data?.message ?? 'Ocurrió un error al guardar la formación académica'}
            />
          )}

          <FormAcademicFormation
            formId="formation-form-create"
            submit={handleSubmit}
          />
        </div>
      </ModalBody>

      <ModalFooter
        formId="formation-form-create"
        loading={create.isPending}
        disabled={create.isPending}
      />
    </Modal>
  )
}
