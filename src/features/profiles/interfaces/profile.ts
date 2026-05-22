export interface Profile {
  id: string
  username: string
  first_name: string
  last_name: string
  picture: string | null
  biography: string
  skills: string[]
  professions: string[]
}
