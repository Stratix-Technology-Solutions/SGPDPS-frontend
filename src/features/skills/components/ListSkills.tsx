import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import api from '../../../app/api/axios'
import type { ApiError } from '../../../shared/interfaces/api.interface'
import { BannerMessageError } from '../../../shared/components/BannerMessageError'
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md'

type PaginatedResponse<T> = {
  data: T[]
  meta: {
    last_page: number
  }
}

interface Props<T> {
  queryKey: string[]
  route: string
  renderItem: (item: T) => React.ReactNode
  action?: (item: unknown) => void
}

export const ListSkills = <T,>({ queryKey, route, renderItem, action }: Props<T>) => {
  const [page, setPage] = useState(1)

  const { data, error, isLoading, isError, isSuccess } =
    useQuery<PaginatedResponse<T>, ApiError>({
      queryKey: [...queryKey, page],
      queryFn: async () => {
        const res = await api.get(`/${route}?page=${page}&per_page=5`)
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
    <div className="flex flex-col gap-2">
      {isSuccess && !data.data.length && (
        <p>No hay elementos para mostrar</p>
      )}

      {isSuccess && !!data.data.length && (
        <div className="flex flex-col gap-2 max-h-80 overflow-y-auto">
          {data.data.map((item) => (
            <button
              key={(item as any).id}
              onClick={() => { if (action) action(item) }}
            >
              {renderItem(item)}
            </button>
          ))}
        </div>
      )}

      {isSuccess && data.meta.last_page > 1 && (
        <div className="flex justify-end items-center flex-wrap gap-2 mt-2">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="w-8 h-8 flex items-center justify-center rounded-md disabled:opacity-50 cursor-pointer bg-white disabled:cursor-not-allowed"
          >
            <MdArrowBackIosNew className="w-6 aspect-square" />
          </button>

          {Array.from({ length: data.meta.last_page }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`w-8 h-8 flex items-center justify-center rounded-md cursor-pointer ${page === i + 1 ? 'bg-primary text-white' : 'bg-white'}`}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={page === data.meta.last_page}
            onClick={() => setPage(page + 1)}
            className="w-8 h-8 flex items-center justify-center rounded-md disabled:opacity-50 cursor-pointer bg-white disabled:cursor-not-allowed"
          >
            <MdArrowForwardIos className="w-6 aspect-square" />
          </button>
        </div>
      )}
    </div>
  )
}
