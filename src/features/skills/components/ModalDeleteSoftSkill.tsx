import { useState } from 'react'
import { ListSkills } from './ListSkills'
import { ModalSkills } from './ModalSkills'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import api from '../../../app/api/axios'
import type { ApiError } from '../../../shared/interfaces/api.interface'
import type { SoftSkillResponse } from '../interfaces/soft.interface'
import { CardSoftSkill } from './CardSoftSkill'

interface Props {
  onClose: () => void
}

export const ModalDeleteSoftSkill = ({ onClose }: Props) => {
  const [id, setId] = useState(null)
  const queryClient = useQueryClient()
  const { mutate, isPending } = useMutation<void, ApiError, void>({
    mutationFn: async () => {
      await api.delete(`/soft-skills/${id}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', 'skills', 'soft'] })
    },
  })

  return (
    <ModalSkills
      title="Eliminar Habilidades Blandas"
      description="Aquí podras seleccionar que habilidad blanda deseas eliminar."
      onClose={onClose}
    >
      <ListSkills<SoftSkillResponse>
        queryKey={['user', 'skills', 'soft']}
        route="soft-skills"
        renderItem={(item) => <CardSoftSkill {...item} />}
        action={(item: any) => setId(item.id)}
      />

      {id && (
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
                onClick={() => setId(null)}
                className="px-5 py-2.5 rounded-xl font-medium bg-neutral-200 text-background-dark hover:bg-neutral-300 transition-colors cursor-pointer"
              >
                Cancelar
              </button>

              <button
                type="button"
                disabled={isPending}
                onClick={() => {
                  mutate()
                  setId(null)
                }}
                className="px-5 py-2.5 rounded-xl font-medium bg-red-500 text-white hover:bg-red-600 transition-colors cursor-pointer"
              >
                Sí, Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </ModalSkills>
  )
}
