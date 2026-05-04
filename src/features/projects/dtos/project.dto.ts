import { z } from 'zod'

const dateRangeRefinement = (
  data: { start_date?: string | null; end_date?: string | null },
  ctx: z.RefinementCtx,
) => {
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
}

export const ProjectCreateSchema = z.object({
  title: z.string().min(1, 'El título es requerido').max(200, 'Máximo 200 caracteres'),
  description: z.string().max(2000, 'Máximo 2000 caracteres').optional().or(z.literal('')),
  start_date: z.string().min(1, 'La fecha de inicio es requerida'),
  end_date: z.string().optional().or(z.literal('')),
  skill_ids: z.array(z.number().int().positive()).optional(),
  links: z.array(z.string().url('Debe ser una URL válida').max(512, 'Máximo 512 caracteres')).optional(),
}).superRefine(dateRangeRefinement)

export type ProjectCreateDto = z.infer<typeof ProjectCreateSchema>

export const projectCreateDefaultValues: ProjectCreateDto = {
  title: '',
  description: '',
  start_date: '',
  end_date: '',
  skill_ids: [],
  links: [],
}

export const ProjectUpdateSchema = z.object({
  title: z.string().min(1, 'El título es requerido').max(200, 'Máximo 200 caracteres').optional(),
  description: z.string().max(2000, 'Máximo 2000 caracteres').optional().nullable().or(z.literal('')),
  start_date: z.string().optional().nullable(),
  end_date: z.string().optional().nullable().or(z.literal('')),
  links: z.array(z.object({
    id: z.number().int().positive(),
    url: z.string().url('Debe ser una URL válida').max(512, 'Máximo 512 caracteres'),
  })).optional(),
}).superRefine(dateRangeRefinement)

export type ProjectUpdateDto = z.infer<typeof ProjectUpdateSchema>

export const projectUpdateDefaultValues: ProjectUpdateDto = {
  title: '',
  description: '',
  start_date: '',
  end_date: '',
  links: [],
}
