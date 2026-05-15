export interface Project {
  id: string

  title: string

  description: string | null

  start_date: string

  end_date: string | null

  roles: ProjectRole[]

  categories: ProjectCategory[]

  skills: ProjectSkill[]

  links: ProjectLink[]

  assets: ProjectAsset[]
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

export interface ProjectAsset {
  id: string

  url: string

  original_name: string

  type: 'imagen' | 'pdf'
}
