import { z } from 'zod'

const isValidIsoDate = (value: string) => {
  if (value === '') {
    return true
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false
  }

  const [year, month, day] = value.split('-').map(Number)
  const date = new Date(Date.UTC(year, month - 1, day))

  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  )
}

const getTodayIsoDate = () => {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const isNotFutureIsoDate = (value: string) => {
  if (value === '') {
    return true
  }

  return value <= getTodayIsoDate()
}

export const RegisterAccountSchema = z.object({
  first_name: z.string().nonempty('El nombre es obligatorio').max(100, 'El nombre no debe exceder los 100 caracteres'),
  last_name: z.string().nonempty('El apellido es obligatorio').max(100, 'El apellido no debe exceder los 100 caracteres'),
  date_of_birth: z.string()
    .refine(isValidIsoDate, 'Ingresa una fecha válida.')
    .refine(isNotFutureIsoDate, 'La fecha no puede ser futura.'),
  gender: z.string(),
  biography: z.string().nonempty('Este cambio es obligatorio'),
  country: z.string().max(100, 'El país no debe exceder los 100 caracteres'),
  phone: z.string().max(20, 'El teléfono no debe exceder los 20 caracteres').regex(/^\+?\d*$/, 'El teléfono solo debe contener números'),
  professions: z.array(
    z.string().nonempty('Cada profesión debe tener un nombre').max(50, 'Cada profesión no debe exceder los 50 caracteres')
  ).max(5, 'No debe exceder las 5 profesiones').min(1, 'Debe tener al menos una profesión'),
})

export interface RegisterAccountDto {
  username?: string
  first_name: string
  last_name: string
  biography: string
  date_of_birth?: string
  gender?: 'masculino' | 'femenino' | 'otro'
  country?: string
  phone?: string
  professions: string[]
}

export const defaultValues = {
  first_name: '',
  last_name: '',
  date_of_birth:  '',
  gender: '',
  biography: '',
  country: '',
  phone: '',
  professions: [] as string[],
}
