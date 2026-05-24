import { useState } from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader } from '../../../../shared/components/modal'
import { BannerMessageError } from '../../../../shared/components/BannerMessageError'
import { useAcademicFormation } from '../../hooks/useAcademicFormation'
import { AcademicFormationList } from '../AcademicFormationList'
import { ConfirmDeleteAcademicFormation } from '../ConfirmDeleteAcademicFormation'
import type { AcademicFormationResponse } from '../../dtos/academicFormation.interface'

interface Props {
  isOpen: boolean
  onClose: () => void
}

export const ModalDeleteAcademicFormation = ({ isOpen, onClose }: Props) => {
  const { data, isLoading, remove } = useAcademicFormation()
  const [selected, setSelected] = useState<AcademicFormationResponse | null>(null)

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader
        title={selected ? '¿Eliminar formación académica?' : 'Selecciona una formación para eliminar'}
        subtitle={selected ? undefined : 'Elige la formación académica que deseas eliminar.'}
        variant={!selected ? 'close-only' : 'back-close'}
        onBack={() => setSelected(null)}
        intent={!selected ? 'default' : 'danger'}
      />

      <ModalBody>
        <div className="flex flex-col gap-4 py-2">
          {!selected ? (
            <AcademicFormationList
              data={data?.data}
              isLoading={isLoading}
              onSelect={setSelected}
              itemClassName="hover:border-red-400 hover:bg-red-50"
            />
          ) : (
            <>
              {remove.isError && (
                <BannerMessageError
                  message={remove.error?.response?.data?.message ?? 'Ocurrió un error al eliminar la formación académica'}
                />
              )}

              <ConfirmDeleteAcademicFormation
                item={selected}
              />
            </>
          )}
        </div>
      </ModalBody>

      <ModalFooter
        variant={!selected ? 'close-only' : 'delete-cancel'}
        disabled={remove.isPending}
        loading={remove.isPending}
        onConfirm={() => {
          if (selected) {
            remove.mutate(selected.id, {
              onSuccess: () => {
                setSelected(null)
              }
            })
          }
        }}
      />
    </Modal>
  )
}
