import type { AcademicExperienceResponse } from '../dtos/academic.interface'
import { getAcademicTypeLabel } from '../utils/academicLabels'

interface Props {
  item: AcademicExperienceResponse
  onBack: () => void
}

export const AcademicDetail = ({ item, onBack }: Props) => {
  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-neutral-medium/70 font-medium uppercase tracking-wide">Actividad</p>
            <p className="text-background-dark font-semibold mt-0.5">{item.title}</p>
          </div>
          <div>
            <p className="text-xs text-neutral-medium/70 font-medium uppercase tracking-wide">Institución</p>
            <p className="text-background-dark font-semibold mt-0.5">{item.institution}</p>
          </div>
          <div>
            <p className="text-xs text-neutral-medium/70 font-medium uppercase tracking-wide">Inicio / emisión</p>
            <p className="text-background-dark font-semibold mt-0.5">{item.start_date}</p>
          </div>
          <div>
            <p className="text-xs text-neutral-medium/70 font-medium uppercase tracking-wide">Fin</p>
            <p className="text-background-dark font-semibold mt-0.5">{item.end_date ?? 'No aplica'}</p>
          </div>
          <div>
            <p className="text-xs text-neutral-medium/70 font-medium uppercase tracking-wide">Categoría</p>
            <p className="text-background-dark font-semibold mt-0.5">{getAcademicTypeLabel(item.type)}</p>
          </div>
        </div>

        {item.description && (
          <div>
            <p className="text-xs text-neutral-medium/70 font-medium uppercase tracking-wide">Descripción</p>
            <p className="text-background-dark mt-0.5">{item.description}</p>
          </div>
        )}
      </div>

      <div className="flex justify-end">
        <button onClick={onBack} className="px-4 py-2 rounded-md border cursor-pointer hover:bg-neutral-light">
          Volver atrás
        </button>
      </div>
    </>
  )
}
