import type { LinkResponse } from '../../links/interfaces/link.interface'

export interface ProjectSkillResponse {
  id: number
  name: string
  domain_level: string | null
}

export interface SkillOption {
  id: number
  name: string
  is_system: boolean
}

export interface ProjectRole {
  id: number
  name: string
}

export interface ProjectRoles {
  data: ProjectRole[]
}

export interface Project {
  id: string
  title: string
  role: string
  description: string
  contributions: string | null
  start_date: string | null
  end_date?: string | null
  skills: ProjectSkillResponse[]
  links: LinkResponse[]
  roles: ProjectRole[]
  is_visible: boolean
}

export interface ProjectPaginationLinks {
  first: string | null
  last: string | null
  prev: string | null
  next: string | null
}

export interface ProjectPaginationMeta {
  current_page: number
  from: number | null
  last_page: number
  links: Array<{
    url: string | null
    label: string
    active: boolean
  }>
  path: string
  per_page: number
  to: number | null
  total: number
}

export interface ProjectsResponse {
  data: Project[]
  links: ProjectPaginationLinks
  meta: ProjectPaginationMeta
}

export type ProjectIdTitle = Pick<Project, 'id' | 'title'> & Partial<Pick<Project, 'description' | 'roles' | 'skills'>>

export interface ProjectResponse {
  data: Project
}

