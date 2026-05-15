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
  start_date: z.string().nullish(),
  end_date: z.string().nullish(),
  status: z.enum(['completado', 'en_curso'], {
    message: 'El estado es requerido',
  }),
  description: z.string().nullish(),
  is_visible: z.boolean().optional(),
}).superRefine((data, ctx) => {
  if (data.status === 'completado' && !data.start_date) {
    ctx.addIssue({
      code: 'custom',
      path: ['start_date'],
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
  field_of_study: '',
  start_date: '',
  end_date: '',
  status: 'completado',
  description: '',
  is_visible: true,
}
