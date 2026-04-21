import type { WorkExperience } from '../dtos/workExperience'

interface Props {
  data: WorkExperience[] | undefined
  isLoading: boolean
  onSelect: (item: WorkExperience) => void
  itemClassName?: string
}

export const WorkExperienceList = ({
  data,
  isLoading,
  onSelect,
  itemClassName,
}: Props) => {
  return (
    <>
      {isLoading && (
        <p className="text-neutral-medium/70 text-sm">Cargando...</p>
      )}

      {!isLoading && !data?.length && (
        <p className="text-neutral-medium/70 text-sm">
          No hay experiencias laborales registradas.
        </p>
      )}

      <ul className="flex flex-col gap-2 max-h-80 overflow-y-auto">
        {data?.map((item) => (
          <li key={item.id}>
            <button
              onClick={() => onSelect(item)}
              className={`w-full text-left px-4 py-3 rounded-xl border border-neutral-light transition-colors cursor-pointer ${itemClassName ?? 'hover:border-primary hover:bg-neutral-50'}`}
            >
              <p className="font-semibold text-background-dark">
                {item.company}
              </p>
              <p className="text-sm text-neutral-medium/70">
                {item.position} · {item.start_date} —{' '}
                {item.end_date ?? 'Actualidad'}
              </p>
            </button>
          </li>
        ))}
      </ul>
    </>
  )
}
