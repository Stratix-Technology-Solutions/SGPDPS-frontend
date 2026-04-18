import { z } from 'zod'

export const AcademicSchema = z.object({
  title: z.string().nonempty('El título es requerido'),
  institution: z.string().nonempty('La institución es requerida'),
  start_date: z.string().nonempty('La fecha de inicio es requerida'),
  end_date: z.string().nullish(),
  type: z.enum(['educación', 'certificado']),
  description: z.string().nullish(),
  is_visible: z.boolean().optional(),    // tiene default en BD
})

export type AcademicDto = z.infer<typeof AcademicSchema>

export const defaultValues: AcademicDto = {
  title: '',
  institution: '',
  start_date: '',
  end_date: '',
  type: 'educación',
  description: '',
  is_visible: true,
}
