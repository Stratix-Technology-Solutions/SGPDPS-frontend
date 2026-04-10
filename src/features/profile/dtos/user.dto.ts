import { z } from 'zod'

export const RegisterAccountSchema = z.object({
  first_name: z.string().nonempty('El nombre es obligatorio').max(100, 'El nombre no debe exceder los 100 caracteres'),
  last_name: z.string().nonempty('El apellido es obligatorio').max(100, 'El apellido no debe exceder los 100 caracteres'),
  date_of_birth: z.string(),
  gender: z.string(),
  biography: z.string().nonempty('La biografía es obligatoria'),
  country: z.string().max(20, 'El país no debe exceder los 20 caracteres'),
  phone: z.string().max(20, 'El teléfono no debe exceder los 20 caracteres').regex(/^\+?\d*$/, 'El teléfono solo debe contener números'),
  professions: z.array(
    z.string().nonempty('Cada profesión debe tener un nombre').max(50, 'Cada profesión no debe exceder los 50 caracteres')
  ).max(5, 'No debe exceder las 5 profesiones').min(1, 'Debe tener al menos una profesión'),
})

export interface RegisterAccountDto {
  first_name: string
  last_name: string
  biography: string
  date_of_birth?: string
  gender?: 'masculino' | 'femenino' | 'otro'
  country?: string
  phone?: string
  professions: string[]
}
