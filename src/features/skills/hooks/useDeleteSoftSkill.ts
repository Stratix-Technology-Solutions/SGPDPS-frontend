import { useMutation, useQueryClient } from '@tanstack/react-query'
import api from '../../../app/api/axios'
import type { ApiError } from '../../../shared/interfaces/api.interface'

export const useDeleteSoftSkill = () => {
  const queryClient = useQueryClient()

  return useMutation<void, ApiError, string>({
    mutationFn: async (id) => {
      await api.delete(`/soft-skills/${id}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', 'skills', 'soft'] })
    },
  })
}
