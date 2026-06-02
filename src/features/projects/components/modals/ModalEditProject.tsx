import { Modal, ModalBody, ModalFooter, ModalHeader } from '../../../../shared/components/modalBase'
import { FormProjectEdit } from '../form/FormProjectEdit'
import { useGetProjects, useUpdateProject } from '../../hooks/useProjects'
import type { ProjectUpdateDto } from '../../dtos/project.dto'
import { BannerMessageError } from '../../../../shared/components/BannerMessageError'
import { useState } from 'react'
import type { Project } from '../../interfaces/project.interface'
import { ListProjectsSelection } from '../ListProjectsSelection'

interface Props {
  isOpen: boolean
  onClose: () => void
}

export const ModalEditProject = ({ isOpen, onClose }: Props) => {
  const [selected, setSelected] = useState<Project | null>(null)
  const { data, isLoading } = useGetProjects()
  const update = useUpdateProject()

  const handleSubmit = (values: ProjectUpdateDto) => {
    const payload: ProjectUpdateDto = {
      description: values.description,
      status: values.status,
      links: values.links,
      skill_ids: values.skill_ids,
      roles_ids: values.roles_ids,
    }

    if (selected) {
      update.mutate({ id: selected.id, dto: payload }, {
        onSuccess: () => {
          onClose()
        }
      })
    }
  }

  const initialValues: ProjectUpdateDto = {
    description: selected?.description ?? '',
    status: selected?.status ?? 'En curso',
    links: selected?.links.map((link) => ({
      id: link.id,
      url: link.url,
    })) ?? [],
    skill_ids: selected?.skills.map((skill) => skill.id) ?? [],
    roles_ids: selected?.roles.map((role) => role.id) ?? [],
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader
        title={!selected ? 'Selecciona un proyecto para editar' : 'Editar proyecto personal'}
        subtitle={!selected
          ? undefined
          : 'Actualiza roles, tecnologías, enlaces y descripción del proyecto.'
        }
        variant={!selected ? 'close-only' : 'back-close'}
        onBack={() => setSelected(null)}
      />

      <ModalBody>
        <div className="flex flex-col gap-4 py-2">
          {!selected ? (
            <ListProjectsSelection
              projects={data?.data}
              isLoading={isLoading}
              onSelect={setSelected}
              hoverColor="primary"
            />
          ) : (
            <>
              {update.isError && (
                <BannerMessageError
                  message={update.error?.response?.data?.message ?? 'Error al actualizar el proyecto'}
                />
              )}

              <FormProjectEdit
                formId="project-form-update"
                submit={handleSubmit}
                defaultValues={initialValues}
                title={selected?.title}
              />
            </>
          )}
        </div>
      </ModalBody>

      <ModalFooter
        formId="project-form-update"
        variant={!selected ? 'close-only' : 'confirm-cancel'}
        disabled={update.isPending}
        loading={update.isPending}
      />
    </Modal>
  )
}
