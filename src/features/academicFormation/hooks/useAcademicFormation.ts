import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import api from '../../../app/api/axios'
import type { ApiError } from '../../../shared/interfaces/api.interface'
import type { AcademicFormationDto } from '../dtos/academicFormation.dto'
import type { AcademicFormationsResponse } from '../dtos/academicFormation.interface'

const QUERY_KEY = ['user', 'academic-formations']

export const useAcademicFormation = ({ enabled = true }: { enabled?: boolean } = {}) => {
  const [page, setPage] = useState(1)
  const queryClient = useQueryClient()

  const { data, isLoading, isError, error, isSuccess } = useQuery<AcademicFormationsResponse, ApiError>({
    queryKey: [...QUERY_KEY, page],
    queryFn: async () => {
      const res = await api.get(`/academic-formations?page=${page}`)
      return res.data
    },
    enabled,
  })

  const create = useMutation<void, ApiError, AcademicFormationDto>({
    mutationFn: async (dto) => {
      await api.post('/academic-formations', dto)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY })
    },
  })

  const update = useMutation<void, ApiError, { id: string; dto: AcademicFormationDto }>({
    mutationFn: async ({ id, dto }) => {
      await api.patch(`/academic-formations/${id}`, dto)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY })
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
  }
}
