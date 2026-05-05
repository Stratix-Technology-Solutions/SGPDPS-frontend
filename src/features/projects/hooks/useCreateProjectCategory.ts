import { useMutation, useQueryClient } from '@tanstack/react-query'
import api from '../../../app/api/axios'
import type { ApiError } from '../../../shared/interfaces/api.interface'

export const useCreateProjectCategory = () => {
  const queryClient = useQueryClient()

  return useMutation<string, ApiError, { projectId: string, categoryId: number }>({
    mutationFn: async ({ projectId, categoryId }) => {
      await api.post(`projects/${projectId}/categories/${categoryId}`)
      return projectId
    },
    onSuccess: (id) => {
      queryClient.invalidateQueries({ queryKey: ['project', 'categories', id] })
    },
  })
}
