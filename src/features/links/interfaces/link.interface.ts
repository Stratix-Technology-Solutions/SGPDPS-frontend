export interface LinkResponse {
  id: number
  url: string
  is_visible: boolean
}

export interface LinksResponse {
  data: LinkResponse[]
  meta: {
    last_page: number
  }
}
