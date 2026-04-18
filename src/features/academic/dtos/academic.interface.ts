export interface AcademicExperienceResponse {
  id: string
  title: string
  institution: string
  start_date: string
  end_date?: string
  type: 'educación' | 'certificado'
  description?: string
  is_visible: boolean
}

export interface AcademicExperiencesResponse {
  data: AcademicExperienceResponse[]
  meta: {
    last_page: number
  }
}
