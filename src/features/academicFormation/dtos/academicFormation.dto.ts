import { z } from 'zod'

export const AcademicFormationSchema = z.object({
  education_level: z.enum([
    'primaria',
    'secundaria',
    'bachillerato',
    'tecnico_medio',
    'tecnico_superior',
    'licenciatura',
    'maestria',
    'doctorado',
  ]),
  institution: z.string().nonempty('La institucion es requerida'),
  degree_title: z.string().nullish(),
  field_of_study: z.string().nullish(),
  start_date: z.string().nonempty('La fecha de inicio es requerida'),
  end_date: z.string().nullish(),
  status: z.enum(['completado', 'en_curso', 'abandonado', 'pausado']),
  description: z.string().nullish(),
  is_visible: z.boolean().optional(),
})

export type AcademicFormationDto = z.infer<typeof AcademicFormationSchema>

export const defaultValues: AcademicFormationDto = {
  education_level: 'bachillerato',
  institution: '',
  degree_title: '',
  field_of_study: '',
  start_date: '',
  end_date: '',
  status: 'completado',
  description: '',
  is_visible: true,
}
