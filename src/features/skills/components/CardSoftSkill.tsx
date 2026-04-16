import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { ApiError } from '../../../shared/interfaces/api.interface'
import api from '../../../app/api/axios'
import { FaTrash } from 'react-icons/fa'

interface Props {
  id: number
  name: string
}

export const CardSoftSkill = ({ id, name }: Props) => {
  const queryClient = useQueryClient()
  const { mutate: remove, isPending } = useMutation<void, ApiError, void>({
    mutationFn: async () => {
      await api.delete(`/soft-skills/${id}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['user', 'skills', 'soft']
      })
    },
  })

  return (
    <div className="flex flex-col justify-between h-full bg-white border border-neutral-medium/20 rounded-xl p-4 gap-3 hover:shadow-md transition-shadow">
      <span className="text-primary font-semibold">
        {name}
      </span>

      <div className="flex justify-end">
        <button
          disabled={isPending}
          onClick={() => remove()}
          className="px-3 py-1 border border-gray-300 cursor-pointer rounded-md bg-neutral-medium/20 hover:bg-gray-100 transition-colors flex items-center gap-1 disabled:cursor-not-allowed"
        >
          <FaTrash className="inline" />
          Eliminar
        </button>
      </div>
    </div>
  )
}
