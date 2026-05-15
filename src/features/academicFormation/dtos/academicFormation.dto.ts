import { z } from 'zod'

export const AcademicFormationSchema = z.object({
  education_level: z.enum([
    'bachillerato',
    'tecnico_medio',
    'tecnico_superior',
    'licenciatura',
    'maestria',
    'doctorado',
  ]),
  institution: z.string().nonempty('La institución es requerida'),
  field_of_study: z.string().nullish(),
  emission_date: z.string().nullish(),
  status: z.enum(['completado', 'en_curso'], {
    message: 'El estado es requerido',
  }),
  description: z.string().nullish(),
  is_visible: z.boolean().optional(),
}).superRefine((data, ctx) => {
  if (data.status === 'completado' && !data.emission_date) {
    ctx.addIssue({
      code: 'custom',
      path: ['emission_date'],
      message: 'La fecha de emisión del título es requerida',
    })
  }

  if (data.education_level !== 'bachillerato' && !data.field_of_study) {
    ctx.addIssue({
      code: 'custom',
      path: ['field_of_study'],
      message: 'La carrera o especialidad es requerida',
    })
  }
})

export type AcademicFormationDto = z.infer<typeof AcademicFormationSchema>

export const defaultValues: AcademicFormationDto = {
  education_level: 'bachillerato',
  institution: '',
  field_of_study: null,
  emission_date: null,
  status: 'completado',
  description: '',
  is_visible: true,
}
