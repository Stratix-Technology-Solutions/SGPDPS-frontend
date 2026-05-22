import { useState } from 'react'
import { LuPlus, LuSearch, LuX } from 'react-icons/lu'

type FilterType = 'text' | 'skills' | 'professions'

export interface Filter {
  type: FilterType
  value: string
}

interface Props {
  filters: Filter[]
  setFilters: React.Dispatch<React.SetStateAction<Filter[]>>
}

export function ProfilesFilters({
  filters,
  setFilters,
}: Props) {
  const [input, setInput] = useState('')
  const [type, setType] = useState<FilterType>('text')

  const addFilter = () => {
    const trimmed = input.trim()

    if (!trimmed) return

    const alreadyExists = filters.some(
      (filter) =>
        filter.type === type &&
        filter.value.toLowerCase() === trimmed.toLowerCase(),
    )

    if (alreadyExists) {
      setInput('')
      return
    }

    setFilters((prev) => [
      ...prev,
      {
        type,
        value: trimmed,
      },
    ])

    setInput('')
  }

  const removeFilter = (index: number) => {
    setFilters((prev) => prev.filter((_, i) => i !== index))
  }

  const clearFilters = () => {
    setFilters([])
  }

  return (
    <div className="w-full border border-neutral-200 rounded-2xl bg-white p-5 flex flex-col gap-5">

      <div className="flex flex-col lg:flex-row gap-3">

        <div className="relative flex-1">
          <LuSearch
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-medium"
          />

          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                addFilter()
              }
            }}
            placeholder="Buscar perfiles..."
            className="w-full border border-neutral-200 rounded-xl py-3 pl-11 pr-4 outline-none focus:border-primary-soft transition-colors"
          />
        </div>

        <select
          value={type}
          onChange={(e) => setType(e.target.value as FilterType)}
          className="border border-neutral-200 rounded-xl px-4 py-3 outline-none focus:border-primary-soft bg-white text-background-dark"
        >
          <option value="text">Texto</option>
          <option value="skills">Skills</option>
          <option value="professions">Profesiones</option>
        </select>

        <button
          onClick={addFilter}
          className="flex items-center justify-center gap-2 bg-primary-soft hover:opacity-90 text-white px-5 py-3 rounded-xl transition-opacity"
        >
          <LuPlus size={18} />
          Agregar
        </button>
      </div>

      {filters.length > 0 && (
        <div className="flex items-center justify-between gap-4 flex-wrap">

          <div className="flex flex-wrap gap-2">
            {filters.map((filter, index) => (
              <div
                key={`${filter.type}-${filter.value}-${index}`}
                className="flex items-center gap-2 border border-neutral-200 bg-neutral-50 rounded-full px-3 py-2"
              >
                <span className="text-[10px] uppercase tracking-wide text-primary-soft font-bold">
                  {filter.type}
                </span>

                <span className="text-sm text-background-dark">
                  {filter.value}
                </span>

                <button
                  onClick={() => removeFilter(index)}
                  className="text-neutral-medium hover:text-red-400 transition-colors"
                >
                  <LuX size={14} />
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={clearFilters}
            className="text-sm text-neutral-medium hover:text-red-400 transition-colors"
          >
            Limpiar filtros
          </button>
        </div>
      )}
    </div>
  )
}
