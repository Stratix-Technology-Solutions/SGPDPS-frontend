import { useQuery } from '@tanstack/react-query'
import api from '../../../app/api/axios'
import { BannerMessageError } from '../../../shared/components/BannerMessageError'
import type { ApiError } from '../../../shared/interfaces/api.interface'
import { CardTechnicalSkill } from './CardTechnicalSkill'
import type { TechnicalSkillsResponse } from '../interfaces/technical.interface'

export const ListSkills = () => {
  const { data, error, isLoading, isError, isSuccess } = useQuery<TechnicalSkillsResponse, ApiError>({
    queryKey: ['user', 'skills', 'technical'],
    queryFn: async () => {
      const res = await api.get('/skills')
      return res.data
    },
  })

  if (isLoading) {
    return (
      <p>Cargando...</p>
    )
  }

  if (isError) {
    <BannerMessageError
      message={error.response?.data.message ?? 'Error al cargar los datos'}
    />
  }

  return (
    <>
      {isSuccess && !data.data.length && (
        <p>No hay elementos para mostrar</p>
      )}

      {isSuccess && !!data.data.length && (
        <div className="flex flex-col gap-1">
          {data.data.map(({ id, ...data }) => (
            <CardTechnicalSkill
              key={id}
              {...data}
            />
          ))}
        </div>
      )}
    </>
  )
}
