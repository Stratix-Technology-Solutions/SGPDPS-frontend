import type { AcademicExperience } from './academic-experience'
import type { Profile } from './profile'
import type { Project } from './project'
import type { Skill, SoftSkill } from './skills'
import type { WorkExperience } from './work-experience'

export interface UserProfileResponse {
  id: string
  username: string

  profile: Profile

  social_links: SocialLink[]

  skills: Skill[]

  soft_skills: SoftSkill[]

  work_experiences: WorkExperience[]

  academic_experiences: AcademicExperience[]

  projects: Project[]
}

export interface SocialLink {
  id: number
  url: string
}
