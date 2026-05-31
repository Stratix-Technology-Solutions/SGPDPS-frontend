import { formatDate } from '../../view/utils/formatDate'

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