import { Modal } from "../../../shared/components/Modal"
import type { ProjectIdTitle } from "../interfaces/project.interface"

interface Props {
  title: string
  onClose: () => void
  projects: ProjectIdTitle[] | undefined
  isLoading: boolean
  onSelect: (project: ProjectIdTitle) => void
  hoverColor?: 'primary' | 'red'
}

export const ProjectSelectionModal = ({ title, onClose, projects, isLoading, onSelect, hoverColor }: Props) => {
  const hoverClasses = hoverColor === 'red'
    ? 'hover:border-red-500 hover:bg-red-50'
    : 'hover:border-primary hover:bg-primary/5'

  return (
    <Modal title={title} onClose={onClose}>

      {isLoading && <p className="text-neutral-medium/70 text-sm">Cargando proyectos...</p>}

      {!isLoading && !projects?.length && (
        <p className="text-neutral-medium/70 text-sm">No hay proyectos registrados.</p>
      )}

      <ul className="flex flex-col gap-2 max-h-80 overflow-y-auto">
        {projects?.map((project) => (
          <li key={project.id}>
            <button
              onClick={() => onSelect(project)}
              className={`w-full text-left px-4 py-3 rounded-xl border border-neutral-light transition-colors cursor-pointer ${hoverClasses}`}
            >
              <p className="font-semibold text-background-dark">{project.title}</p>
              <p className="mt-1 text-sm text-neutral-medium/70">
                <span className="font-medium text-neutral-medium">Roles:</span>{' '}
                {project.roles?.map((role) => role.name).join(', ') || 'Sin roles'}
              </p>
              <p className="text-sm text-neutral-medium/70">
                <span className="font-medium text-neutral-medium">Tecnologías:</span>{' '}
                {project.skills?.map((skill) => skill.name).join(', ') || 'Sin tecnologías'}
              </p>
            </button>
          </li>
        ))}
      </ul>
    </Modal>
  )
}
