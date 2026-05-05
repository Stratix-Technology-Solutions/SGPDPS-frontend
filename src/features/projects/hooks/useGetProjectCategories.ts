import { useQuery } from '@tanstack/react-query'
import type { ApiError } from '../../../shared/interfaces/api.interface'
import api from '../../../app/api/axios'

export const useGetProjectCategories = (id: string | null | undefined) => {
  return useQuery<{ data: { id: number, name: string }[] }, ApiError>({
    queryKey: ['project', 'categories', id],
    queryFn: async () => {
      const res = await api.get(`/projects/${id}/categories`)
      return res.data
    },
    enabled: !!id,
  })
}
