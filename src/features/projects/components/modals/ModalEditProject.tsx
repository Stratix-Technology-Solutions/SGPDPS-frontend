import { Modal } from '../../../../shared/components/Modal'
import { FormProjectEdit } from '../form/FormProjectEdit'
import { useUpdateProject } from '../../hooks/useProjects'
import type { ProjectUpdateDto } from '../../dtos/project.dto'
import type { Project } from '../../interfaces/project.interface'

interface Props {
  isOpen: boolean
  onClose: () => void
  project: Project
}

export const ModalEditProject = ({ isOpen, onClose, project }: Props) => {
  const update = useUpdateProject()

  const handleSubmit = (values: ProjectUpdateDto) => {
    update.mutate({ id: project.id, dto: values }, {
      onSuccess: () => {
        onClose()
      }
    })
  }

  const serverError = update.isError && update.error ? update.error.response?.data.message || 'Error al actualizar el proyecto' : undefined

  const initialValues: Partial<ProjectUpdateDto> = {
    title: project.title,
    description: project.description,
    start_date: project.start_date,
    end_date: project.end_date || '',
    links: project.links.map((link) => ({
      id: link.id,
      url: link.url,
    })),
  }

  if (!isOpen) return null

  return (
    <Modal onClose={onClose} title="Editar proyecto de software">
      <div className="p-4 md:p-6 lg:px-8 bg-white max-h-[85vh] overflow-y-auto customized-scrollbar">
        <p className="text-sm text-neutral-medium mb-6">
          Modifica los detalles de tu proyecto para mantener tu portafolio actualizado.
        </p>
        <FormProjectEdit
          onCancel={onClose}
          onSubmit={handleSubmit}
          submitLabel="Guardar cambios"
          defaultValues={initialValues}
          skills={project.skills}
          isPending={update.isPending}
          serverError={serverError}
        />
      </div>
    </Modal>
  )
}
