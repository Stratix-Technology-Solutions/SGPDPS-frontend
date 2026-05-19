export const formatMonthYear = (dateStr: string | null) => {
  if (!dateStr) return 'Presente'

  return new Intl.DateTimeFormat('es', {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(dateStr))
}
