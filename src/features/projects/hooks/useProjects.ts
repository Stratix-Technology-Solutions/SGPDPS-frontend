import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import api from '../../../app/api/axios'
import type { ProjectDto } from '../dtos/project.dto'
import type { ProjectsResponse } from '../interfaces/project.interface'
import type { ApiError } from '../../../shared/interfaces/api.interface'

const QUERY_KEY = ['user', 'projects']

export const useProjects = () => {
  const [page, setPage] = useState(1)
  const queryClient = useQueryClient()

  const { data, isLoading, isError, error, isSuccess } = useQuery<ProjectsResponse, ApiError>({
    queryKey: [...QUERY_KEY, page],
    queryFn: async () => {
      const res = await api.get(`/projects?page=${page}`)
      return res.data
    },
  })

  const create = useMutation<void, ApiError, ProjectDto>({
    mutationFn: async (dto) => {
      await api.post('/projects', dto)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY })
    },
  })

  const update = useMutation<void, ApiError, { id: string; dto: Partial<ProjectDto> }>({
    mutationFn: async ({ id, dto }) => {
      await api.patch(`/projects/${id}`, dto)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY })
    },
  })

  const remove = useMutation<void, ApiError, string>({
    mutationFn: async (id) => {
      await api.delete(`/projects/${id}`)
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
