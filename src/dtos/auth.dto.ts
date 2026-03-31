import { z } from 'zod'

export const LoginSchema = z.object({
  email: z
    .string()
    .email('Correo electrónico inválido')
    .min(1, 'El correo es requerido'),
  password: z
    .string(),
})

export type LoginDto = z.infer<typeof LoginSchema>
