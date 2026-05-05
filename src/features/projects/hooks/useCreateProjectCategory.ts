import { useMutation } from '@tanstack/react-query'
import api from '../../../app/api/axios'
import type { ApiError } from '../../../shared/interfaces/api.interface'

export const useCreateProjectCategory = () => {
  return useMutation<void, ApiError, { projectId: string, categoryId: number }>({
    mutationFn: async ({ projectId, categoryId }) => {
      const res = await api.post(`projects/${projectId}/categories/${categoryId}`)
      return res.data
    },
  })
}
