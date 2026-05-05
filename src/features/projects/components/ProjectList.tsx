import { useState } from 'react'
import { FiEdit2, FiEye, FiPlusCircle, FiTrash2 } from 'react-icons/fi'
import { ActionButton } from '../../../shared/components/ActionButton'
import { Modal } from '../../../shared/components/Modal'
import { SectionTitle } from '../../../shared/components/SectionTitle'
import { ModalAddProject } from './modals/ModalAddProject'
import { ModalEditProject } from './modals/ModalEditProject'
import { ConfirmDeleteProject } from './ConfirmDeleteProject'
import type { ProjectIdTitle } from '../interfaces/project.interface'
import { ModalAddProjectAsset } from './modals/ModalAddProjectAsset'
import { ModalDeleteProjectAsset } from './modals/ModalDeleteProjectAsset'
import { useGetProject } from '../hooks/useProjectAssets'
import { ProjectSelectionModal } from './ProjectSelectionModal'
import { ProjectDetail } from './ProjectDetail'

type ModalType = 'add' | 'edit' | 'delete' | 'view' | 'add-evidence' | 'delete-evidence' | null

export const ProjectList = () => {
  const { data: projects, isLoading: projectsLoading } = useGetProject()
  const [modal, setModal] = useState<ModalType>(null)
  const [selectedProject, setSelectedProject] = useState<ProjectIdTitle | null>(null)

  const closeModal = () => {
    setModal(null)
    setSelectedProject(null)
  }

  return (
    <section className="py-10 flex flex-col gap-6">
      <SectionTitle
        title="Proyectos de Software"
        description="Gestiona los proyectos en los que participaste para mostrarlos en tu portafolio."
      />

      <div className="bg-white rounded-2xl shadow-sm border border-neutral-light p-8 flex gap-6 justify-center flex-wrap">
        <ActionButton icon={FiPlusCircle} label="Crear proyecto de software" onClick={() => setModal('add')} />
        <ActionButton icon={FiEdit2} label="Editar proyecto de software" onClick={() => setModal('edit')} />
        <ActionButton icon={FiTrash2} label="Eliminar proyecto de software" onClick={() => setModal('delete')} />
        <ActionButton icon={FiEye} label="Visualizar proyectos de software" onClick={() => setModal('view')} />
      </div>

      <SectionTitle
        title="Evidencia Digital"
        description="Gestiona la evidencia de tus proyectos, pueden ser imagenes o pdf."
      />

      <div className="bg-white rounded-2xl shadow-sm border border-neutral-light p-8 flex gap-6 justify-center flex-wrap">
        <ActionButton icon={FiPlusCircle} label="Subir evidencia digital" onClick={() => setModal('add-evidence')} />
        <ActionButton icon={FiTrash2} label="Eliminar evidencia digital" onClick={() => setModal('delete-evidence')} />
      </div>

      <ModalAddProject isOpen={modal === 'add'} onClose={closeModal} />

      {modal === 'edit' && !selectedProject && (
        <ProjectSelectionModal
          title="Selecciona un proyecto para editar"
          onClose={closeModal}
          projects={projects?.data}
          isLoading={projectsLoading}
          onSelect={setSelectedProject}
          hoverColor="primary"
        />
      )}

      {modal === 'delete' && !selectedProject && (
        <ProjectSelectionModal
          title="Selecciona un proyecto para eliminar"
          onClose={closeModal}
          projects={projects?.data}
          isLoading={projectsLoading}
          onSelect={setSelectedProject}
          hoverColor="red"
        />
      )}

      {modal === 'view' && !selectedProject && (
        <ProjectSelectionModal
          title="Selecciona un proyecto para ver sus detalles"
          onClose={closeModal}
          projects={projects?.data}
          isLoading={projectsLoading}
          onSelect={setSelectedProject}
          hoverColor="primary"
        />
      )}

      {
        modal === 'add-evidence' && (<ModalAddProjectAsset onClose={() => setModal(null)} />)
      }

      {
        modal === 'delete-evidence' && (<ModalDeleteProjectAsset onClose={() => setModal(null)} />)
      }

      {selectedProject && modal === 'edit' && (
        <ModalEditProject
          isOpen
          onClose={closeModal}
          idProject={selectedProject.id}
        />
      )}

      {selectedProject && modal === 'delete' && (
        <ConfirmDeleteProject
          isOpen
          onClose={closeModal}
          idProject={selectedProject.id}
        />
      )}

      {selectedProject && modal === 'view' && (
        <Modal title="Detalle del proyecto" onClose={closeModal}>
          <ProjectDetail
            idProject={selectedProject.id}
          />
        </Modal>
      )}
    </section>
  )
}

