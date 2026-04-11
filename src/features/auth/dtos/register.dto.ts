import { z } from 'zod'

export const RegisterSchema = z.object({
  username: z
    .string()
    .min(3, "El username debe tener al menos 3 caracteres")
    .max(20, "Máximo 20 caracteres")
    .regex(/^[a-zA-Z0-9_]+$/, "Solo letras, números y guion bajo"),

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

export type RegisterDto = z.infer<typeof RegisterSchema>

export const defaultValues = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
}
