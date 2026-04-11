import { z } from 'zod'

export const LoginSchema = z.object({
  username: z
    .string()
    .nonempty('Este campo requerido'),

  password: z
    .string()
    .nonempty('La contraseña es requerida')
})

export type LoginDto = z.infer<typeof LoginSchema>

export const defaultValues = {
  username: '',
  password: '',
}
