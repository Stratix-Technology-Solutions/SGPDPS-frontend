import { Modal } from '../../../../shared/components/Modal'
import { FormAcademicFormation } from '../form/FormAcademicFormation'
import type { AcademicFormationDto } from '../../dtos/academicFormation.dto'

interface Props {
  onClose: () => void
}

export const ModalAddAcademicFormation = ({ onClose }: Props) => {
  const handleSubmit = (values: AcademicFormationDto) => {
    console.log('Formación académica registrada', values)
    onClose()
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
      />
    </Modal>
  )
}
