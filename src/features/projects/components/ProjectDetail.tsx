import { useGetProject } from "../hooks/useProjects"

interface Props {
  idProject: string
}

export const ProjectDetail = ({ idProject }: Props) => {
  const { data } = useGetProject(idProject)
  const project = data?.data
  return (
    <div className="flex flex-col gap-4 text-sm text-neutral-medium">
      <div>
        <h4 className="text-lg font-semibold text-background-dark">{project?.title}</h4>
        <p className="mt-1">{project?.description}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <ProjectDetailItem label="Fecha de inicio" value={project?.start_date} />
        <ProjectDetailItem label="Fecha de fin" value={project?.end_date} />
      </div>

      {!!project?.skills.length && (
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

      {!!project?.links.length && (
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
  value: string | undefined
}

const ProjectDetailItem = ({ label, value }: ProjectDetailItemProps) => (
  <div className="rounded-xl border border-neutral-light p-3">
    <p className="text-xs text-neutral-medium/70">{label}</p>
    <p className="font-semibold text-background-dark">{value}</p>
  </div>
)
