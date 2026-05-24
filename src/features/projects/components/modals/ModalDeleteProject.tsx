import { useState } from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader } from '../../../../shared/components/modal'
import { BannerMessageError } from '../../../../shared/components/BannerMessageError'
import type { Project } from '../../interfaces/project.interface'
import { useDeleteProject, useGetProjects } from '../../hooks/useProjects'
import { ListProjectsSelection } from '../ListProjectsSelection'
import { ProjectDetail } from '../ProjectDetail'

interface Props {
  isOpen: boolean
  onClose: () => void
}

export const ModalDeleteProject = ({ isOpen, onClose }: Props) => {
  const { data, isLoading } = useGetProjects()
  const [selected, setSelected] = useState<Project | null>(null)
  const remove = useDeleteProject()

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader
        title={selected ? '¿Eliminar proyecto?' : 'Selecciona un proyecto para eliminar'}
        subtitle={selected
          ? '¿Estas seguro que deseas eliminar este proyecto? Esta acción no se puede deshacer.'
          : 'Elige el proyecto que deseas eliminar.'}
        variant={!selected ? 'close-only' : 'back-close'}
        onBack={() => setSelected(null)}
        intent={!selected ? 'default' : 'danger'}
      />

      <ModalBody>
        <div className="flex flex-col gap-4 py-2">
          {!selected ? (
            <ListProjectsSelection
              projects={data?.data}
              isLoading={isLoading}
              onSelect={setSelected}
              hoverColor="red"
            />
          ) : (
            <>
              {remove.isError && (
                <BannerMessageError
                  message={remove.error?.response?.data?.message ?? 'Ocurrió un error al eliminar el proyecto'}
                />
              )}

              <ProjectDetail project={selected} />
            </>
          )}
        </div>
      </ModalBody>

      <ModalFooter
        variant={!selected ? 'close-only' : 'delete-cancel'}
        disabled={remove.isPending}
        loading={remove.isPending}
        onConfirm={() => {
          if (selected) {
            remove.mutate(selected.id, {
              onSuccess: () => {
                setSelected(null)
              }
            })
          }
        }}
      />
    </Modal>
  )
}
