import { useQuery } from "@tanstack/react-query"
import type { LinkResponse } from "../interfaces/link.interface"
import type { ApiError } from "../../../shared/interfaces/api.interface"
import api from "../../../app/api/axios"

export const useGetLinks = () => {
  return useQuery<LinkResponse, ApiError>({
    queryKey: ['user', 'links'],
    queryFn: async () => {
      const res = await api.get('/links')
      return res.data
    },
  })
}
