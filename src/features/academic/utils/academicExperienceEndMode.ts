import type { AcademicExperienceResponse } from '../dtos/academic.interface'

export type AcademicExperienceEndMode = 'date_range' | 'single_day' | 'in_progress'

const STORAGE_KEY = 'academicExperienceEndModes'

const readEndModes = (): Record<string, AcademicExperienceEndMode> => {
  if (typeof window === 'undefined') return {}

  try {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? '{}')
  } catch {
    return {}
  }
}

export const saveAcademicExperienceEndMode = (
  id: string,
  mode: AcademicExperienceEndMode,
) => {
  if (typeof window === 'undefined') return

  const endModes = readEndModes()
  endModes[id] = mode
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(endModes))
}

export const getAcademicExperienceEndMode = (
  item: AcademicExperienceResponse,
): AcademicExperienceEndMode => {
  const savedMode = readEndModes()[item.id]
  if (savedMode) return savedMode

  if (!item.end_date || item.end_date === item.start_date) {
    return item.type === 'certificado' ? 'single_day' : 'in_progress'
  }

  return 'date_range'
}
