import { useMutation, useQueryClient } from '@tanstack/react-query'
import api from '../../../app/api/axios'
import type { SoftDto } from '../dtos/soft.dto'
import type { ApiError } from '../../../shared/interfaces/api.interface'

export const useCreateSoftSKill = () => {
  const queryClient = useQueryClient()

  return useMutation<unknown, ApiError, SoftDto>({
    mutationFn: async (data) => {
      const res = await api.post('/soft-skills', data)
      return res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['user', 'skills', 'soft'],
      })
    },
  })
}
