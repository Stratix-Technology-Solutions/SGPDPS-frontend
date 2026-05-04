import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import api from '../../../app/api/axios'
import type { ApiError } from '../../../shared/interfaces/api.interface'
import type {
  ProjectAsset,
  ProjectAssetType,
  ProjectAssetsResponse,
} from '../interfaces/project-asset.interface'
import type { ProjectsResponse } from '../interfaces/project.interface'

const QUERY_KEY = ['user', 'projects', 'assets']

interface CreateProjectAssetDto {
  type: ProjectAssetType
  file: File
}

export const useGetProject = () => {
  return useQuery<ProjectsResponse, ApiError>({
    queryKey: ['user', 'projects'],
    queryFn: async () => {
      const res = await api.get('/projects?page=1')
      return res.data
    }
  })
}

export const useGetProjectAssets = (projectId?: string) => {
  return useQuery<ProjectAssetsResponse, ApiError>({
    queryKey: [...QUERY_KEY, projectId],
    enabled: !!projectId,
    queryFn: async () => {
      if (!projectId) {
        throw new Error('Project ID is required')
      }

      const res = await api.get(`/projects/${projectId}/assets`)
      return res.data
    },
  })
}

export const useCreateProjectAsset = (projectId?: string) => {
  const queryClient = useQueryClient()

  return useMutation<ProjectAsset, ApiError, CreateProjectAssetDto>({
    mutationFn: async ({ type, file }) => {
      if (!projectId) {
        throw new Error('Project ID is required')
      }

      const formData = new FormData()
      formData.append('type', type)
      formData.append('file', file)

      const res = await api.post(`/projects/${projectId}/assets`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      return res.data.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [...QUERY_KEY, projectId] })
    },
  })
}

export const useDeleteProjectAsset = (projectId?: string) => {
  const queryClient = useQueryClient();
  return useMutation<void, ApiError, string>({
    mutationFn: async (assetId) => {
      if (!projectId) {
        throw new Error('Project ID is required')
      }

      await api.delete(`/projects/${projectId}/assets/${assetId}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [...QUERY_KEY, projectId] })
    },
  })
}

