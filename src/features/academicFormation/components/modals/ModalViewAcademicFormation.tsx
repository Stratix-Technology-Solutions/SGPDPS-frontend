import { useState } from 'react'
import { Modal } from '../../../../shared/components/Modal'
import { useAcademicFormation } from '../../hooks/useAcademicFormation'
import { AcademicFormationDetail } from '../AcademicFormationDetail'
import { AcademicFormationList } from '../AcademicFormationList'
import type { AcademicFormationResponse } from '../../dtos/academicFormation.interface'

interface Props {
  onClose: () => void
}

export const ModalViewAcademicFormation = ({ onClose }: Props) => {
  const { data, isLoading } = useAcademicFormation()
  const [selected, setSelected] = useState<AcademicFormationResponse | null>(null)

  if (!selected) {
    return (
      <Modal
        title="Selecciona una formación para ver sus detalles"
        onClose={onClose}
      >
        <AcademicFormationList
          data={data?.data}
          isLoading={isLoading}
          onSelect={setSelected}
          itemClassName="hover:border-primary hover:bg-neutral-50"
        />
      </Modal>
    )
  }

  return (
    <Modal
      title="Detalle de formación académica"
      onClose={onClose}
    >
      <AcademicFormationDetail
        item={selected}
        onBack={() => setSelected(null)}
      />
    </Modal>
  )
}
