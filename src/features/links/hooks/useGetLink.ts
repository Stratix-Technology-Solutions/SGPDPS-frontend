import { useQuery } from '@tanstack/react-query'
import type { LinksResponse } from '../interfaces/link.interface'
import type { ApiError } from '../../../shared/interfaces/api.interface'
import api from '../../../app/api/axios'

export const useGetLinks = ({ page = 1 }: { page?: number } = {}) => {
  return useQuery<LinksResponse, ApiError>({
    queryKey: ['user', 'links', page],
    queryFn: async () => {
      const res = await api.get(`/links?page=${page}&per_page=5`)
      return res.data
    },
  })
}
