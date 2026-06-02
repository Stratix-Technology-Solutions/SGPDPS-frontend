import { useState } from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader } from '../../../shared/components/modalBase'
import { WorkExperienceList } from '../components/WorkExperienceList'
import { useWorkExperiences } from '../hooks/useWorkExperiences'
import { useDeleteWorkExperience } from '../hooks/useDeleteWorkExperience'
import type { WorkExperience } from '../dtos/workExperience'

interface Props {
  isOpen: boolean
  onClose: () => void
}

export const ModalDelete = ({ isOpen, onClose }: Props) => {
  const [selected, setSelected] = useState<WorkExperience | null>(null)
  const { data, isLoading } = useWorkExperiences()
  const { mutateAsync: remove, isPending } = useDeleteWorkExperience()

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader
        title={selected
          ? 'Confirmar eliminación'
          : 'Eliminar Experiencia Laboral'
        }
        subtitle={selected 
          ? 'Confirma que deseas eliminar esta experiencia.'
          : ''
        }
        variant={!selected ? 'close-only' : 'back-close'}
        onBack={() => setSelected(null)}
        intent={!selected ? 'default' : 'danger'}
      />

      <ModalBody>
        <div className="py-2">
          {!selected ? (
            <WorkExperienceList
              data={data}
              isLoading={isLoading}
              onSelect={setSelected}
            />
          ) : (
            <p className="text-neutral-medium/70">
              ¿Estás seguro de que deseas eliminar el cargo{' '}
              <span className="font-semibold text-background-dark">"{selected.position}"</span>{' '}
              ? Esta acción no se puede deshacer.
            </p>
            )}
        </div>
      </ModalBody>

      <ModalFooter
        variant={!selected ? 'close-only' : 'delete-cancel'}
        disabled={isPending}
        loading={isPending}
        onConfirm={() => {
          if (!selected) return
          remove(selected.id, {
            onSuccess: () => {
              setSelected(null)
            }
          })
        }}
      />
    </Modal>
  )
}
