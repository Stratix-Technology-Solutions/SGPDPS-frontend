import { Modal } from '../components/Modal'
import { useCreateWorkExperience } from '../hooks/useCreateWorkExperience'
import { WorkExperienceForm } from '../components/WorkExperienceForm'

interface Props {
  onClose: () => void
}

export const ModalCreate = ({ onClose }: Props) => {
  const {
    mutate: create,
    error,
    isPending,
    isError,
  } = useCreateWorkExperience({ onClose })

  return (
    <Modal
      title="Agregar Experiencia Laboral"
      description="Ingresa los datos del trabajo que deseas agregar a tu portafolio profesional."
      onClose={onClose}
    >
      <WorkExperienceForm
        onSubmit={create}
        onCancel={onClose}
        isPending={isPending}
        isError={isError}
        errorMessage={error?.response?.data?.message}
      />
    </Modal>
  )
}
