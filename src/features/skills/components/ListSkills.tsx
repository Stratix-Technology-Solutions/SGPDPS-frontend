import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import api from '../../../app/api/axios'
import { BannerMessageError } from '../../../shared/components/BannerMessageError'
import type { ApiError } from '../../../shared/interfaces/api.interface'
import { CardTechnicalSkill } from './CardTechnicalSkill'
import type { TechnicalSkillsResponse } from '../interfaces/technical.interface'
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md'

export const ListSkills = () => {
  const [page, setPage] = useState(1)
  const { data, error, isLoading, isError, isSuccess } = useQuery<TechnicalSkillsResponse, ApiError>({
    queryKey: ['user', 'skills', 'technical', page],
    queryFn: async () => {
      const res = await api.get(`/skills?page=${page}&per_page=5`)
      return res.data
    },
  })

  if (isLoading) {
    return (
      <p>Cargando...</p>
    )
  }

  if (isError) {
    return (
      <BannerMessageError
        message={error.response?.data.message ?? 'Error al cargar los datos'}
      />
    )
  }

  return (
    <>
      {isSuccess && !data.data.length && (
        <p>No hay elementos para mostrar</p>
      )}

      {isSuccess && !!data.data.length && (
        <div className="flex flex-col gap-2">
          {data.data.map((data) => (
            <CardTechnicalSkill
              key={data.id}
              {...data}
            />
          ))}
        </div>
      )}

      {isSuccess && data.meta.last_page > 1 && (
        <div className="flex justify-end items-center flex-wrap gap-2">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="w-8 h-8 flex items-center justify-center border rounded disabled:opacity-50 cursor-pointer"
          >
            <MdArrowBackIosNew className="w-6 aspect-square" />
          </button>

          {Array.from({ length: data.meta.last_page }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`w-8 h-8 flex items-center justify-center border rounded cursor-pointer ${page === i + 1 ? 'bg-primary text-white' : ''}`}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={page === data.meta.last_page}
            onClick={() => setPage(page + 1)}
            className="w-8 h-8 flex items-center justify-center border rounded disabled:opacity-50 cursor-pointer"
          >
            <MdArrowForwardIos className="w-6 aspect-square" />
          </button>
        </div>
      )}
    </>
  )
}
