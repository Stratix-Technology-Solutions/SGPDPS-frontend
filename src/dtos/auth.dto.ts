import { z } from 'zod'

export const EmailSchema = z.object({
  email: z
    .string()
    .nonempty('El correo es requerido')
    .email('Correo electrónico inválido')
})

export const LoginSchema = EmailSchema.extend({
  password: z
    .string()
    .nonempty('La contraseña es requerida')
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
