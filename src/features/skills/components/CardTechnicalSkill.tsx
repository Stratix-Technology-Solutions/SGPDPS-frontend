import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import type { ApiError } from '../../../shared/interfaces/api.interface'
import api from '../../../app/api/axios'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { FormUpdateSkillTechnical } from './FormUpdateSkillTechnical'

const domainValue: Record<string, number> = {
  'Básico': 20,
  'Intermedio': 50,
  'Avanzado': 90,
}

const getLevelConfig = (value: number) => {
  if (value <= 33) return 'bg-amber-500'
  else if (value <= 66) return 'bg-amber-300'
  return  'bg-green-500'
}

interface Props {
  id: number
  name: string
  domain_level: string
}

export const CardTechnicalSkill = ({ id, name, domain_level }: Props) => {
  const [edit, setEdit] = useState(false)
  const queryClient = useQueryClient()
  const { mutate: remove, isPending } = useMutation<void, ApiError, void>({
    mutationFn: async () => {
      await api.delete(`/skills/${id}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['user', 'skills', 'technical']
      })
    },
  })

  const value = domainValue[domain_level]
  const color = getLevelConfig(value)

  return (
    <>
      <div className="flex flex-col lg:flex-row lg:items-center bg-white border border-neutral-medium/20 rounded-xl px-4 py-3 gap-2.5 lg:gap-10">
        <span className="text-primary font-semibold lg:w-56 lg:shrink-0">
          {name} - {domain_level}
        </span>

        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden lg:flex-1 md:h-2.5">
          <div
            className={`h-full ${color} rounded-full transition-all duration-500`}
            style={{ width: `${value}%` }}
          />
        </div>

        <div className="flex justify-end gap-2 flex-wrap lg:justify-start lg:w-auto">
          <button
            onClick={() => setEdit(true)}
            className="px-3 py-1 border border-gray-300 cursor-pointer rounded-md bg-neutral-medium/20 hover:bg-gray-100 transition-colors flex items-center gap-1"
          >
            <FaEdit className="inline" />
            Editar
          </button>
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

      {edit && (
        <FormUpdateSkillTechnical
          technology={{ id, name, domain_level }}
          onClose={() => setEdit(false)}
        />
      )}
    </>
  )
}
