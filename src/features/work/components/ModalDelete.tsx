import { useState } from 'react'
import { Modal } from '../components/Modal'
import { WorkExperienceList } from '../components/WorkExperienceList'
import { ConfirmDeleteWorkExperience } from '../components/ConfirmDeleteWorkExperience'
import { useWorkExperiences } from '../hooks/useWorkExperiences'
import { useDeleteWorkExperience } from '../hooks/useDeleteWorkExperience'
import type { WorkExperience } from '../dtos/workExperience'

interface Props {
  onClose: () => void
}

export const ModalDelete = ({ onClose }: Props) => {
  const [selected, setSelected] = useState<WorkExperience | null>(null)

  const { data, isLoading } = useWorkExperiences()
  const { mutateAsync: remove, isPending } = useDeleteWorkExperience({
    onClose,
  })

  const handleConfirm = async () => {
    if (!selected) return
    await remove(selected.id)
  }

  return (
    <Modal
      title={
        selected ? 'Confirmar eliminación' : 'Eliminar Experiencia Laboral'
      }
      description={
        selected ? 'Confirma que deseas eliminar esta experiencia.' : ''
      }
      onClose={onClose}
    >
      {!selected && (
        <WorkExperienceList
          data={data}
          isLoading={isLoading}
          onSelect={setSelected}
        />
      )}

      {selected && (
        <ConfirmDeleteWorkExperience
          company={selected.company}
          position={selected.position}
          isPending={isPending}
          onConfirm={handleConfirm}
          onCancel={() => setSelected(null)}
        />
      )}
    </Modal>
  )
}
