import { z } from 'zod'

export const ProjectSchema = z.object({
  title: z.string().min(1, 'El título es requerido'),
  description: z.string().min(1, 'La descripción es requerida'),
  role: z.enum(['Líder', 'Colaborador', 'Freelance']),
  technologies: z.array(z.string()).min(1, 'Agrega al menos una tecnología'),
  url: z.string().url('Debe ser una URL válida').optional().or(z.literal('')),
  start_date: z.string().min(1, 'La fecha de inicio es requerida'),
  end_date: z.string().nullish(),
  status: z.enum(['en curso', 'finalizado', 'pausado']),
}).superRefine((data, ctx) => {
  if (data.status === 'finalizado' && !data.end_date) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'La fecha de fin es obligatoria si el estado es "finalizado"',
      path: ['end_date'],
    })
  }

  if (data.start_date && data.end_date) {
    const start = new Date(data.start_date)
    const end = new Date(data.end_date)
    if (end < start) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'La fecha de fin no puede ser anterior a la fecha de inicio',
        path: ['end_date'],
      })
    }
  }
})

export type ProjectDto = z.infer<typeof ProjectSchema>

export const defaultValues: ProjectDto = {
  title: '',
  description: '',
  role: 'Colaborador',
  technologies: [],
  url: '',
  start_date: '',
  end_date: '',
  status: 'en curso',
}
