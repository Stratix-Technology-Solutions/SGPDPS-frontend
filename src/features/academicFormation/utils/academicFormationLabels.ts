import type { AcademicFormationResponse } from '../dtos/academicFormation.interface'

export const getAcademicFormationLevelLabel = (
  level: AcademicFormationResponse['education_level'],
) => {
  const labels: Record<AcademicFormationResponse['education_level'], string> = {
    bachillerato: 'Bachillerato',
    tecnico_medio: 'Técnico medio',
    tecnico_superior: 'Técnico superior',
    licenciatura: 'Licenciatura',
    maestria: 'Maestría',
    doctorado: 'Doctorado / PhD',
  }

  return labels[level]
}

export const getAcademicFormationStatusLabel = (
  status: AcademicFormationResponse['status'],
) => {
  const labels: Record<AcademicFormationResponse['status'], string> = {
    completado: 'Completado',
    en_curso: 'En curso',
  }

  return labels[status]
}
