import { useMutation, useQueryClient } from '@tanstack/react-query'
import api from '../../../app/api/axios'

export const useToggleShow = ({ url, queryKey }: { url: string, queryKey: string[] }) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, is_visible }: { id: number | string, is_visible: boolean }) => {
      await api.patch(`${url}/${id}`, { is_visible })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey })
    }
  })
}
