import { useMutation, useQueryClient } from '@tanstack/react-query'
import api from '../../../app/api/axios'

type BulkVisibilityPayload = {
  ids: (number | string)[]
  is_visible: boolean
}

type ToggleItem = {
  id: number | string
  is_visible: boolean
}

const updateVisibility = (data: unknown, payload: BulkVisibilityPayload) => {
  const updateItem = <T extends ToggleItem>(item: T): T => (
    payload.ids.includes(item.id)
      ? { ...item, is_visible: payload.is_visible }
      : item
  )

  if (Array.isArray(data)) {
    return data.map(updateItem)
  }

  if (data && typeof data === 'object' &&
    Array.isArray((data as { data?: unknown }).data)
  ) {
    return {
      ...data,
      data: (data as { data: ToggleItem[] }).data.map(updateItem),
    }
  }

  return data
}

export const useBulkVisibility = ({ url, queryKey }: {
 url: string
 queryKey: string[]
}) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ ids, is_visible }: BulkVisibilityPayload) => {
      await api.patch(`${url}/visibility`, { ids, is_visible })
    },

    onMutate: async (payload) => {
      await queryClient.cancelQueries({ queryKey })
      const previousData = queryClient.getQueryData(queryKey)

      queryClient.setQueriesData({ queryKey }, (oldData) => updateVisibility(oldData, payload))

      return { previousData }
    },

    onError: (_error, _payload, context) => {
      queryClient.setQueryData(
        queryKey,
        context?.previousData,
      )
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey })
    },
  })
}
