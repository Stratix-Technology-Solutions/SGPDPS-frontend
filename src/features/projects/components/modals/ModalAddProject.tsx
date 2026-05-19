import { Modal } from '../../../../shared/components/Modal'
import { FormProject } from '../form/FormProject'
import { useCreateProject } from '../../hooks/useProjects'
import type { ProjectCreateDto } from '../../dtos/project.dto'
import { BannerMessageError } from '../../../../shared/components/BannerMessageError'

interface Props {
  isOpen: boolean
  onClose: () => void
}

export const ModalAddProject = ({ isOpen, onClose }: Props) => {
  const { mutate: create, isPending, isError, error } = useCreateProject({ onClose })

  const handleSubmit = (values: ProjectCreateDto) => {
    create(values)
  }

  if (!isOpen) return null

  return (
    <Modal
      onClose={onClose}
      title="Registrar proyecto personal"
      description="Registra los datos principales, roles y tecnologías para mostrar el proyecto en tu portafolio."
    >
      {isError && (
        <BannerMessageError
          message={error.response?.data?.message
            || 'Surgió un error durante el registro del proyecto'
          }
        />
      )}
      <FormProject
        onCancel={onClose}
        onSubmit={handleSubmit}
        submitLabel="Guardar"
        isPending={isPending}
      />
    </Modal>
  )
}
