import { Modal } from '../../../../shared/components/Modal'
import { FormProject } from '../form/FormProject'
import { useProjects } from '../../hooks/useProjects'
import type { ProjectDto } from '../../dtos/project.dto'
import type { Project } from '../../dtos/project.interface'

interface Props {
  isOpen: boolean
  onClose: () => void
  project: Project
}

export const ModalEditProject = ({ isOpen, onClose, project }: Props) => {
  const { update } = useProjects()

  const handleSubmit = (values: ProjectDto) => {
    update.mutate({ id: project.id, dto: values }, {
      onSuccess: () => {
        onClose();
      }
    })
  }

  const serverError = update.isError && update.error ? update.error.response?.data.message || 'Error al actualizar el proyecto' : undefined

  const initialValues: Partial<ProjectDto> = {
    title: project.title,
    description: project.description,
    role: project.role,
    technologies: project.technologies,
    url: project.url || '',
    start_date: project.start_date,
    end_date: project.end_date || '',
    status: project.status,
  }

  if (!isOpen) return null;

  return (
    <Modal onClose={onClose} title="Editar proyecto de software">
      <div className="p-4 md:p-6 lg:px-8 bg-white max-h-[85vh] overflow-y-auto customized-scrollbar">
        <p className="text-sm text-neutral-medium mb-6">
          Modifica los detalles de tu proyecto para mantener tu portafolio actualizado.
        </p>
        <FormProject
          onCancel={onClose}
          onSubmit={handleSubmit}
          submitLabel="Guardar cambios"
          defaultValues={initialValues}
          isPending={update.isPending}
          serverError={serverError}
        />
      </div>
    </Modal>
  )
}
