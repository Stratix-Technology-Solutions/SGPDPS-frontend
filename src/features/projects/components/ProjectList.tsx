import { useEffect, useState } from 'react'
import { FiEdit2, FiEye, FiPlusCircle, FiTrash2 } from 'react-icons/fi'
import { ActionButton } from '../../../shared/components/ActionButton'
import { Modal } from '../../../shared/components/Modal'
import { SectionTitle } from '../../../shared/components/SectionTitle'
import { useGetProjects } from '../hooks/useProjects'
import { ModalAddProject } from './modals/ModalAddProject'
import { ModalEditProject } from './modals/ModalEditProject'
import { ConfirmDeleteProject } from './ConfirmDeleteProject'
import type { Project } from '../interfaces/project.interface'
import { ModalAddProjectAsset } from './modals/ModalAddProjectAsset'
import { ModalDeleteProjectAsset } from './modals/ModalDeleteProjectAsset'

type ModalType = 'add' | 'edit' | 'delete' | 'view' | 'add-evidence' | 'delete-evidence' | null

export const ProjectList = () => {
  const [page, setPage] = useState(1)
  const { data, isLoading } = useGetProjects({ page })
  const [modal, setModal] = useState<ModalType>(null)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  useEffect(() => {
    const lastPage = data?.meta.last_page ?? 1
    if (page > lastPage) {
      setPage(lastPage)
    }
  }, [data, page, setPage])

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
          page={page}
          lastPage={data?.meta.last_page ?? 1}
          setPage={setPage}
          isLoading={isLoading}
          onClose={closeModal}
          onSelect={handleEdit}
        />
      )}

      {modal === 'delete' && !selectedProject && (
        <ProjectSelectionModal
          title="Selecciona un proyecto para eliminar"
          data={data?.data}
          page={page}
          lastPage={data?.meta.last_page ?? 1}
          setPage={setPage}
          isLoading={isLoading}
          onClose={closeModal}
          onSelect={handleDelete}
        />
      )}

      {modal === 'view' && !selectedProject && (
        <ProjectSelectionModal
          title="Selecciona un proyecto para ver sus detalles"
          data={data?.data}
          page={page}
          lastPage={data?.meta.last_page ?? 1}
          setPage={setPage}
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
  page: number
  lastPage: number
  setPage: (page: number) => void
  isLoading: boolean
  onClose: () => void
  onSelect: (project: Project) => void
}

const ProjectSelectionModal = ({
  title,
  data,
  page,
  lastPage,
  setPage,
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
              <p className="text-sm text-neutral-medium/70">
                {project.skills.length} habilidad{project.skills.length === 1 ? '' : 'es'} · {project.links.length} enlace{project.links.length === 1 ? '' : 's'}
              </p>
            </button>
          </li>
        ))}
      </ul>

      {lastPage > 1 && (
        <div className="flex items-center justify-between gap-3 pt-4 mt-4 border-t border-neutral-light">
          <button
            type="button"
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className="px-4 py-2 rounded-lg border border-neutral-light text-sm font-medium text-background-dark hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Anterior
          </button>

          <div className="flex items-center gap-2 flex-wrap justify-center">
            {Array.from({ length: lastPage }, (_, index) => index + 1).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setPage(item)}
                className={`w-8 h-8 rounded-md text-sm font-medium transition-colors ${page === item ? 'bg-primary text-white' : 'bg-white border border-neutral-light text-background-dark hover:bg-neutral-50'}`}
              >
                {item}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setPage(page + 1)}
            disabled={page === lastPage}
            className="px-4 py-2 rounded-lg border border-neutral-light text-sm font-medium text-background-dark hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Siguiente
          </button>
        </div>
      )}
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
        <ProjectDetailItem label="Fecha de inicio" value={project.start_date} />
        <ProjectDetailItem label="Fecha de fin" value={project.end_date ?? 'En curso'} />
      </div>

      {!!project.skills.length && (
        <>
          <p className="font-semibold text-background-dark">Habilidades técnicas</p>
          <div className="flex flex-wrap gap-2">
            {project.skills.map((skill) => (
              <span key={skill.id} className="bg-neutral-100 text-neutral-600 text-xs px-2 py-1 rounded border border-neutral-200 capitalize">
                {skill.name}
              </span>
            ))}
          </div>
        </>
      )}

      {!!project.links.length && (
        <>
          <p className="font-semibold text-background-dark">Enlaces</p>
          <div className="flex flex-col gap-2">
            {project.links.map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="font-medium text-primary hover:underline break-all"
              >
                {link.url}
              </a>
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
