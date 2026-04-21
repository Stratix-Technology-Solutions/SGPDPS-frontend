import { useState } from 'react'
import { useAcademic } from '../../hooks/useAcademic'
import { AcademicDetail } from '../AcademicDetail'
import { AcademicList } from '../AcademicList'
import type { AcademicExperienceResponse } from '../../dtos/academic.interface'
import { Modal } from '../../../../shared/components/Modal'

interface Props {
  onClose: () => void
}

export const ModalViewAcademic = ({ onClose }: Props) => {
  const { data, isLoading } = useAcademic()
  const [selected, setSelected] = useState<AcademicExperienceResponse | null>(null)

  return (
    <>
      {selected ? (
        <Modal
          title="Detalle de experiencia"
          onClose={onClose}
        >
          <AcademicDetail
            item={selected}
            onBack={() => setSelected(null)}
          />
        </Modal>
      ) : (
        <Modal
          title="Selecciona una experiencia para ver sus detalles"
          onClose={onClose}
        >
          <AcademicList
            data={data?.data}
            isLoading={isLoading}
            onSelect={setSelected}
            itemClassName="hover:border-gray-500 hover:bg-gray-50"
          />
        </Modal>
      )}
    </>
  )
}
