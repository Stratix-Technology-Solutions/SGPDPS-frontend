export interface SoftSkillResponse {
  id: number
  name: string
  is_visible: boolean
}

export interface SoftSkillsResponse {
  data: SoftSkillResponse[]
  meta: {
    last_page: number
  }
}
