import { z } from 'zod'

export const LoginSchema = z.object({
  email: z
    .string()
    .email('Correo electrónico inválido')
    .min(1, 'El correo es requerido'),
  password: z
    .string(),
})

export const RegisterSchema = z.object({
  email: z
    .string()
    .email('Correo electrónico inválido')
    .min(1, 'El correo es requerido'),
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

export const VerifyEmailSchema = z.object({
  email: z
    .string()
    .email('Correo electrónico inválido')
    .min(1, 'El correo es requerido'),
  token: z
    .string()
    .length(6, 'El código debe contener 6 dígitos')
})

export type LoginDto = z.infer<typeof LoginSchema>
export type RegisterDto = z.infer<typeof RegisterSchema>
export type VerifyEmailDto = z.infer<typeof VerifyEmailSchema>
