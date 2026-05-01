import { useMutation, useQueryClient } from '@tanstack/react-query'
import api from '../../../app/api/axios'
import type { LinkDto } from '../dtos/links.dto'
import type { LinkResponse } from '../interfaces/link.interface'
import type { ApiError } from '../../../shared/interfaces/api.interface'

export const useCreateLink = ({ onClose }: { onClose: () => void }) => {
  const queryClient = useQueryClient()

  return useMutation<LinkResponse, ApiError, LinkDto>({
    mutationFn: async (data) => {
      const res = await api.post('/links', data)
      return res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', 'links'] })
      onClose()
    }
  })
}
