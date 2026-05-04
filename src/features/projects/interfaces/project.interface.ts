export interface Project {
  id: string
  title: string
  description: string
  role: 'Líder' | 'Colaborador' | 'Freelance'
  technologies: string[]
  url?: string
  start_date: string
  end_date?: string
  status: 'en curso' | 'finalizado' | 'pausado'
  created_at: string
  updated_at: string
}

export interface ProjectsResponse {
  data: Project[]
  meta: {
    last_page: number
  }
}

export type ProjectIdTitle = Pick<Project, 'id' | 'title'>

export interface ProjectResponse {
  data: ProjectIdTitle[]
}

