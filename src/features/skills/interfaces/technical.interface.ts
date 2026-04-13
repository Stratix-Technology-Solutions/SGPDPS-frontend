export interface TechnicalSkillResponse {
  id: number
  name: string
  domain_level: string
}

export interface TechnicalSkillsResponse {
  data: TechnicalSkillResponse[]
  meta: {
    last_page: number
  }
}
