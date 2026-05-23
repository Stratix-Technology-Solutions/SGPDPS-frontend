import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { TechnicalDto } from '../dtos/technical.dto'
import type { ApiError } from '../../../shared/interfaces/api.interface'
import api from '../../../app/api/axios'

export const useUpdateTechnicalSkill = () => {
  const queryClient = useQueryClient()

  return useMutation<unknown, ApiError, { id: number, data: TechnicalDto }>({
    mutationFn: async ({ id, data }) => {
      const res = await api.patch(`/skills/${id}`, data)
      return res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['user', 'skills', 'technical'],
      })
    },
  })
}
