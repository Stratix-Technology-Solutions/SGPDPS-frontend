import { z } from 'zod'

export const WorkExperienceSchema = z.object({
  company: z
    .string()
    .min(1, 'La empresa es obligatoria.')
    .max(150, 'No debe exceder los 150 caracteres.'),
  position: z
    .string()
    .min(1, 'El cargo es obligatorio.')
    .max(150, 'No debe exceder los 150 caracteres.'),
  description: z
    .string()
    .max(255, 'No debe exceder los 255 caracteres.')
    .nullable(),
  start_date: z.string().min(1, 'La fecha de inicio es obligatoria.'),
  end_date: z.string().nullable(),
})

export const updateSchema = WorkExperienceSchema.omit({
  company: true,
}).partial()

export interface WorkExperience {
  id: string
  company: string
  position: string
  description: string | null
  start_date: string
  end_date: string | null
  created_at: string
  updated_at: string
}

export type WorkExperienceFormValues = z.infer<typeof WorkExperienceSchema>
export type CreateWorkExperience = z.infer<typeof WorkExperienceSchema>
export type UpdateWorkExperience = z.infer<typeof updateSchema>

export const defaultValues: CreateWorkExperience = {
  company: '',
  position: '',
  description: '',
  start_date: '',
  end_date: null,
}

export type CheckDuplicateResponse = {
  is_duplicate: boolean
  is_overlapping: boolean
}
