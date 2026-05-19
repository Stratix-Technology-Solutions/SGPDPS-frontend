import type { AcademicFormationResponse } from '../dtos/academicFormation.interface'
import { getAcademicFormationLevelLabel } from '../utils/academicFormationLabels'

interface Props {
  item: AcademicFormationResponse
  onBack: () => void
}

const getStatusLabel = (status: AcademicFormationResponse['status']) => {
  const labels: Record<AcademicFormationResponse['status'], string> = {
    completado: 'Completado',
    en_curso: 'En curso',
  }

  return labels[status]
}

export const AcademicFormationDetail = ({ item, onBack }: Props) => {
  return (
    <>
      <div className="flex flex-col gap-5">
        <div className="rounded-2xl border border-neutral-light bg-neutral-50 px-5 py-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-xs text-neutral-medium/70 font-medium uppercase tracking-wide">
                Institución
              </p>
              <h3 className="text-xl font-bold text-background-dark mt-1">
                {item.institution}
              </h3>
              <p className="text-sm text-neutral-medium mt-1">
                {getAcademicFormationLevelLabel(item.education_level)}
                {item.field_of_study ? ` · ${item.field_of_study}` : ''}
              </p>
            </div>

            <span className="w-fit rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
              {getStatusLabel(item.status)}
            </span>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-neutral-light px-4 py-3">
            <p className="text-xs text-neutral-medium/70 font-medium uppercase tracking-wide">
              Grado académico
            </p>
            <p className="text-background-dark font-semibold mt-1">
              {getAcademicFormationLevelLabel(item.education_level)}
            </p>
          </div>

          <div className="rounded-xl border border-neutral-light px-4 py-3">
            <p className="text-xs text-neutral-medium/70 font-medium uppercase tracking-wide">
              Carrera o especialidad
            </p>
            <p className="text-background-dark font-semibold mt-1">
              {item.field_of_study ?? 'No aplica'}
            </p>
          </div>

          <div className="rounded-xl border border-neutral-light px-4 py-3">
            <p className="text-xs text-neutral-medium/70 font-medium uppercase tracking-wide">
              Fecha de emisión
            </p>
            <p className="text-background-dark font-semibold mt-1">
              {item.emission_date ?? 'No aplica'}
            </p>
          </div>

          <div className="rounded-xl border border-neutral-light px-4 py-3">
            <p className="text-xs text-neutral-medium/70 font-medium uppercase tracking-wide">
              Visibilidad
            </p>
            <p className="text-background-dark font-semibold mt-1">
              {item.is_visible ? 'Visible en portafolio' : 'Oculta en portafolio'}
            </p>
          </div>
        </div>

        {item.description && (
          <div className="rounded-xl border border-neutral-light px-4 py-3">
            <p className="text-xs text-neutral-medium/70 font-medium uppercase tracking-wide">
              Descripción
            </p>
            <p className="text-background-dark mt-1 leading-relaxed">
              {item.description}
            </p>
          </div>
        )}
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={onBack}
          className="px-4 py-2 rounded-md border cursor-pointer hover:bg-neutral-light"
        >
          Volver atrás
        </button>
      </div>
    </>
  )
}
