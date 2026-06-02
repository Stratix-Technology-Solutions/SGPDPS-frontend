import type {
  ReportSkillsResponse,
  SkillsReportFilter,
} from '../interfaces/report-skills.interface'

export const filterLabel: Record<SkillsReportFilter, string> = {
  all: 'Todas',
  technical: 'Técnicas',
  soft: 'Blandas',
}

export const getSkillRows = (
  report: ReportSkillsResponse,
  filter: SkillsReportFilter,
) => {
  const technicalRows = report.technical_skills.map((skill) => ({
    id: skill.id,
    name: skill.name,
    type: 'Técnica' as const,
    level: skill.domain_level || 'Nivel no especificado',
    visibility: skill.is_visible ? 'Pública' : 'Privada',
  }))

  const softRows = report.soft_skills.map((skill) => ({
    id: skill.id,
    name: skill.name,
    type: 'Blanda' as const,
    level: 'Nivel no especificado',
    visibility: skill.is_visible ? 'Pública' : 'Privada',
  }))

  if (filter === 'technical') return technicalRows
  if (filter === 'soft') return softRows

  return [...technicalRows, ...softRows]
}
