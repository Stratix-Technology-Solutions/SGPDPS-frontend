import { z } from 'zod'

const optionalLinkField = z.preprocess((value) => {
  if (typeof value !== 'string') {
    return value
  }

  const trimmedValue = value.trim()
  return trimmedValue === '' ? undefined : trimmedValue
}, z.string().url('Debe ser una URL válida').optional())

export const LinkSchema = z.object({
  link_1: optionalLinkField,
  link_2: optionalLinkField,
  link_3: optionalLinkField,
  link_4: optionalLinkField
})

export type LinkDto = z.infer<typeof LinkSchema>
