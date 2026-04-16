import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { ApiError } from '../../../shared/interfaces/api.interface'
import api from '../../../app/api/axios'
import { FaTrash } from 'react-icons/fa'

interface Props {
  id: number
  route: string
  queryKey: string[]
}

export const ButtonDeleteSkill = ({ id, route, queryKey }: Props) => {
  const queryClient = useQueryClient()
  const { mutate, isPending } = useMutation<void, ApiError, void>({
    mutationFn: async () => {
      await api.delete(`/${route}/${id}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey })
    },
  })

  return (
    <button
      disabled={isPending}
      onClick={() => mutate()}
      className="px-3 py-1 border border-gray-300 cursor-pointer rounded-md bg-neutral-medium/20 hover:bg-gray-100 transition-colors flex items-center gap-1 disabled:cursor-not-allowed"
    >
      <FaTrash className="inline" />
      Eliminar
    </button>
  )
}
