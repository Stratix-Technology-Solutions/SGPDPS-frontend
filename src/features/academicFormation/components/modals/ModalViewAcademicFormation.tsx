import { useState } from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader } from '../../../../shared/components/modalBase'
import { useAcademicFormation } from '../../hooks/useAcademicFormation'
import { AcademicFormationDetail } from '../AcademicFormationDetail'
import { AcademicFormationList } from '../AcademicFormationList'
import type { AcademicFormationResponse } from '../../dtos/academicFormation.interface'

interface Props {
  isOpen: boolean
  onClose: () => void
}

export const ModalViewAcademicFormation = ({ isOpen, onClose }: Props) => {
  const { data, isLoading } = useAcademicFormation()
  const [selected, setSelected] = useState<AcademicFormationResponse | null>(null)

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader
        title={selected
          ? 'Detalle de formación académica'
          : 'Selecciona una formación para ver sus detalles'
        }
        variant={!selected ? 'close-only' : 'back-close'}
        onBack={() => setSelected(null)}
      />

      <ModalBody>
        <div className="py-2">
          {!selected ? (
            <AcademicFormationList
              data={data?.data}
              isLoading={isLoading}
              onSelect={setSelected}
              itemClassName="hover:border-primary hover:bg-neutral-50"
            />
          ) : (
            <AcademicFormationDetail
              item={selected}
            />
          )}
        </div>
      </ModalBody>

      <ModalFooter
        variant="close-only"
        cancelText={selected ? 'Volver atrás' : 'Cerrar'}
        onCancel={selected ? () => {setSelected(null)} : onClose}
      />
    </Modal>
  )
}
