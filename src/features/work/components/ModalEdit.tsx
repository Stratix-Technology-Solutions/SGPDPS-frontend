import { useState } from 'react'
import { Modal } from '../../../shared/components/Modal'
import { WorkExperienceList } from '../components/WorkExperienceList'
import { WorkExperienceForm } from '../components/WorkExperienceForm'
import { useWorkExperiences } from '../hooks/useWorkExperiences'
import { useUpdateWorkExperience } from '../hooks/useUpdateWorkExperience'
import type { WorkExperience } from '../dtos/workExperience'

interface Props {
  onClose: () => void
}

export const ModalEdit = ({ onClose }: Props) => {
  const [selected, setSelected] = useState<WorkExperience | null>(null)

  const { data, isLoading } = useWorkExperiences()
  const {
    mutate: update,
    error,
    isPending,
    isError,
  } = useUpdateWorkExperience({ onClose })

  return (
    <Modal
      title={
        selected
          ? 'Editar Experiencia Laboral'
          : 'Seleccionar Experiencia Laboral'
      }
      description={
        selected
          ? 'Modifica los datos de la experiencia seleccionada.'
          : 'Selecciona la experiencia laboral que deseas editar.'
      }
      onClose={onClose}
    >
      {!selected && (
        <WorkExperienceList
          data={data}
          isLoading={isLoading}
          onSelect={setSelected}
          itemClassName="hover:border-primary hover:bg-neutral-50"
        />
      )}

      {selected && (
        <WorkExperienceForm
          initialValues={{
            company: selected.company,
            position: selected.position,
            description: selected.description,
            start_date: selected.start_date,
            end_date: selected.end_date,
            is_visible: selected.is_visible,
          }}
          onSubmit={(value) => update({ id: selected.id, data: value })}
          onCancel={onClose}
          isPending={isPending}
          isError={isError}
          errorMessage={error?.response?.data?.message}
        />
      )}
    </Modal>
  )
}
