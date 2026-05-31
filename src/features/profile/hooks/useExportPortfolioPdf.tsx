import { useState } from 'react'
import { pdf } from '@react-pdf/renderer'
import api from '../../../app/api/axios'
import { toPdfFileName, isVisible, toBase64 } from '../utils/helper'
import { PortfolioPdfDocument } from '../components/pdf/PortfolioPdfDocument'
import type {
  AcademicExperience,
  AcademicFormation,
  CollectionResponse,
  MaybeCollectionResponse,
  Portfolio, PortfolioExport,
  ProfileResponse,
  Project,
  ProjectAsset,
  Skill,
  SocialLink,
  WorkExperience
} from '../interface'


const fetchCollection = async <T,>(url: string) => {
  const response = await api.get<CollectionResponse<T> | MaybeCollectionResponse<T> | T[]>(url)

  if (Array.isArray(response.data)) {
    return response.data
  }

  return response.data.data ?? []
}



const fetchPortfolioBundle = async (): Promise<Portfolio> => {
  const profileResponse = await api.get<ProfileResponse>('/profile')
  const profile = profileResponse.data.data
  const pictureBase64 = profile.picture ? await toBase64(profile.picture) : null

  const [skills, softSkills, links, workExperiences, academicExperiences, academicFormations, projects] = await Promise.all([
    fetchCollection<Skill>('/skills'),
    fetchCollection<Skill>('/soft-skills'),
    fetchCollection<SocialLink>('/links'),
    fetchCollection<WorkExperience>('/work-experiences'),
    fetchCollection<AcademicExperience>('/academic-experiences'),
    fetchCollection<AcademicFormation>('/academic-formations'),
    fetchCollection<Project>('/projects'),
  ])

  const projectsWithAssets = await Promise.all(
    projects.filter(isVisible).map(async (project) => {
      try {
        const assets = await fetchCollection<ProjectAsset>(`/projects/${project.id}/assets`)

        return {
          ...project,
          assets,
        }
      } catch {
        return {
          ...project,
          assets: [],
        }
      }
    }),
  )

  return {
    profile: { ...profile, picture: pictureBase64 },
    skills: skills.filter(isVisible),
    softSkills: softSkills.filter(isVisible),
    links: links.filter(isVisible),
    workExperiences: workExperiences.filter(isVisible),
    academicExperiences: academicExperiences.filter(isVisible),
    academicFormations: academicFormations.filter(isVisible),
    projects: projectsWithAssets,
  }
}

export const useExportPortfolioPdf = () => {
  const [isExporting, setIsExporting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const exportPortfolio = async () => {
    setIsExporting(true)
    setError(null)

    try {
      const bundle = await fetchPortfolioBundle()
      const fileName = toPdfFileName(bundle.profile.username)
      const blob = await pdf(
        <PortfolioPdfDocument
          data={{
            ...bundle,
            generatedAt: new Date().toISOString(),
          } satisfies PortfolioExport}
        />,
      ).toBlob()

      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')

      link.href = url
      link.download = fileName
      link.rel = 'noopener'
      link.click()

      window.setTimeout(() => {
        URL.revokeObjectURL(url)
      }, 1000)
    } catch {
      setError('No se pudo exportar el portafolio')
    } finally {
      setIsExporting(false)
    }
  }

  return {
    exportPortfolio,
    isExporting,
    error,
  }
}
