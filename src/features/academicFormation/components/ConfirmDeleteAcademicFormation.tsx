import type { AcademicFormationResponse } from '../dtos/academicFormation.interface'
import {
  getAcademicFormationLevelLabel,
  getAcademicFormationStatusLabel,
} from '../utils/academicFormationLabels'

interface Props {
  item: AcademicFormationResponse
}

export const ConfirmDeleteAcademicFormation = ({ item }: Props) => {
  return (
    <div className="rounded-xl border border-red-100 bg-red-50/50 px-4 py-3">
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-neutral-medium/70">
              Institución
            </p>
            <p className="font-semibold text-background-dark">{item.institution}</p>
          </div>

          <span className="w-fit rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-red-600 ring-1 ring-red-100">
            {getAcademicFormationStatusLabel(item.status)}
          </span>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-neutral-medium/70">
              Grado académico
            </p>
            <p className="text-sm font-semibold text-background-dark">
              {getAcademicFormationLevelLabel(item.education_level)}
            </p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-neutral-medium/70">
              Carrera o especialidad
            </p>
            <p className="text-sm font-semibold text-background-dark">
              {item.field_of_study ?? 'No aplica'}
            </p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-neutral-medium/70">
              Fecha de emisión
            </p>
            <p className="text-sm font-semibold text-background-dark">
              {item.emission_date ?? 'No aplica'}
            </p>
          </div>
        </div>

        {item.description && (
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-neutral-medium/70">
              Descripción
            </p>
            <p className="line-clamp-2 text-sm text-background-dark">
              {item.description}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
