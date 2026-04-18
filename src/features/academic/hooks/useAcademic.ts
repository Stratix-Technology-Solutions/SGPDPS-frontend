import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import api from '../../../app/api/axios'
import type { AcademicDto } from '../dtos/academic.dto'
import type { AcademicExperiencesResponse } from '../dtos/academic.interface'
import type { ApiError } from '../../../shared/interfaces/api.interface'

const QUERY_KEY = ['user', 'academic-experiences']

export const useAcademic = () => {
  const [page, setPage] = useState(1)
  const queryClient = useQueryClient()

  const { data, isLoading, isError, error, isSuccess } = useQuery<AcademicExperiencesResponse, ApiError>({
    queryKey: [...QUERY_KEY, page],
    queryFn: async () => {
      const res = await api.get(`/academic-experiences?page=${page}`)
      return res.data
    },
  })

  const create = useMutation<void, ApiError, AcademicDto>({
    mutationFn: async (dto) => {
      await api.post('/academic-experiences', dto)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY })
    },
  })

  const update = useMutation<void, ApiError, { id: string; dto: Partial<AcademicDto> }>({
    mutationFn: async ({ id, dto }) => {
      await api.patch(`/academic-experiences/${id}`, dto)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY })
    },
  })

  const remove = useMutation<void, ApiError, string>({
    mutationFn: async (id) => {
      await api.delete(`/academic-experiences/${id}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY })
      const newLastPage = data?.meta.last_page ?? 1
      if (page > newLastPage) setPage(newLastPage)
    },
  })

  return {
    data,
    isLoading,
    isError,
    error,
    isSuccess,
    page,
    setPage,
    create,
    update,
    remove,
  }
}
