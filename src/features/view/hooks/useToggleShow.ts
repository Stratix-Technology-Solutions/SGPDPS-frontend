import { useMutation, useQueryClient } from '@tanstack/react-query'
import api from '../../../app/api/axios'

type ToggleItem = {
  id: number | string
  is_visible: boolean
}

type TogglePayload = {
  id: number | string
  is_visible: boolean
}

const updateVisibility = (data: unknown, payload: TogglePayload) => {
  const updateItem = <T extends ToggleItem>(item: T): T => (
    item.id === payload.id ? { ...item, is_visible: payload.is_visible } : item
  )

  if (Array.isArray(data)) {
    return data.map(updateItem)
  }

  if (data && typeof data === 'object' && Array.isArray((data as { data?: unknown }).data)) {
    return {
      ...data,
      data: (data as { data: ToggleItem[] }).data.map(updateItem),
    }
  }

  return data
}

export const useToggleShow = ({ url, queryKey }: { url: string, queryKey: string[] }) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, is_visible }: TogglePayload) => {
      await api.patch(`${url}/${id}`, { is_visible })
    },
    onMutate: async (payload) => {
      await queryClient.cancelQueries({ queryKey })

      const previousData = queryClient.getQueryData(queryKey)

      queryClient.setQueriesData({ queryKey }, (oldData) => updateVisibility(oldData, payload))

      return { previousData }
    },
    onError: (_error, _payload, context) => {
      queryClient.setQueryData(queryKey, context?.previousData)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey })
    },
  })
}
