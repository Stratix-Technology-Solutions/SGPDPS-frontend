export interface TechnicalSkillResponse {
  id: string
  name: string
  domain_level: string
}

export interface TechnicalSkillsResponse {
  data: TechnicalSkillResponse[]
  links: {
    first: string
    last: string
    prev: string | null
    next: string | null
  }
}
