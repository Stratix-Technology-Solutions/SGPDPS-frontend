import { z } from 'zod'

export const LinkSchema = z.object({
  url: z.string().url('Debe ser una URL válida'),
})

export type LinkDto = z.infer<typeof LinkSchema>

export const defaultValues = {
  url: '',
}
