import { useState } from 'react'
import { useAcademic } from '../../hooks/useAcademic'
import { AcademicList } from '../AcademicList'
import { ConfirmDeleteAcademic } from '../ConfirmDeleteAcademic'
import type { AcademicExperienceResponse } from '../../dtos/academic.interface'
import { Modal } from '../../../../shared/components/Modal'

interface Props {
  onClose: () => void
}

export const ModalDeleteAcademic = ({ onClose }: Props) => {
  const { data, isLoading, remove } = useAcademic()
  const [selected, setSelected] = useState<AcademicExperienceResponse | null>(null)

  return (
    <>
      {selected ? (
        <Modal
          title="¿Eliminar experiencia académica?"
          onClose={onClose}
        >
          <ConfirmDeleteAcademic
            title={selected.title}
            institution={selected.institution}
            isPending={remove.isPending}
            onConfirm={() => remove.mutate(selected.id, { onSuccess: onClose })}
            onCancel={() => setSelected(null)}
          />
        </Modal>
      ) : (
        <Modal
          title="Selecciona una experiencia para eliminar"
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
