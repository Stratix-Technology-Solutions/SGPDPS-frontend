import { Modal } from '../../../../shared/components/Modal'
import { FormProjectEdit } from '../form/FormProjectEdit'
import { useGetProject, useUpdateProject } from '../../hooks/useProjects'
import type { ProjectUpdateDto } from '../../dtos/project.dto'

interface Props {
  isOpen: boolean
  onClose: () => void
  idProject: string
}

export const ModalEditProject = ({ isOpen, onClose, idProject }: Props) => {
  const update = useUpdateProject()

  const { data } = useGetProject(idProject)

  const project = data?.data

  const handleSubmit = (values: ProjectUpdateDto) => {
    const payload: ProjectUpdateDto = {
      description: values.description,
      links: values.links,
      skill_ids: values.skill_ids,
      roles_ids: values.roles_ids,
    }

    update.mutate({ id: idProject, dto: payload }, {
      onSuccess: () => {
        onClose()
      }
    })
  }

  const serverError = update.isError && update.error ? update.error.response?.data.message || 'Error al actualizar el proyecto' : undefined

  const initialValues: Partial<ProjectUpdateDto> = {
    description: project?.description,
    links: project?.links.map((link) => ({
      id: link.id,
      url: link.url,
    })),
    skill_ids: project?.skills.map((skill) => skill.id),
    roles_ids: project?.roles.map((role) => role.id),
  }

  if (!isOpen) return null

  return (
    <Modal onClose={onClose} title="Editar proyecto personal">
      <div>
        <p className="text-sm text-neutral-medium mb-6">
          Actualiza roles, tecnologías, enlaces y descripción del proyecto.
        </p>
        <FormProjectEdit
          onCancel={onClose}
          onSubmit={handleSubmit}
          submitLabel="Guardar"
          defaultValues={initialValues}
          title={project?.title}
          isPending={update.isPending}
          serverError={serverError}
        />
      </div>
    </Modal>
  )
}
