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

