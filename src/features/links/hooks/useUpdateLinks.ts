import { useMutation, useQueryClient } from "@tanstack/react-query"
import api from '../../../app/api/axios'
import type { ApiError } from "../../../shared/interfaces/api.interface"
import type { LinkResponse } from "../interfaces/link.interface"
import type { LinkDto } from "../dtos/links.dto"

export const useUpdateLinks = () => {
  const queryClient = useQueryClient()
  return useMutation<LinkResponse, ApiError, LinkDto>({
    mutationFn: async (data) => {
      const res = await api.patch('/links', data)
      return res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', 'links'] })
    }
  })
}
