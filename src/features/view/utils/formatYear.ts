export const formatYear = (dateStr: string | null) => {
  if (!dateStr) return 'Present'
  return new Date(dateStr).getFullYear()
}
