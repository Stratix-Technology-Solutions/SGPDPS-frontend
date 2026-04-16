import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import type { ApiError } from '../../../shared/interfaces/api.interface'
import api from '../../../app/api/axios'
import { FaTrash } from 'react-icons/fa'

interface Props {
  id: number
  route: string
  queryKey: string[]
}

export const ButtonDeleteSkill = ({ id, route, queryKey }: Props) => {
  const [showModal, setShowModal] = useState(false)
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
    <>
      <button
        onClick={() => setShowModal(true)}
        className="px-3 py-1 border border-gray-300 cursor-pointer rounded-md bg-neutral-medium/20 hover:bg-gray-100 transition-colors flex items-center gap-1 disabled:cursor-not-allowed"
      >
        <FaTrash className="inline" />
        Eliminar
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 shadow-xl max-w-sm w-full animate-in fade-in zoom-in duration-200">
            <h3 className="text-xl font-bold text-background-dark mb-2">
              ¿Eliminar habilididad?
            </h3>
            <p className="text-neutral-medium mb-6">
              ¿Estás seguro de que deseas eliminar la habilidad registrada? Puedes crear nuevos mas tarde.
            </p>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="px-5 py-2.5 rounded-xl font-medium bg-neutral-200 text-background-dark hover:bg-neutral-300 transition-colors cursor-pointer"
              >
                Cancelar
              </button>

              <button
                type="button"
                disabled={isPending}
                onClick={() => {
                  mutate()
                  setShowModal(false)
                }}
                className="px-5 py-2.5 rounded-xl font-medium bg-red-500 text-white hover:bg-red-600 transition-colors cursor-pointer"
              >
                Sí, Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
