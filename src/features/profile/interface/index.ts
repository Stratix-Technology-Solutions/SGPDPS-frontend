
export interface Profile {
  id: string
  username: string
  first_name: string
  last_name: string
  picture: string | null
  biography: string | null
  date_of_birth: string | null
  gender: string | null
  country: string | null
  phone: string | null
  professions: string[]
}

export interface Skill {
  id: number
  name: string
  domain_level?: 'Básico' | 'Intermedio' | 'Avanzado' | null
  is_visible?: boolean | null
}

export interface SocialLink {
  id: number
  url: string
  is_visible?: boolean | null
}

export interface WorkExperience {
  id: string
  company: string
  position: string
  start_date: string
  end_date: string | null
  description: string | null
  is_visible?: boolean | null
}

export interface AcademicExperience {
  id: string
  institution: string
  title: string
  start_date: string
  end_date: string | null
  description: string | null
  type?: string | null
  is_visible?: boolean | null
}

export interface AcademicFormation {
  id: string
  education_level: string
  institution: string
  field_of_study: string | null
  emission_date: string | null
  status: string
  description: string | null
  is_visible?: boolean | null
}

export interface ProjectAsset {
  id: string
  url: string
  path?: string | null
}

export interface Project {
  id: string
  title: string
  description: string | null
  status: string
  roles: Array<{ id: number; name: string }>
  skills: Array<{ id: number; name: string }>
  links: Array<{ id: number; url: string }>
  assets: ProjectAsset[]
  is_visible?: boolean | null
}

export interface Portfolio {
  profile: Profile
  skills: Skill[]
  softSkills: Skill[]
  links: SocialLink[]
  workExperiences: WorkExperience[]
  academicExperiences: AcademicExperience[]
  academicFormations: AcademicFormation[]
  projects: Project[]
}

export interface PortfolioExport extends Portfolio {
  generatedAt: string
}

export interface ProfileResponse {
  data: Profile
}

export interface CollectionResponse<T> {
  data: T[]
}

export interface MaybeCollectionResponse<T> {
  data?: T[]
}


