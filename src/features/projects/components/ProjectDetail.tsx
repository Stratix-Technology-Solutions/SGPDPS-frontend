import type { Project } from '../interfaces/project.interface'

interface Props {
  project: Project
}

export const ProjectDetail = ({ project }: Props) => {
  return (
    <div className="rounded-2xl bg-white">
      <div className="flex flex-col gap-6 text-neutral-medium">
        <div className="flex flex-col gap-3">
          <div className="flex items-start justify-between gap-3">
            <h2 className="text-xl font-semibold tracking-tight text-background-dark">
              {project?.title}
            </h2>
          </div>

          <p className="max-w-3xl text-sm leading-relaxed text-neutral-medium">
            {project?.description}
          </p>
        </div>

        {!!project?.skills.length && (
          <section className="flex flex-col gap-3">
            <p className="text-sm font-semibold tracking-wide text-background-dark">
              Habilidades técnicas
            </p>

            <div className="flex flex-wrap gap-2">
              {project.skills.map((skill) => (
                <span
                  key={skill.id}
                  className="
                    rounded-full
                    border border-neutral-200
                    bg-neutral-100
                    px-3 py-1
                    text-xs font-medium
                    text-neutral-700
                    capitalize
                  "
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </section>
        )}

        {!!project?.roles.length && (
          <section className="flex flex-col gap-3">
            <p className="text-sm font-semibold tracking-wide text-background-dark">
              Roles en el proyecto
            </p>

            <div className="flex flex-wrap gap-2">
              {project.roles.map((role) => (
                <span
                  key={role.id}
                  className="
                    rounded-full
                    border border-primary/20
                    bg-primary/10
                    px-3 py-1
                    text-xs font-semibold
                    text-primary
                    capitalize
                  "
                >
                  {role.name}
                </span>
              ))}
            </div>
          </section>
        )}

        <section className="flex flex-col gap-3">
          <p className="text-sm font-semibold tracking-wide text-background-dark">
            Estado del proyecto
          </p>

          <ProjectDetailItem
            label="Estado"
            value={project.status}
          />
        </section>

        {!!project?.links.length && (
          <section className="flex flex-col gap-3">
            <p className="text-sm font-semibold tracking-wide text-background-dark">
              Enlaces relacionados
            </p>

            <div className="flex flex-col gap-2">
              {project.links.map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="
                    group flex items-center gap-2
                    rounded-xl border border-neutral-200
                    bg-neutral-50 px-3 py-2
                    text-sm text-primary
                    transition-colors
                    hover:bg-primary/5
                    break-all
                  "
                >
                  {link.url}
                </a>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

interface ProjectDetailItemProps {
  label: string
  value: string | undefined
}

const ProjectDetailItem = ({
  label,
  value,
}: ProjectDetailItemProps) => (
  <div className="rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3">
    <p className="text-xs font-medium uppercase tracking-wide text-neutral-medium/70">
      {label}
    </p>

    <p className="mt-1 font-semibold text-background-dark">
      {value || "No definido"}
    </p>
  </div>
)
