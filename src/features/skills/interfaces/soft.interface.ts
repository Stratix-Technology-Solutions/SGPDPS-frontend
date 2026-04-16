export interface SoftSkillResponse {
  id: number
  name: string
}

export interface SoftSkillsResponse {
  data: SoftSkillResponse[]
  meta: {
    last_page: number
  }
}
