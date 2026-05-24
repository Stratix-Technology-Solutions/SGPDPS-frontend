import type { AcademicFormationResponse } from '../dtos/academicFormation.interface'
import {
  getAcademicFormationLevelLabel,
  getAcademicFormationStatusLabel,
} from '../utils/academicFormationLabels'

interface Props {
  data: AcademicFormationResponse[] | undefined
  isLoading: boolean
  onSelect: (item: AcademicFormationResponse) => void
  itemClassName?: string
}

export const AcademicFormationList = ({ data, isLoading, onSelect, itemClassName }: Props) => {
  return (
    <div>
      {isLoading && <p className="text-neutral-medium/70 text-sm">Cargando...</p>}

      {!isLoading && !data?.length && (
        <p className="text-neutral-medium/70 text-sm">No hay formaciones académicas registradas.</p>
      )}

      <ul className="flex flex-col gap-2 max-h-80 overflow-y-auto">
        {data?.map((item) => (
          <li key={item.id}>
            <button
              onClick={() => onSelect(item)}
              className={`w-full text-left px-4 py-3 rounded-xl border border-neutral-light transition-colors cursor-pointer ${itemClassName ?? 'hover:border-primary hover:bg-neutral-50'}`}
            >
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="font-semibold text-background-dark">{item.institution}</p>
                    <p className="text-sm text-neutral-medium/70">
                      {getAcademicFormationLevelLabel(item.education_level)}
                      {item.field_of_study ? ` · ${item.field_of_study}` : ''}
                    </p>
                  </div>

                  <span className="w-fit rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
                    {getAcademicFormationStatusLabel(item.status)}
                  </span>
                </div>

                <div className="text-xs text-neutral-medium/80">
                  <span>
                    <span className="font-semibold text-background-dark">Emisión: </span>
                    {item.emission_date ?? 'No aplica'}
                  </span>
                </div>

                {item.description && (
                  <p className="line-clamp-2 text-sm text-neutral-medium">
                    {item.description}
                  </p>
                )}
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
