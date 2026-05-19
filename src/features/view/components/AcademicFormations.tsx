import { FaUniversity } from 'react-icons/fa'
import type { AcademicFormation } from '../interfaces/academic-formation'
import { formatYear } from '../utils/formatYear'

interface Props {
  academic_formations: AcademicFormation[]
}

const LEVEL_LABELS: Record<AcademicFormation['education_level'], string> = {
  bachillerato: 'Bachillerato',
  tecnico_medio: 'Técnico medio',
  tecnico_superior: 'Técnico superior',
  licenciatura: 'Licenciatura',
  maestria: 'Maestría',
  doctorado: 'Doctorado / PhD',
}

const STATUS_LABELS: Record<AcademicFormation['status'], string> = {
  completado: 'Completado',
  en_curso: 'En curso',
}

export const AcademicFormations = ({ academic_formations }: Props) => {
  return (
    <section id="academic-formation" className="mx-auto w-full max-w-7xl px-4 sm:px-6">
      <p className="mb-1 font-mono text-sm uppercase tracking-widest text-primary-soft">
        Estudios formales
      </p>

      <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="font-serif text-3xl text-background-dark">
            Formación académica
          </h2>
          <p className="mt-1 max-w-2xl text-sm leading-relaxed text-neutral-medium">
            Grados, instituciones y estudios formales que respaldan la trayectoria profesional.
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {academic_formations.map((formation) => (
          <article
            key={formation.id}
            className="overflow-hidden rounded-2xl border border-primary/10 bg-white transition-all duration-200 hover:-translate-y-1 hover:border-primary-soft"
          >
            <div className="flex items-start gap-4 border-b border-primary/10 bg-primary/5 px-5 py-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-primary/15 bg-white text-primary">
                <FaUniversity className="text-xl" />
              </div>

              <div className="min-w-0 flex-1">
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-primary px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-white">
                    {LEVEL_LABELS[formation.education_level]}
                  </span>
                  <span className="rounded-full border border-primary/15 bg-white px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-primary">
                    {STATUS_LABELS[formation.status]}
                  </span>
                </div>

                <h3 className="text-base font-semibold text-background-dark">
                  {formation.institution}
                </h3>

                {formation.field_of_study && (
                  <p className="mt-1 text-sm font-medium text-primary">
                    {formation.field_of_study}
                  </p>
                )}
              </div>
            </div>

            <div className="px-5 py-4">
              <p className="mb-3 font-mono text-[11px] text-neutral-medium">
                {formation.status === 'completado'
                  ? `Emitido en ${formatYear(formation.emission_date)}`
                  : 'Actualmente en curso'}
              </p>

              {formation.description && (
                <p className="text-sm leading-relaxed text-neutral-medium">
                  {formation.description}
                </p>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
