import { useMutation, useQueryClient } from '@tanstack/react-query'
import api from '../../../app/api/axios'
import type { ApiError } from '../../../shared/interfaces/api.interface'

export const useDeleteTechnicalSkill = () => {
  const queryClient = useQueryClient()

  return useMutation<void, ApiError, number>({
    mutationFn: async (id) => {
      await api.delete(`/skills/${id}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', 'skills', 'technical'] })
    },
  })
}
