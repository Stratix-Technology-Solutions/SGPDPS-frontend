export const formatGender = (gender: string) => {
  const map: Record<string, string> = {
    male: "Masculino",
    female: "Femenino",
    other: "Otro",
  }
  return map[gender.toLowerCase()] ?? gender
}
