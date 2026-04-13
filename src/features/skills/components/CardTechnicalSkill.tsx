const domainValue: Record<string, number> = {
  'Básico': 20,
  'Intermedio': 50,
  'Avanzado': 90,
}

const getLevelConfig = (value: number) => {
  if (value <= 33) return "bg-amber-500"
  else if (value <= 66) return "bg-amber-300"
  return  "bg-green-500"
}

interface Props {
  name: string
  domain_level: string
  onEdit?: () => void
  onDelete?: () => void
}

export const CardTechnicalSkill = ({ name, domain_level, onEdit, onDelete }: Props) => {
  const value = domainValue[domain_level]
  const color = getLevelConfig(value)

  return (
    <div className="flex flex-col lg:flex-row lg:items-center bg-white border border-neutral-medium/20 rounded-xl px-4 py-3 gap-2.5 lg:gap-10">
      <span className="text-primary font-semibold lg:w-56 lg:shrink-0">
        {name} - {domain_level}
      </span>

      <div className="w-full h-2 bg-red-100 rounded-full overflow-hidden lg:flex-1 md:h-2.5">
        <div
          className={`h-full ${color} rounded-full transition-all duration-500`}
          style={{ width: `${value}%` }}
        />
      </div>

      <div className="flex justify-end gap-2 flex-wrap lg:justify-start lg:w-auto">
        <button
          onClick={onEdit}
          className="px-3 py-1 border border-gray-300 rounded-md bg-neutral-medium/20 hover:bg-gray-100 transition-colors"
        >
          Editar
        </button>
        <button
          onClick={onDelete}
          className="px-3 py-1 border border-gray-300 rounded-md bg-neutral-medium/20 hover:bg-gray-100 transition-colors"
        >
          Eliminar
        </button>
      </div>
    </div>
  )
}
