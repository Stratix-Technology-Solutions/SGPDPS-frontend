export interface TechnicalSkillResponse {
  id: number
  name: string
  domain_level: string
  is_visible: boolean
}

export interface TechnicalSkillsResponse {
  data: TechnicalSkillResponse[]
  meta: {
    last_page: number
  }
}
