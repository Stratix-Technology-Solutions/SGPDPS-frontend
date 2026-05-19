import { Modal } from '../../../../shared/components/Modal'
import { FormAcademicFormation } from '../form/FormAcademicFormation'
import { useAcademicFormation } from '../../hooks/useAcademicFormation'
import type { AcademicFormationDto } from '../../dtos/academicFormation.dto'

interface Props {
  onClose: () => void
}

export const ModalAddAcademicFormation = ({ onClose }: Props) => {
  const { create } = useAcademicFormation()

  const handleSubmit = (values: AcademicFormationDto) => {
    create.mutate(values, {
      onSuccess: onClose,
    })
  }

  return (
    <Modal
      title="Agregar formación académica"
      description="Registra estudios formales como bachillerato, técnico, universidad o posgrado."
      onClose={onClose}
    >
      <FormAcademicFormation
        onCancel={onClose}
        submitLabel="Guardar"
        onSubmit={handleSubmit}
        isPending={create.isPending}
        serverError={create.error?.response?.data?.message ?? (create.isError ? 'Ocurrió un error al guardar la formación académica' : undefined)}
      />
    </Modal>
  )
}
