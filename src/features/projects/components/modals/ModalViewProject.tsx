import { useState } from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader } from '../../../../shared/components/modalBase'
import { ListProjectsSelection } from '../ListProjectsSelection'
import { useGetProjects } from '../../hooks/useProjects'
import type { Project } from '../../interfaces/project.interface'
import { ProjectDetail } from '../ProjectDetail'

interface Props {
  isOpen: boolean
  onClose: () => void
}

export const ModalViewProject = ({ isOpen, onClose }: Props) => {
  const { data: projects, isLoading } = useGetProjects()
  const [selected, setSelected] = useState<Project | null>(null)

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader
        title={selected
          ? 'Detalle del proyecto'
          : 'Selecciona un proyecto para ver sus detalles'
        }
        variant={!selected ? 'close-only' : 'back-close'}
        onBack={() => setSelected(null)}
      />

      <ModalBody>
        <div className="py-2">
          {!selected ? (
            <ListProjectsSelection
              projects={projects?.data}
              isLoading={isLoading}
              onSelect={setSelected}
              hoverColor="primary"
            />
          ) : (
            <ProjectDetail project={selected} />
          )}
        </div>
      </ModalBody>

      <ModalFooter
        variant="close-only"
        cancelText={selected ? 'Volver atrás' : 'Cerrar'}
        onCancel={selected ? () => {setSelected(null)} : onClose}
      />
    </Modal>
  )
}
