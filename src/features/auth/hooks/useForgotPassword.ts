import { useMutation } from '@tanstack/react-query'
import api from '../../../app/api/axios'
import type { ApiError } from '../../../shared/interfaces/api.interface'

export const useForgotPassword = () => {
  return useMutation<{ message: string }, ApiError, { email: string }>({
    mutationFn: async ({ email }) => {
      const res = await api.post('/auth/forgot-password', { email })
      return res.data
    },
  })
}
