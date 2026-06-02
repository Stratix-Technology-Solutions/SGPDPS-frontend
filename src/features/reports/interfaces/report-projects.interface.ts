export interface ReportProjectsResponse {
  user: UserReport
  summary: ProjectsSummary
  filters: ProjectsFilters
  projects: ProjectReport[]
}

export type ProjectReportVisibility = 'all' | 'visible' | 'hidden'

export interface ProjectsReportExport {
  report: ReportProjectsResponse
  visibility: ProjectReportVisibility
  generatedAt: string
}

export interface UserReport {
  id: string
  username: string
}

export interface ProjectsSummary {
  total_projects: number
  visible_projects: number
  hidden_projects: number
  with_assets: number
}

export interface ProjectsFilters {
  visibility: ProjectReportVisibility
}

export interface ProjectReport {
  id: string
  title: string
  description: string | null
  contributions: string | null
  is_visible: boolean
  status: string
  roles: ProjectRole[]
  categories: ProjectCategory[]
  skills: ProjectSkill[]
  links: ProjectLink[]
  assets_count: number
}

export interface ProjectRole {
  id: number
  name: string
}

export interface ProjectCategory {
  id: number
  name: string
}

export interface ProjectSkill {
  id: number
  name: string
}

export interface ProjectLink {
  id: number
  url: string
}
