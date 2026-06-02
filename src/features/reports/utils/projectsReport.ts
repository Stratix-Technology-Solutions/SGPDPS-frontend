import type {
  ProjectReport,
  ProjectReportVisibility,
  ReportProjectsResponse,
} from '../interfaces/report-projects.interface'

export const projectVisibilityLabel: Record<ProjectReportVisibility, string> = {
  all: 'Todos',
  visible: 'Visibles',
  hidden: 'Ocultos',
}

export const filterProjects = (
  projects: ProjectReport[],
  visibility: ProjectReportVisibility,
) => {
  if (visibility === 'visible') return projects.filter((project) => project.is_visible)
  if (visibility === 'hidden') return projects.filter((project) => !project.is_visible)

  return projects
}

export const getProjectsReportInsights = (
  report: ReportProjectsResponse,
  visibility: ProjectReportVisibility,
) => {
  const projects = filterProjects(report.projects, visibility)

  return {
    projects,
    completed: projects.filter((project) => project.status === 'Completado').length,
    inProgress: projects.filter((project) => project.status === 'En curso').length,
    withEvidence: projects.filter((project) => project.assets_count > 0).length,
    linksCount: projects.reduce((total, project) => total + project.links.length, 0),
    topSkills: countMostUsed(projects.flatMap((project) => project.skills)),
    topRoles: countMostUsed(projects.flatMap((project) => project.roles)),
  }
}

const countMostUsed = (items: { name: string }[]) => {
  const counts = items.reduce<Record<string, number>>((acc, item) => {
    acc[item.name] = (acc[item.name] ?? 0) + 1
    return acc
  }, {})

  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
}
