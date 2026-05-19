import { useState } from 'react'
import { Modal } from '../../../../shared/components/Modal'
import { BannerMessageError } from '../../../../shared/components/BannerMessageError'
import { useAcademicFormation } from '../../hooks/useAcademicFormation'
import { AcademicFormationList } from '../AcademicFormationList'
import { ConfirmDeleteAcademicFormation } from '../ConfirmDeleteAcademicFormation'
import type { AcademicFormationResponse } from '../../dtos/academicFormation.interface'

interface Props {
  onClose: () => void
}

export const ModalDeleteAcademicFormation = ({ onClose }: Props) => {
  const { data, isLoading, remove } = useAcademicFormation()
  const [selected, setSelected] = useState<AcademicFormationResponse | null>(null)

  return (
    <Modal
      title={selected ? '¿Eliminar formación académica?' : 'Selecciona una formación para eliminar'}
      description={selected ? undefined : 'Elige la formación académica que deseas eliminar.'}
      onClose={onClose}
    >
      {remove.isError && (
        <BannerMessageError
          message={remove.error?.response?.data?.message ?? 'Ocurrió un error al eliminar la formación académica'}
        />
      )}

      {!selected && (
        <AcademicFormationList
          data={data?.data}
          isLoading={isLoading}
          onSelect={setSelected}
          itemClassName="hover:border-red-400 hover:bg-red-50"
        />
      )}

      {selected && (
        <ConfirmDeleteAcademicFormation
          item={selected}
          isPending={remove.isPending}
          onConfirm={() => remove.mutate(selected.id, { onSuccess: onClose })}
          onCancel={() => setSelected(null)}
        />
      )}
    </Modal>
  )
}
