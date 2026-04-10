import { z } from 'zod'

export const ResetPasswordSearchSchema = z.object({
  token: z.string(),
  email: z.string().email(),
})
