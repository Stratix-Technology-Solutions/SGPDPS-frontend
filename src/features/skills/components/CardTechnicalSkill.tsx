const domainValue: Record<string, number> = {
  'Básico': 20,
  'Intermedio': 50,
  'Avanzado': 90,
}

const getLevelConfig = (value: number) => {
  if (value <= 33) return 'bg-amber-500'
  else if (value <= 66) return 'bg-amber-300'
  return  'bg-green-500'
}

interface Props {
  name: string
  domain_level: string
}

export const CardTechnicalSkill = ({ name, domain_level }: Props) => {
  const value = domainValue[domain_level]
  const color = getLevelConfig(value)

  return (
    <div className="text-left px-4 py-3 rounded-xl border border-neutral-light transition-colors cursor-pointer">
      <span className="text-primary font-semibold">
        {name} - {domain_level}
      </span>

      <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-full ${color} rounded-full transition-all duration-500`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  )
}
