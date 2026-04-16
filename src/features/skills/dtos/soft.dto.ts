import { z } from 'zod'

export const SoftSchema = z.object({
  name: z
    .string()
    .nonempty('El atributo es requerido'),
})

export type SoftDto = z.infer<typeof SoftSchema>

export const defaultValues = {
  name: '',
}
