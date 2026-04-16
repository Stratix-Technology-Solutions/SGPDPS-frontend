import { useState } from 'react'
import { FaEdit } from 'react-icons/fa'
import { FormUpdateSkillTechnical } from './FormUpdateSkillTechnical'
import { ButtonDeleteSkill } from './ButtonDeleteSkill'

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
  id: number
  name: string
  domain_level: string
}

export const CardTechnicalSkill = ({ id, name, domain_level }: Props) => {
  const [edit, setEdit] = useState(false)
  const value = domainValue[domain_level]
  const color = getLevelConfig(value)

  return (
    <>
      <div className="flex flex-col h-full bg-white border border-neutral-medium/20 rounded-xl p-4 gap-3 hover:shadow-md transition-shadow">
        <span className="text-primary font-semibold">
          {name} - {domain_level}
        </span>

        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className={`h-full ${color} rounded-full transition-all duration-500`}
            style={{ width: `${value}%` }}
          />
        </div>

        <div className="flex flex-wrap gap-2 justify-end mt-auto">
          <button
            onClick={() => setEdit(true)}
            className="px-3 py-1 border border-gray-300 cursor-pointer rounded-md bg-neutral-medium/20 hover:bg-gray-100 transition-colors flex items-center gap-1"
          >
            <FaEdit className="inline" />
            Editar
          </button>

          <ButtonDeleteSkill
            id={id}
            route="skills"
            queryKey={['user', 'skills', 'technical']}
          />
        </div>
      </div>

      {edit && (
        <FormUpdateSkillTechnical
          technology={{ id, name, domain_level }}
          onClose={() => setEdit(false)}
        />
      )}
    </>
  )
}
