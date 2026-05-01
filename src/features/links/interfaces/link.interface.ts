export interface LinkResponse {
  id: number
  url: string
}

export interface LinksResponse {
  data: LinkResponse[]
  meta: {
    last_page: number
  }
}
