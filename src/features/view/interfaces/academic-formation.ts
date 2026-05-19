export interface AcademicFormation {
  id: string

  education_level: 'bachillerato' | 'tecnico_medio' | 'tecnico_superior' | 'licenciatura' | 'maestria' | 'doctorado'

  institution: string

  field_of_study: string | null

  emission_date: string | null

  status: 'completado' | 'en_curso'

  description: string | null
}
