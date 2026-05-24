import { useState } from 'react'
import { useAcademic } from '../../hooks/useAcademic'
import { AcademicDetail } from '../AcademicDetail'
import { AcademicList } from '../AcademicList'
import type { AcademicExperienceResponse } from '../../dtos/academic.interface'
import { Modal, ModalBody, ModalFooter, ModalHeader } from '../../../../shared/components/modal'

interface Props {
  isOpen: boolean
  onClose: () => void
}

export const ModalViewAcademic = ({ isOpen, onClose }: Props) => {
  const { data, isLoading } = useAcademic()
  const [selected, setSelected] = useState<AcademicExperienceResponse | null>(null)

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader
        title={selected
          ? 'Detalle de experiencia académica'
          : 'Experiencias académicas'
        }
        subtitle={selected
          ? 'Información detallada de la experiencia seleccionada.'
          : 'Selecciona una experiencia para ver sus detalles.'
        }
        variant={!selected ? 'close-only' : 'back-close'}
        onBack={() => setSelected(null)}
      />

      <ModalBody>
        <div className="py-2">
          {!selected ? (
            <AcademicList
              data={data?.data}
              isLoading={isLoading}
              onSelect={setSelected}
              itemClassName="hover:border-gray-500 hover:bg-gray-50"
            />
          ) : (
            <AcademicDetail
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
