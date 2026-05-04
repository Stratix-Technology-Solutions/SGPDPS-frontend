import { useState } from 'react'
import { FiEdit2, FiEye, FiPlusCircle, FiTrash2 } from 'react-icons/fi'
import { ActionButton } from '../../../shared/components/ActionButton'
import { Modal } from '../../../shared/components/Modal'
import { SectionTitle } from '../../../shared/components/SectionTitle'
import { useProjects } from '../hooks/useProjects'
import { ModalAddProject } from './modals/ModalAddProject'
import { ModalEditProject } from './modals/ModalEditProject'
import { ConfirmDeleteProject } from './ConfirmDeleteProject'
import type { Project } from '../dtos/project.interface'
import { ModalAddProjectAsset } from './modals/ModalAddProjectAsset'
import { ModalDeleteProjectAsset } from './modals/ModalDelteProjectAsset'

type ModalType = 'add' | 'edit' | 'delete' | 'view' | 'add-evidence' | 'delete-evidence' | null

export const ProjectList = () => {
  const { data, isLoading } = useProjects()
  const [modal, setModal] = useState<ModalType>(null)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const closeModal = () => {
    setModal(null)
    setSelectedProject(null)
  }

  const handleEdit = (project: Project) => {
    setSelectedProject(project)
    setModal('edit')
  }

  const handleDelete = (project: Project) => {
    setSelectedProject(project)
    setModal('delete')
  }

  const handleView = (project: Project) => {
    setSelectedProject(project)
    setModal('view')
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
          data={data?.data}
          isLoading={isLoading}
          onClose={closeModal}
          onSelect={handleEdit}
        />
      )}

      {modal === 'delete' && !selectedProject && (
        <ProjectSelectionModal
          title="Selecciona un proyecto para eliminar"
          data={data?.data}
          isLoading={isLoading}
          onClose={closeModal}
          onSelect={handleDelete}
        />
      )}

      {modal === 'view' && !selectedProject && (
        <ProjectSelectionModal
          title="Selecciona un proyecto para ver sus detalles"
          data={data?.data}
          isLoading={isLoading}
          onClose={closeModal}
          onSelect={handleView}
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
          project={selectedProject}
        />
      )}

      {selectedProject && modal === 'delete' && (
        <ConfirmDeleteProject
          isOpen
          onClose={closeModal}
          projectId={selectedProject.id}
        />
      )}

      {selectedProject && modal === 'view' && (
        <Modal title="Detalle del proyecto" onClose={closeModal}>
          <ProjectDetail project={selectedProject} />
        </Modal>
      )}
    </section>
  )
}

interface ProjectSelectionModalProps {
  title: string
  data: Project[] | undefined
  isLoading: boolean
  onClose: () => void
  onSelect: (project: Project) => void
}

const ProjectSelectionModal = ({
  title,
  data,
  isLoading,
  onClose,
  onSelect,
}: ProjectSelectionModalProps) => {
  return (
    <Modal title={title} onClose={onClose}>
      {isLoading && <p className="text-neutral-medium/70 text-sm">Cargando...</p>}

      {!isLoading && !data?.length && (
        <p className="text-neutral-medium/70 text-sm">No hay proyectos registrados.</p>
      )}

      <ul className="flex flex-col gap-2 max-h-80 overflow-y-auto">
        {data?.map((project) => (
          <li key={project.id}>
            <button
              onClick={() => onSelect(project)}
              className="w-full text-left px-4 py-3 rounded-xl border border-neutral-light transition-colors cursor-pointer hover:border-gray-500 hover:bg-gray-50"
            >
              <p className="font-semibold text-background-dark">{project.title}</p>
              <p className="text-sm text-neutral-medium/70">{project.role} · {project.status}</p>
            </button>
          </li>
        ))}
      </ul>
    </Modal>
  )
}

interface ProjectDetailProps {
  project: Project
}

const ProjectDetail = ({ project }: ProjectDetailProps) => {
  return (
    <div className="flex flex-col gap-4 text-sm text-neutral-medium">
      <div>
        <h4 className="text-lg font-semibold text-background-dark">{project.title}</h4>
        <p className="mt-1">{project.description}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <ProjectDetailItem label="Rol" value={project.role} />
        <ProjectDetailItem label="Estado" value={project.status} />
        <ProjectDetailItem label="Fecha de inicio" value={project.start_date} />
        <ProjectDetailItem label="Fecha de fin" value={project.end_date ?? 'En curso'} />
      </div>

      {!!project.url && (
        <a
          href={project.url}
          target="_blank"
          rel="noreferrer"
          className="font-medium text-primary hover:underline"
        >
          Abrir enlace del proyecto
        </a>
      )}

      {!!project.technologies.length && (
        <>
          <p className="font-semibold text-background-dark">Tecnologias</p>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span key={tech} className="bg-neutral-100 text-neutral-600 text-xs px-2 py-1 rounded border border-neutral-200">
                {tech}
              </span>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

interface ProjectDetailItemProps {
  label: string
  value: string
}

const ProjectDetailItem = ({ label, value }: ProjectDetailItemProps) => (
  <div className="rounded-xl border border-neutral-light p-3">
    <p className="text-xs text-neutral-medium/70">{label}</p>
    <p className="font-semibold text-background-dark">{value}</p>
  </div>
)
