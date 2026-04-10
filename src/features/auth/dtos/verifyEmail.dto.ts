import { z } from 'zod'

export const EmailSchema = z.object({
  email: z
    .string()
    .nonempty('El correo es requerido')
    .email('Correo electrónico inválido')
})

export const VerifyEmailSchema = EmailSchema.extend({
  token: z
    .string()
    .length(6, 'El código debe contener 6 caracteres')
})

export type EmailDto = z.infer<typeof EmailSchema>
export type VerifyEmailDto = z.infer<typeof VerifyEmailSchema>

export const defaultValues = {
  email: '',
  token: '',
}
