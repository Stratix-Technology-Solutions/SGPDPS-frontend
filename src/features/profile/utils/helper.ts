import { formatDate } from "../../view/utils/formatDate"

export const toPdfFileName = (value: string) => {
  const safeValue = value.trim().toLowerCase().replace(/[^a-z0-9-_]+/g, '-')
  return `portafolio-${safeValue || 'usuario'}.pdf`
}

export const isVisible = <T extends { is_visible?: boolean | null }>(item: T) => item.is_visible !== false


export const toBase64 = async (url: string): Promise<string | null> => {
  try {
    const proxiedUrl = url.replace(/^https?:\/\/[^/]+/, '')
    const response = await fetch(proxiedUrl)
    if (!response.ok) return null
    const blob = await response.blob()
    return await new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onloadend = () => resolve(reader.result as string)
      reader.onerror = reject
      reader.readAsDataURL(blob)
    })
  } catch {
    return null
  }
}
export const formatMaybeDate = (value: string | null | undefined) => {
  if (!value) return 'Sin fecha'

  return formatDate(value)
}

export const formatRange = (startDate: string | null | undefined, endDate: string | null | undefined) => {
  return `${formatMaybeDate(startDate)} - ${endDate ? formatMaybeDate(endDate) : 'Actualidad'}`
}

export const getInitials = (firstName: string, lastName: string) => {
  return `${firstName?.[0] ?? ''}${lastName?.[0] ?? ''}`.trim().toUpperCase()
}

export const toVisibleItems = <T extends { is_visible?: boolean | null }>(items: T[]) => {
  return items.filter((item) => item.is_visible !== false)
}

export const FileName = ({ path, index }: { path?: string | null; index: number }) => {
  const fallback = `evidencia-${index + 1}`
  if (!path) return fallback

  const fileName = path.split('/').pop()
  return fileName ?? fallback
}

