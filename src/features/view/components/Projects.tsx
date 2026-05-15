import type { Project } from '../interfaces/project'
import { formatYear } from '../utils/formatYear'
import { SocialIcon } from './SocialIcon'

interface Props {
  projects: Project[]
}

export const Projects = ({ projects }: Props) => {
  return (
    <section
      id="projects"
      className="mx-auto w-full max-w-7xl px-4 sm:px-6"
    >
      <p className="mb-1 font-mono text-sm uppercase tracking-widest text-primary-soft">
        Trabajo
      </p>

      <h2 className="mb-4 font-serif text-3xl text-background-dark">
        Proyectos destacados
      </h2>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {projects.map((project) => {
          const image = project.assets.find(
            (asset) => asset.type === 'imagen'
          )

          return (
            <article
              key={project.id}
              className="flex flex-col overflow-hidden rounded-2xl border border-primary/10 bg-white transition-all duration-200 hover:-translate-y-1 hover:border-primary-soft"
            >
              <div className="relative flex h-40 items-center justify-center overflow-hidden bg-linear-to-br from-primary to-primary-soft">
                {image && (
                  <img
                    src={image.url}
                    alt={project.title}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none'
                    }}
                  />
                )}

                <span className="absolute select-none font-serif text-6xl text-white/20">
                  {project.title[0]}
                </span>

              </div>

              <div className="flex flex-1 flex-col p-5">
                {!!project.categories?.length && (
                  <div className="mb-3 flex flex-wrap gap-1.5">
                    {project.categories.map((category) => (
                      <span
                        key={category.id}
                        className="rounded border border-primary/15 bg-primary/5 px-2 py-0.5 font-mono text-[10px] text-primary"
                      >
                        {category.name}
                      </span>
                    ))}
                  </div>
                )}

                <h3 className="mb-1 text-base font-semibold text-background-dark">
                  {project.title}
                </h3>

                <p className="mb-3 font-mono text-[11px] text-neutral-medium">
                  {project.roles.map((role) => role.name).join(', ')}
                  {' · '}

                  {formatYear(project.start_date)}
                  {' — '}

                  {project.end_date
                    ? formatYear(project.end_date)
                    : 'Actualidad'}
                </p>

                {project.description && (
                  <p className="mb-4 flex-1 text-sm leading-relaxed text-neutral-medium">
                    {project.description}
                  </p>
                )}

                {!!project.skills?.length && (
                  <div className="mb-4 flex flex-wrap gap-1.5">
                    {project.skills.map((skill) => (
                      <span
                        key={skill.id}
                        className="rounded bg-[#f1f4ff] px-2 py-0.5 font-mono text-[11px] text-neutral-medium"
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                )}

                {!!project.links?.length && (
                  <div className="mt-auto flex flex-wrap gap-2">
                    {project.links.map((link) => (
                      <a
                        key={link.id}
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-lg border border-primary/20 bg-white px-4 py-2 text-xs font-medium text-primary transition-all hover:border-primary hover:bg-primary/5"
                      >
                        <SocialIcon
                          url={link.url}
                          className="text-sm"
                        />
                        {link.url.includes('github')
                          ? 'GitHub'
                          : 'Visitar'}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
