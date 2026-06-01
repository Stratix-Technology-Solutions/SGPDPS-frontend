import {
  FiEye,
  FiEyeOff,
  // FiCalendar,
  FiLink,
  FiFolder,
} from 'react-icons/fi'
import { useGetReportProjects } from '../hooks/useGetReportProjects'

export const ReportProjects = () => {
  const { data, isLoading, isError, error } = useGetReportProjects()

  if (isLoading) {
    return (
      <div className="bg-white border border-neutral-200 rounded-2xl p-8 flex justify-center">
        <div className="w-8 h-8 border-2 border-primary-soft/30 border-t-primary-soft rounded-full animate-spin" />
      </div>
    )
  }

  if (isError) {
    return (
      <div className="bg-white border border-red-200 rounded-2xl p-6">
        <p className="text-red-500">
          {error?.response?.data?.message ?? 'Error al generar el reporte'}
        </p>
      </div>
    )
  }

  if (!data) return null

  const topSkills = data.projects
    .flatMap((project) => project.skills)
    .reduce<Record<string, number>>((acc, skill) => {
      acc[skill.name] = (acc[skill.name] ?? 0) + 1
      return acc
    }, {})

  const topRoles = data.projects
    .flatMap((project) => project.roles)
    .reduce<Record<string, number>>((acc, role) => {
      acc[role.name] = (acc[role.name] ?? 0) + 1
      return acc
    }, {})

  const mostUsedSkills = Object.entries(topSkills)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)

  const mostUsedRoles = Object.entries(topRoles)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)

  const projectsWithoutDescription = data.projects.filter(
    (project) => !project.description,
  ).length

  const projectsWithoutCategories = data.projects.filter(
    (project) => project.categories.length === 0,
  ).length

  /*
  const formatDate = (date: string | null) => {
    if (!date) return 'Actualidad'

    return new Date(date).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })
  }
  */

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-neutral-200 rounded-2xl p-4">
          <p className="text-sm text-neutral-medium">
            Total proyectos
          </p>
          <p className="text-3xl font-bold text-background-dark">
            {data.summary.total_projects}
          </p>
        </div>

        <div className="bg-white border border-neutral-200 rounded-2xl p-4">
          <p className="text-sm text-neutral-medium">
            Visibles
          </p>
          <p className="text-3xl font-bold text-green-600">
            {data.summary.visible_projects}
          </p>
        </div>

        <div className="bg-white border border-neutral-200 rounded-2xl p-4">
          <p className="text-sm text-neutral-medium">
            Ocultos
          </p>
          <p className="text-3xl font-bold text-red-500">
            {data.summary.hidden_projects}
          </p>
        </div>

        <div className="bg-white border border-neutral-200 rounded-2xl p-4">
          <p className="text-sm text-neutral-medium">
            Con recursos
          </p>
          <p className="text-3xl font-bold text-primary">
            {data.summary.with_assets}
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <div className="bg-white border border-neutral-200 rounded-2xl p-4">
          <h3 className="font-semibold text-background-dark mb-4">
            Skills más utilizadas
          </h3>

          <div className="flex flex-wrap gap-2">
            {mostUsedSkills.map(([skill, count]) => (
              <span
                key={skill}
                className="bg-blue-50 text-primary px-3 py-1 rounded-full text-sm"
              >
                {skill} ({count})
              </span>
            ))}
          </div>
        </div>

        <div className="bg-white border border-neutral-200 rounded-2xl p-4">
          <h3 className="font-semibold text-background-dark mb-4">
            Roles frecuentes
          </h3>

          <div className="flex flex-wrap gap-2">
            {mostUsedRoles.map(([role, count]) => (
              <span
                key={role}
                className="bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-sm"
              >
                {role} ({count})
              </span>
            ))}
          </div>
        </div>

        <div className="bg-white border border-neutral-200 rounded-2xl p-4">
          <h3 className="font-semibold text-background-dark mb-4">
            Observaciones
          </h3>

          <div className="flex flex-col gap-2 text-sm">
            <span className="text-neutral-medium">
              {projectsWithoutDescription} proyectos sin descripción
            </span>

            <span className="text-neutral-medium">
              {projectsWithoutCategories} proyectos sin categorías
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold text-background-dark">
          Proyectos registrados
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {data.projects.map((project) => (
            <div
              key={project.id}
              className="bg-white border border-neutral-200 rounded-2xl p-4 flex flex-col gap-5 hover:shadow-md transition-all"
            >
              <div className="flex justify-between items-start gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-background-dark">
                    {project.title}
                  </h3>

                  {/*
                  <div className="flex items-center gap-2 mt-2 text-sm text-neutral-medium">
                    <FiCalendar size={14} />

                    <span>
                      {formatDate(project.start_date)}
                      {' - '}
                      {formatDate(project.end_date)}
                    </span>
                  </div>
                  */}
                </div>

                <span
                  className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                    project.is_visible
                      ? 'bg-green-50 text-green-700'
                      : 'bg-red-50 text-red-600'
                  }`}
                >
                  {project.is_visible
                    ? <FiEye size={12} />
                    : <FiEyeOff size={12} />}
                  {project.is_visible ? 'Visible' : 'Oculto'}
                </span>
              </div>

              {project.roles.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {project.roles.map((role) => (
                    <span
                      key={role.id}
                      className="bg-blue-50 text-primary px-3 py-1 rounded-lg text-xs font-medium"
                    >
                      {role.name}
                    </span>
                  ))}
                </div>
              )}

              <p className="text-sm text-neutral-medium leading-relaxed">
                {project.description ??
                  'Este proyecto no tiene descripción registrada.'}
              </p>

              {project.categories.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {project.categories.map((category) => (
                    <span
                      key={category.id}
                      className="bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-xs"
                    >
                      {category.name}
                    </span>
                  ))}
                </div>
              )}

              {project.skills.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {project.skills.slice(0, 5).map((skill) => (
                    <span
                      key={skill.id}
                      className="border border-neutral-200 bg-neutral-50 px-2 py-1 rounded-md text-xs text-neutral-medium"
                    >
                      {skill.name}
                    </span>
                  ))}

                  {project.skills.length > 5 && (
                    <span className="border border-neutral-200 bg-neutral-50 px-2 py-1 rounded-md text-xs text-neutral-medium">
                      +{project.skills.length - 5}
                    </span>
                  )}
                </div>
              )}

              <div className="flex items-center gap-6 text-sm text-neutral-medium">
                <div className="flex items-center gap-2">
                  <FiFolder />
                  <span>
                    {project.assets_count} recurso
                    {project.assets_count !== 1 && 's'}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <FiLink />
                  <span>
                    {project.links.length} enlace
                    {project.links.length !== 1 && 's'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
