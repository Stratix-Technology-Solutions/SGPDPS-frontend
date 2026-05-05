import { useQuery } from '@tanstack/react-query'
import api from '../../../app/api/axios'
import type { ApiError } from '../../../shared/interfaces/api.interface'

export const useProjectCategories = () => {
  return useQuery<{ data: { id: number, name: string }[] }, ApiError>({
    queryKey: ['project-categories'],
    queryFn: async () => {
      const res = await api.get('projects/categories')
      return res.data
    },
  })
}
