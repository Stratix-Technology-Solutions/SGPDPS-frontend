import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import api from '../../../app/api/axios'
import type { ProjectCreateDto, ProjectUpdateDto } from '../dtos/project.dto'
import type { ProjectResponse, ProjectsResponse } from '../interfaces/project.interface'
import type { ApiError } from '../../../shared/interfaces/api.interface'

const QUERY_KEY = ['user', 'projects']

export const useCreateProject = ({ onClose }: { onClose: () => void }) => {
  const queryClient = useQueryClient()
  return useMutation<void, ApiError, ProjectCreateDto>({
    mutationFn: async (data) => {
      await api.post('/projects', data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY })
      onClose()
    }
  })
}

export const useUpdateProject = () => {
  const queryClient = useQueryClient()
  return useMutation<void, ApiError, { id: string; dto: ProjectUpdateDto }>({
    mutationFn: async ({ id, dto }) => {
      await api.patch(`/projects/${id}`, dto)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY })
    },
  })
}

export const useDeleteProject = () => {
  const queryClient = useQueryClient()
  return useMutation<void, ApiError, string>({
    mutationFn: async (id) => {
      await api.delete(`/projects/${id}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY })
    },
  })
}

export const useGetProjects = ({ page }: { page: number }) => {
  return useQuery<ProjectsResponse, ApiError>({
    queryKey: [...QUERY_KEY, page],
    queryFn: async () => {
      const res = await api.get(`/projects?page=${page}`)
      return res.data
    }
  })
}

export const useGetProject = (id: string) => {
  return useQuery<ProjectResponse, ApiError>({
    queryKey: [...QUERY_KEY, id],
    queryFn: async () => {
      const res = await api.get(`/projects/${id}`)
      return res.data
    }
  })
}


