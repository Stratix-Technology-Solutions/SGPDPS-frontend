import { useMutation, useQueryClient } from '@tanstack/react-query'
import api from '../../../app/api/axios'
import type { ApiError } from '../../../shared/interfaces/api.interface'
import type { TechnicalDto } from '../dtos/technical.dto'

export const useCreateTechnicalSkill = () => {
  const queryClient = useQueryClient()

  return useMutation<unknown, ApiError, TechnicalDto>({
    mutationFn: async (data) => {
      const res = await api.post('/skills', data)
      return res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['user', 'skills', 'technical'],
      })
    },
  })
}
