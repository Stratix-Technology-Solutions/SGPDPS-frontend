import { z } from 'zod'

export const LoginSchema = z.object({
  email: z
    .string()
    .nonempty('El correo es requerido')
    .email('Correo electrónico inválido'),

  password: z
    .string()
    .nonempty('La contraseña es requerida')
})

export type LoginDto = z.infer<typeof LoginSchema>

export const defaultValues = {
  email: '',
  password: '',
}
