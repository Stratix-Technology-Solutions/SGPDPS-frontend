import { z } from 'zod'

export const EmailSchema = z.object({
  email: z
    .string()
    .email('Correo electrónico inválido')
    .min(1, 'El correo es requerido'),
})

export const LoginSchema = EmailSchema.extend({
  password: z
    .string(),
})

export const RegisterSchema = LoginSchema.extend({
  confirmPassword: z
    .string()
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Las contraseñas no coinciden',
  path: ['confirmPassword'],
})

export const VerifyEmailSchema = EmailSchema.extend({
  token: z
    .string()
    .length(6, 'El código debe contener 6 dígitos')
})

export type EmailDto = z.infer<typeof EmailSchema>
export type LoginDto = z.infer<typeof LoginSchema>
export type RegisterDto = z.infer<typeof RegisterSchema>
export type VerifyEmailDto = z.infer<typeof VerifyEmailSchema>
