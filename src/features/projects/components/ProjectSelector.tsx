import type { ProjectIdTitle } from '../interfaces/project.interface'

interface ProjectSelectorProps {
    projects: ProjectIdTitle[] | undefined
    isLoading: boolean
    onSelect: (project: ProjectIdTitle) => void
    hoverColor?: 'primary' | 'red'
}

export const ProjectSelector = ({
    projects,
    isLoading,
    onSelect,
    hoverColor = 'primary'
}: ProjectSelectorProps) => {
    const hoverClasses = hoverColor === 'red'
        ? 'hover:border-red-500 hover:bg-red-50'
        : 'hover:border-primary hover:bg-primary/5'

    return (
        <>
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
                        </button>
                    </li>
                ))}
            </ul>
        </>
    )
}
