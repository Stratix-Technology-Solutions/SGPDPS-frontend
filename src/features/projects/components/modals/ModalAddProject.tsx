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
      title="Agregar proyecto de software"
      description="Registra los datos principales de tu participacion para mostrar tu experiencia y aportes en el portafolio."
    >
      {isError && (
        <BannerMessageError
          message={error.response?.data?.message
            || 'Surgió un error durante el registro de la habilidad blanda'
          }
        />
      )}
      <div className="p-4 md:p-6 lg:px-8 bg-white max-h-[85vh] overflow-y-auto customized-scrollbar">
        <FormProject
          onCancel={onClose}
          onSubmit={handleSubmit}
          submitLabel="Guardar"
          isPending={isPending}
        />
      </div>
    </Modal>
  )
}
