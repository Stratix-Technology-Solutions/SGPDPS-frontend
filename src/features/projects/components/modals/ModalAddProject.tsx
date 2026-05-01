import { Modal } from '../../../../shared/components/Modal'
import { FormProject } from '../form/FormProject'
import { useProjects } from '../../hooks/useProjects'
import type { ProjectDto } from '../../dtos/project.dto'

interface Props {
  isOpen: boolean
  onClose: () => void
}

export const ModalAddProject = ({ isOpen, onClose }: Props) => {
  const { create } = useProjects()

  const handleSubmit = (values: ProjectDto) => {
    create.mutate(values, {
      onSuccess: () => {
        onClose();
      }
    })
  }

  const serverError = create.isError && create.error ? create.error.response?.data.message || 'Error al guardar el proyecto' : undefined

  if (!isOpen) return null;

  return (
    <Modal onClose={onClose} title="Agregar proyecto de software">
      <div className="p-4 md:p-6 lg:px-8 bg-white max-h-[85vh] overflow-y-auto customized-scrollbar">
        <p className="text-sm text-neutral-medium mb-6">
          Registra los datos principales de tu participación para mostrar tu experiencia y aportes en el portafolio.
        </p>
        <FormProject
          onCancel={onClose}
          onSubmit={handleSubmit}
          submitLabel="Guardar"
          isPending={create.isPending}
          serverError={serverError}
        />
      </div>
    </Modal>
  )
}
