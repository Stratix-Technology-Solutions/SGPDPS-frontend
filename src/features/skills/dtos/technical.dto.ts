import { z } from 'zod'

export const DOMAIN_LEVELS = [
  'Básico',
  'Intermedio',
  'Avanzado',
] as const

export type DomainLevel = typeof DOMAIN_LEVELS[number]

export const TechnicalSchema = z.object({
  name: z
    .string()
    .nonempty('El atributo es requerido'),

  domain_level: z.enum(DOMAIN_LEVELS, {
    message: 'Por favor seleccione una opción válida',
  })
})


export const TechnicalFormSchema = TechnicalSchema.extend({
  custom_name: z.string(),
})

export type TechnicalDto = z.infer<typeof TechnicalSchema>

export type TechnicalFormValues = z.infer<typeof TechnicalFormSchema>

export const defaultValues: TechnicalFormValues = {
  name: '',
  custom_name: '',
  domain_level: 'Básico',
}
