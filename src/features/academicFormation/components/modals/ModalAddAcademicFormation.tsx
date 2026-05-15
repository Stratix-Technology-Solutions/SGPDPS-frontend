import { Modal } from '../../../../shared/components/Modal'
import { FormAcademicFormation } from '../form/FormAcademicFormation'
import type { AcademicFormationDto } from '../../dtos/academicFormation.dto'

interface Props {
  onClose: () => void
}

export const ModalAddAcademicFormation = ({ onClose }: Props) => {
  const handleSubmit = (values: AcademicFormationDto) => {
    console.log('Formacion academica registrada', values)
    onClose()
  }

  return (
    <Modal
      title="Agregar formacion academica"
      description="Registra estudios formales como primaria, secundaria, bachillerato, tecnico, universidad o posgrado."
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
