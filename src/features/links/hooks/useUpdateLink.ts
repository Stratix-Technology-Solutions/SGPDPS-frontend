import { useMutation, useQueryClient } from "@tanstack/react-query"
import api from '../../../app/api/axios'
import type { ApiError } from "../../../shared/interfaces/api.interface"
import type { LinkResponse } from "../interfaces/link.interface"
import type { LinkDto } from "../dtos/links.dto"

export const useUpdateLink = ({ onClose }: { onClose: () => void }) => {
  const queryClient = useQueryClient()

  return useMutation<LinkResponse, ApiError, { id: string; data: LinkDto }>({
    mutationFn: async ({ id, data }) => {
      const res = await api.patch(`/links/${id}`, data)
      return res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', 'links'] })
      onClose()
    }
  })
}
