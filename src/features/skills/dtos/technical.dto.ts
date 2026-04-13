import { z } from 'zod'

export const TechnicalSchema = z.object({
  name: z
    .string()
    .nonempty('El atributo es requerido'),

  domain_level: z
    .enum(['Básico', 'Intermedio', 'Avanzado'], 'Por favor seleccione una opción válida'),
})

export type TechnicalDto = z.infer<typeof TechnicalSchema>

export const defaultValues = {
  name: '',
  domain_level: ''
}
