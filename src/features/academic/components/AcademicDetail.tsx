import type { AcademicExperienceResponse } from '../dtos/academic.interface'

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
            <p className="text-xs text-neutral-medium/70 font-medium uppercase tracking-wide">Título / Programa</p>
            <p className="text-background-dark font-semibold mt-0.5">{item.title}</p>
          </div>
          <div>
            <p className="text-xs text-neutral-medium/70 font-medium uppercase tracking-wide">Institución</p>
            <p className="text-background-dark font-semibold mt-0.5">{item.institution}</p>
          </div>
          <div>
            <p className="text-xs text-neutral-medium/70 font-medium uppercase tracking-wide">Inicio</p>
            <p className="text-background-dark font-semibold mt-0.5">{item.start_date}</p>
          </div>
          <div>
            <p className="text-xs text-neutral-medium/70 font-medium uppercase tracking-wide">Fin</p>
            <p className="text-background-dark font-semibold mt-0.5">{item.end_date ?? '—'}</p>
          </div>
          <div>
            <p className="text-xs text-neutral-medium/70 font-medium uppercase tracking-wide">Tipo</p>
            <p className="text-background-dark font-semibold mt-0.5 capitalize">{item.type}</p>
          </div>
          {/*
          <div>
            <p className="text-xs text-neutral-medium/70 font-medium uppercase tracking-wide">Visible</p>
            <p className="text-background-dark font-semibold mt-0.5">{item.is_visible ? 'Sí' : 'No'}</p>
          </div>
          */}
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
