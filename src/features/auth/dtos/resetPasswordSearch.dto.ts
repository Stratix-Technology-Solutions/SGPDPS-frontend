import { z } from 'zod'

export const ResetPasswordSearchSchema = z.object({
  token: z.string(),
  email: z.string().email(),
})

export const ResetPasswordSchema = z.object({
  email: z
    .string()
    .nonempty('El correo es requerido')
    .email('Correo electrónico inválido'),

  password: z
    .string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#_-])[A-Za-z\d@$!%*?&.#_-]{8,}$/,
      'Debe incluir mayúscula, minúscula, número y carácter especial'
    ),

  confirmPassword: z
    .string()
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Las contraseñas no coinciden',
  path: ['confirmPassword'],
})

export type ResetPasswordDto = z.infer<typeof ResetPasswordSchema>

export const defaultValues = {
  email: '',
  password: '',
  confirmPassword: '',
}
