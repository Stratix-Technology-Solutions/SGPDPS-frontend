import { z } from 'zod'

export const SoftSchema = z.object({
  name: z
    .string()
    .nonempty('El atributo es requerido'),
})

export const SoftFormSchema = SoftSchema.extend({
  custom_name: z.string(),
})

export type SoftDto = z.infer<typeof SoftSchema>

export type SoftFormValues = z.infer<typeof SoftFormSchema>

export const defaultValues: SoftFormValues = {
  name: '',
  custom_name: '',
}
