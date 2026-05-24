export interface Profile {
  first_name: string
  last_name: string

  picture: string | null

  date_of_birth: string | null

  gender: string | null

  biography: string | null

  country: string | null

  phone: string | null

  professions: Profession[]
}

export interface Profession {
  id: string
  name: string
}
