import { z } from 'zod'

const isValidUrl = (value: string) => {
  try {
    const url = new URL(value)

    return url.protocol === 'http:' || url.protocol === 'https:'
  } catch {
    return false
  }
}

const dateRangeRefinement = (
  data: { start_date?: string | null; end_date?: string | null },
  ctx: z.RefinementCtx,
) => {
  if (data.start_date && data.end_date) {
    const start = new Date(data.start_date)
    const end = new Date(data.end_date)

    if (end < start) {
      ctx.addIssue({
        code: 'custom',
        message: 'La fecha de fin no puede ser anterior a la fecha de inicio',
        path: ['end_date'],
      })
    }
  }
}

export const ProjectCreateSchema = z.object({
  title: z.string().min(5, 'Mínimo 5 carácteres').max(200, 'Máximo 200 caracteres'),
  role: z.string().max(50, 'Máximo 50 caracteres').optional().or(z.literal('')),
  description: z.string().min(5, 'Mínimo 5 carácteres').max(2000, 'Máximo 2000 caracteres'),
  start_date: z.string().min(1, 'La fecha de inicio es requerida'),
  end_date: z.string().min(1, 'LA fecha de fin es requerida'),
  skill_ids: z.array(z.number().int().positive()).optional(),
  roles_ids: z.array(z.number().int().positive()).min(1, 'Selecciona al menos un rol'),
  links: z.array(z.string().trim().max(512, 'Máximo 512 caracteres')).superRefine((links, ctx) => {
    const invalidLink = links.find((link) => !isValidUrl(link))

    if (invalidLink) {
      ctx.addIssue({
        code: 'custom',
        message: 'Debe ser una URL válida',
      })
    }
  }).optional(),
}).superRefine(dateRangeRefinement)

export type ProjectCreateDto = z.infer<typeof ProjectCreateSchema>

export const defaultValues: ProjectCreateDto = {
  title: '',
  role: '',
  description: '',
  start_date: '',
  end_date: '',
  skill_ids: [],
  roles_ids: [],
  links: [],
}

export const ProjectUpdateSchema = z.object({
  description: z.string().max(2000, 'Máximo 2000 caracteres').optional().nullable().or(z.literal('')),
  start_date: z.string().optional().nullable(),
  end_date: z.string().optional().nullable().or(z.literal('')),
  links: z.array(z.object({
    id: z.number().int().positive(),
    url: z.string().url('Debe ser una URL válida').max(512, 'Máximo 512 caracteres'),
  })).optional(),
  skill_ids: z.array(z.number().int().positive()).optional(),
  roles_ids: z.array(z.number().int().positive()).min(1, 'Selecciona al menos un rol'),
}).superRefine(dateRangeRefinement)

export type ProjectUpdateDto = z.infer<typeof ProjectUpdateSchema>

export const projectUpdateDefaultValues: ProjectUpdateDto = {
  description: '',
  start_date: '',
  end_date: '',
  links: [],
  skill_ids: [],
  roles_ids: [],
}
