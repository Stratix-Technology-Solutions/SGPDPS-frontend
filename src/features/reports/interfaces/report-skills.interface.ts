export interface ReportSkillsResponse {
  user: UserReport
  summary: SkillsSummary
  domain_levels: DomainLevels
  technical_skills: TechnicalSkillReport[]
  soft_skills: SoftSkillReport[]
}

export interface UserReport {
  id: string
  username: string
}

export interface SkillsSummary {
  total_technical_skills: number
  visible_technical_skills: number
  hidden_technical_skills: number
  total_soft_skills: number
  visible_soft_skills: number
  hidden_soft_skills: number
}

export interface DomainLevels {
  'Básico': number
  Intermedio: number
  Avanzado: number
}

export interface TechnicalSkillReport {
  id: number
  name: string
  domain_level: keyof DomainLevels
  is_visible: boolean
}

export interface SoftSkillReport {
  id: number
  name: string
  is_visible: boolean
}
