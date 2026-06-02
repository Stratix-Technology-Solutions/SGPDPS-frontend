import { useState } from 'react'
import { useAcademic } from '../../hooks/useAcademic'
import { AcademicList } from '../AcademicList'
import type { AcademicExperienceResponse } from '../../dtos/academic.interface'
import { Modal, ModalBody, ModalFooter, ModalHeader } from '../../../../shared/components/modalBase'

interface Props {
  isOpen: boolean
  onClose: () => void
}

export const ModalDeleteAcademic = ({ isOpen, onClose }: Props) => {
  const { data, isLoading, remove } = useAcademic()
  const [selected, setSelected] = useState<AcademicExperienceResponse | null>(null)

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader
        title={selected
          ? '¿Eliminar experiencia académica?'
          : 'Selecciona una experiencia para eliminar'
        }
        variant={!selected ? 'close-only' : 'back-close'}
        onBack={() => setSelected(null)}
        intent={!selected ? 'default' : 'danger'}
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
            <p className="text-neutral-medium/70">
              ¿Estás seguro de que deseas eliminar <span className="font-semibold text-background-dark">"{selected.title}"</span> de {selected.institution}? Esta acción no se puede deshacer.
            </p>
          )}
        </div>
      </ModalBody>

      <ModalFooter
        variant={!selected ? 'close-only' : 'delete-cancel'}
        disabled={remove.isPending}
        loading={remove.isPending}
        onConfirm={() => {
          if (!selected) return
          remove.mutate(selected.id, {
            onSuccess: () => {
              setSelected(null)
            }
          })
        }}
      />
    </Modal>
  )
}
