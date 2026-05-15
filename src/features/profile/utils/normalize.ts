export const normalizeDialCode = (code: string) => `+${code.replace(/\D/g, '')}`

export const normalizePhoneValue = (value: string) => {
  const digits = value.replace(/\D/g, '')
  return digits ? `+${digits}` : ''
}
